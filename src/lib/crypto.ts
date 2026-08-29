import 'react-native-get-random-values';
import nacl from 'tweetnacl';
import * as SecureStore from 'expo-secure-store';
import { fromByteArray, toByteArray } from 'base64-js';

const enc = new TextEncoder();
const dec = new TextDecoder();
const b64 = (x: Uint8Array) => fromByteArray(x);
const bytes = (x: string) => toByteArray(x);

export type Identity = { publicKey: string; secretKey: string };

export async function ensureIdentity(userId: string): Promise<Identity> {
  const key = `et_identity_${userId}`;
  const existing = await SecureStore.getItemAsync(key);
  if (existing) return JSON.parse(existing);
  const pair = nacl.box.keyPair();
  const identity = { publicKey: b64(pair.publicKey), secretKey: b64(pair.secretKey) };
  await SecureStore.setItemAsync(key, JSON.stringify(identity));
  return identity;
}

export async function ensureChatKey(chatId: string): Promise<string> {
  const storageKey = `et_chat_${chatId}`;
  const existing = await SecureStore.getItemAsync(storageKey);
  if (existing) return existing;
  const key = b64(nacl.randomBytes(nacl.secretbox.keyLength));
  await SecureStore.setItemAsync(storageKey, key);
  return key;
}

export async function saveChatKey(chatId: string, keyB64: string) {
  await SecureStore.setItemAsync(`et_chat_${chatId}`, keyB64);
}

export function wrapChatKey(chatKeyB64: string, recipientPublicKeyB64: string, senderSecretKeyB64: string) {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const cipher = nacl.box(bytes(chatKeyB64), nonce, bytes(recipientPublicKeyB64), bytes(senderSecretKeyB64));
  return { nonce: b64(nonce), ciphertext: b64(cipher) };
}

export function unwrapChatKey(ciphertextB64:string, nonceB64:string, senderPublicKeyB64:string, recipientSecretKeyB64:string) {
  const opened = nacl.box.open(bytes(ciphertextB64), bytes(nonceB64), bytes(senderPublicKeyB64), bytes(recipientSecretKeyB64));
  if (!opened) throw new Error('Unable to decrypt chat key');
  return b64(opened);
}

export function encryptMessage(plaintext:string, chatKeyB64:string) {
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const cipher = nacl.secretbox(enc.encode(plaintext), nonce, bytes(chatKeyB64));
  return { nonce:b64(nonce), ciphertext:b64(cipher) };
}

export function decryptMessage(ciphertextB64:string, nonceB64:string, chatKeyB64:string) {
  const opened = nacl.secretbox.open(bytes(ciphertextB64), bytes(nonceB64), bytes(chatKeyB64));
  if (!opened) return '🔒 Unable to decrypt';
  return dec.decode(opened);
}
