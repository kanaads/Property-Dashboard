/**
 * Database type definitions mirroring the Supabase PostgreSQL schema.
 * In a live project these are generated via `supabase gen types typescript`.
 * They are committed here so the app type-checks without a live connection.
 */

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          price: number;
          location: string;
          property_type: string;
          bedrooms: number;
          bathrooms: number;
          square_feet: number;
          image_url: string;
          latent_value_score: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description: string;
          price: number;
          location: string;
          property_type: string;
          bedrooms: number;
          bathrooms: number;
          square_feet: number;
          image_url: string;
          latent_value_score: number;
        };
        Update: Partial<Database['public']['Tables']['properties']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Property = Database['public']['Tables']['properties']['Row'];
export type PropertyInsert = Database['public']['Tables']['properties']['Insert'];

export const PROPERTY_TYPES = [
  'Single Family',
  'Condo',
  'Townhouse',
  'Multi-Family',
  'Commercial',
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];
