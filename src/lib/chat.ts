import AsyncStorage from '@react-native-async-storage/async-storage';
import { decryptMessage, encryptMessage } from './crypto';
import { supabase } from './supabase';

export type ChatMessage = { id:string; sender_id:string; sender_name:string; ciphertext:string; nonce:string; created_at:string };
const localKey = (chatId:string)=>`et_messages_${chatId}`;

export async function loadEncryptedMessages(chatId:string):Promise<ChatMessage[]> {
  if (supabase && !chatId.startsWith('demo-')) {
    const { data, error } = await supabase.from('messages').select('id,sender_id,ciphertext,nonce,created_at,profiles!messages_sender_id_fkey(name)').eq('chat_id',chatId).order('created_at');
    if (!error && data) return data.map((m:any)=>({...m,sender_name:m.profiles?.name||'Traveller'}));
  }
  const raw=await AsyncStorage.getItem(localKey(chatId));
  return raw?JSON.parse(raw):[];
}

export async function saveEncryptedMessage(chatId:string, senderId:string, senderName:string, plaintext:string, chatKey:string):Promise<ChatMessage> {
  const encrypted=encryptMessage(plaintext,chatKey);
  const msg:ChatMessage={id:`local-${Date.now()}-${Math.random()}`,sender_id:senderId,sender_name:senderName,ciphertext:encrypted.ciphertext,nonce:encrypted.nonce,created_at:new Date().toISOString()};
  if (supabase && !chatId.startsWith('demo-')) {
    const {data,error}=await supabase.from('messages').insert({chat_id:chatId,sender_id:senderId,ciphertext:msg.ciphertext,nonce:msg.nonce}).select('id,created_at').single();
    if(!error&&data) return {...msg,id:data.id,created_at:data.created_at};
  }
  const existing=await loadEncryptedMessages(chatId); await AsyncStorage.setItem(localKey(chatId),JSON.stringify([...existing,msg])); return msg;
}

export async function seedDemoChat(chatId:string,chatKey:string){
  const existing=await loadEncryptedMessages(chatId); if(existing.length) return existing;
  const lines=[['host-ren','Ren','Hey — I accepted you. We’re waiting on one more traveller, then I’ll drop the exact studio pin.'],['host-ren','Ren','Wear something comfortable. We’ll be sitting on tatami for part of the evening.'],['demo-tourist','You','Perfect. I’m excited — anything I should read before?']];
  for(const [id,name,text] of lines) await saveEncryptedMessage(chatId,id,name,text,chatKey);
  return loadEncryptedMessages(chatId);
}

export function decryptForDisplay(m:ChatMessage,key:string){return decryptMessage(m.ciphertext,m.nonce,key)};
