import { z } from 'zod';
import { PROPERTY_TYPES } from '@/lib/database.types';

export const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(10, 'Please add a short description (10+ characters).'),
  price: z.coerce.number().positive('Price must be greater than 0.'),
  location: z.string().min(2, 'Location is required.'),
  property_type: z.enum(PROPERTY_TYPES, {
    message: 'Select a property type.',
  }),
  bedrooms: z.coerce.number().int('Bedrooms must be a whole number.').min(0),
  bathrooms: z.coerce.number().min(0, 'Bathrooms cannot be negative.'),
  square_feet: z.coerce.number().int().positive('Square footage must be greater than 0.'),
  image_url: z.string().url('Enter a valid image URL.'),
  latent_value_score: z.coerce
    .number()
    .int()
    .min(1, 'Score is 1–100.')
    .max(100, 'Score is 1–100.'),
});

// Inferred type bridges form payload → Supabase insert (end-to-end type safety).
export type PropertyFormValues = z.infer<typeof propertySchema>;

/**
 * Zod schema mirroring the PostgreSQL constraints (Phase 4). Encapsulated in a
 * hook so create/edit forms share one source of truth (DRY principle).
 */
export function usePropertySchema(): {
  schema: typeof propertySchema;
  defaultValues: PropertyFormValues;
} {
  const schema = propertySchema;

  const defaultValues: PropertyFormValues = {
    title: '',
    description: '',
    price: 0,
    location: '',
    property_type: PROPERTY_TYPES[0],
    bedrooms: 0,
    bathrooms: 0,
    square_feet: 0,
    image_url: '',
    latent_value_score: 50,
  };

  return { schema, defaultValues };
}
