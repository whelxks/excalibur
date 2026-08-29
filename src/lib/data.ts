import { activities as demo } from './mockData';
import { supabase } from './supabase';
import type { Activity } from './types';

export async function getActivities(city?: string): Promise<Activity[]> {
  if (!supabase) return city ? demo.filter(a => a.city.toLowerCase() === city.toLowerCase()) : demo;
  const query = supabase.from('activities_view').select('*').eq('status','published');
  if (city) query.ilike('city', city);
  const { data, error } = await query;
  if (error || !data?.length) return city ? demo.filter(a => a.city.toLowerCase() === city.toLowerCase()) : demo;
  return data as Activity[];
}
