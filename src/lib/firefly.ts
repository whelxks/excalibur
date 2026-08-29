import AsyncStorage from '@react-native-async-storage/async-storage';
import { seedFirefly } from './mockData';
import type { FireflyResource } from './types';

const KEY = 'everytourist_firefly_resources_v1';

export async function loadResources(): Promise<FireflyResource[]> {
  const saved = await AsyncStorage.getItem(KEY);
  if (!saved) { await AsyncStorage.setItem(KEY, JSON.stringify(seedFirefly)); return seedFirefly; }
  return JSON.parse(saved);
}

export async function saveResources(resources: FireflyResource[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(resources));
}

export function buildSyncPayload(resources: FireflyResource[]) {
  return JSON.stringify({ v:1, t:Date.now(), r:resources });
}

export function mergePayload(local:FireflyResource[], raw:string): FireflyResource[] {
  const incoming = JSON.parse(raw)?.r as FireflyResource[];
  if (!Array.isArray(incoming)) throw new Error('Invalid Firefly payload');
  const map = new Map(local.map(r=>[r.id,r]));
  for (const next of incoming) {
    const current = map.get(next.id);
    if (!current || next.updatedAt > current.updatedAt || (next.updatedAt === current.updatedAt && next.confidence > current.confidence)) {
      map.set(next.id, next);
    }
  }
  return [...map.values()].sort((a,b)=>a.distanceKm-b.distanceKm);
}
