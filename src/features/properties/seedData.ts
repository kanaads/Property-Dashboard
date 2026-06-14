import type { Property } from '@/lib/database.types';

/**
 * Bundled seed dataset (12 listings) used as an offline fallback when Supabase
 * is not configured, and mirrored by supabase/seed.sql for the live database.
 */
export const seedProperties: Property[] = [
  {
    id: 'a1000000-0000-0000-0000-000000000001',
    created_at: '2026-05-01T10:00:00Z',
    title: 'Restored Craftsman with Income Potential',
    description:
      'Three-bed Craftsman near the transit corridor with an unfinished basement primed for an ADU conversion.',
    price: 312000,
    location: 'Indianapolis, IN',
    property_type: 'Single Family',
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1840,
    image_url:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 84,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000002',
    created_at: '2026-05-02T10:00:00Z',
    title: 'Downtown Loft Steps from the Cultural Trail',
    description:
      'Open-concept condo with exposed brick, high ceilings, and strong short-term rental comps.',
    price: 268500,
    location: 'Indianapolis, IN',
    property_type: 'Condo',
    bedrooms: 1,
    bathrooms: 1,
    square_feet: 980,
    image_url:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 71,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000003',
    created_at: '2026-05-03T10:00:00Z',
    title: 'Duplex with Below-Market Rents',
    description:
      'Side-by-side duplex with long-term tenants and clear upside on lease renewals.',
    price: 415000,
    location: 'Carmel, IN',
    property_type: 'Multi-Family',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2600,
    image_url:
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 90,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000004',
    created_at: '2026-05-04T10:00:00Z',
    title: 'Suburban Townhome Near Top Schools',
    description:
      'Low-maintenance townhome with an attached garage and a sought-after school district.',
    price: 289900,
    location: 'Fishers, IN',
    property_type: 'Townhouse',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 1720,
    image_url:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 66,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000005',
    created_at: '2026-05-05T10:00:00Z',
    title: 'Mixed-Use Storefront on Main',
    description:
      'Ground-floor retail with a vacant second-floor unit ready to lease or convert to residential.',
    price: 540000,
    location: 'Noblesville, IN',
    property_type: 'Commercial',
    bedrooms: 0,
    bathrooms: 2,
    square_feet: 3400,
    image_url:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 78,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000006',
    created_at: '2026-05-06T10:00:00Z',
    title: 'Mid-Century Ranch on a Double Lot',
    description:
      'Single-level ranch with an oversized lot offering subdivision or expansion potential.',
    price: 245000,
    location: 'Greenwood, IN',
    property_type: 'Single Family',
    bedrooms: 3,
    bathrooms: 1.5,
    square_feet: 1500,
    image_url:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 62,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000007',
    created_at: '2026-05-07T10:00:00Z',
    title: 'Lakeview Condo with Updated Systems',
    description:
      'Move-in-ready condo with new HVAC and water heater; low HOA relative to comparable units.',
    price: 199000,
    location: 'Indianapolis, IN',
    property_type: 'Condo',
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1150,
    image_url:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 58,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000008',
    created_at: '2026-05-08T10:00:00Z',
    title: 'Four-Plex with Value-Add Renovation Plan',
    description:
      'Stabilized four-plex with two units due for cosmetic refresh and rent repositioning.',
    price: 720000,
    location: 'Indianapolis, IN',
    property_type: 'Multi-Family',
    bedrooms: 8,
    bathrooms: 4,
    square_feet: 4200,
    image_url:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 93,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000009',
    created_at: '2026-05-09T10:00:00Z',
    title: 'Garden Townhome with Finished Basement',
    description:
      'Spacious townhome with a finished lower level ideal for a rental suite or home office.',
    price: 305000,
    location: 'Westfield, IN',
    property_type: 'Townhouse',
    bedrooms: 3,
    bathrooms: 3,
    square_feet: 2000,
    image_url:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 69,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000010',
    created_at: '2026-05-10T10:00:00Z',
    title: 'Brick Bungalow in Emerging Neighborhood',
    description:
      'Solid brick bungalow on a block with rising comps and active infill development.',
    price: 178000,
    location: 'Indianapolis, IN',
    property_type: 'Single Family',
    bedrooms: 2,
    bathrooms: 1,
    square_feet: 1100,
    image_url:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 75,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000011',
    created_at: '2026-05-11T10:00:00Z',
    title: 'Executive Home with Home-Office Wing',
    description:
      'Five-bedroom home with a dedicated office wing well suited to remote-work buyers.',
    price: 615000,
    location: 'Carmel, IN',
    property_type: 'Single Family',
    bedrooms: 5,
    bathrooms: 4,
    square_feet: 3800,
    image_url:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 81,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000012',
    created_at: '2026-05-12T10:00:00Z',
    title: 'Corner Retail Unit with Drive-Through',
    description:
      'High-visibility corner commercial unit with an existing drive-through lane and ample parking.',
    price: 480000,
    location: 'Fishers, IN',
    property_type: 'Commercial',
    bedrooms: 0,
    bathrooms: 1,
    square_feet: 2900,
    image_url:
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=800&q=70',
    latent_value_score: 73,
  },
];
