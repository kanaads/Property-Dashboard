import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Property, PropertyInsert } from '@/lib/database.types';
import { seedProperties } from '../seedData';

/** In-memory store backing the offline fallback so adds persist for the session. */
let localStore: Property[] = [...seedProperties];

/** Fetch all properties, newest first. */
export async function fetchProperties(): Promise<Property[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [...localStore].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/** Insert a new property and return the created row. */
export async function createProperty(payload: PropertyInsert): Promise<Property> {
  if (!isSupabaseConfigured || !supabase) {
    const created: Property = {
      ...payload,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    localStore = [created, ...localStore];
    return created;
  }

  const { data, error } = await supabase
    .from('properties')
    .insert(payload as never)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
