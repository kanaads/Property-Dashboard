import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/Button';
import { Input, Select } from '@/shared/components/ui/Field';
import { PROPERTY_TYPES } from '@/lib/database.types';
import { useCreateProperty } from '../hooks/useProperties';
import {
  usePropertySchema,
  type PropertyFormValues,
} from '../hooks/usePropertySchema';

interface AddPropertyFormProps {
  onSuccess: () => void;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

export function AddPropertyForm({ onSuccess }: AddPropertyFormProps) {
  const { schema, defaultValues } = usePropertySchema();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const createProperty = useCreateProperty();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createProperty.mutateAsync(values);
      onSuccess();
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Failed to add property.',
      });
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="title" className="text-xs font-semibold text-navy-700">
          Title
        </label>
        <Input
          id="title"
          {...register('title')}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        <FieldError id="title-error" message={errors.title?.message} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="description" className="text-xs font-semibold text-navy-700">
          Description
        </label>
        <Input
          id="description"
          {...register('description')}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        <FieldError id="description-error" message={errors.description?.message} />
      </div>

      <div>
        <label htmlFor="location" className="text-xs font-semibold text-navy-700">
          Location
        </label>
        <Input
          id="location"
          {...register('location')}
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? 'location-error' : undefined}
        />
        <FieldError id="location-error" message={errors.location?.message} />
      </div>

      <div>
        <label htmlFor="property_type" className="text-xs font-semibold text-navy-700">
          Property Type
        </label>
        <Select
          id="property_type"
          {...register('property_type')}
          aria-describedby={errors.property_type ? 'property_type-error' : undefined}
        >
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <FieldError id="property_type-error" message={errors.property_type?.message} />
      </div>

      <div>
        <label htmlFor="price" className="text-xs font-semibold text-navy-700">
          Price (USD)
        </label>
        <Input
          id="price"
          type="number"
          step="1000"
          {...register('price')}
          aria-invalid={!!errors.price}
          aria-describedby={errors.price ? 'price-error' : undefined}
        />
        <FieldError id="price-error" message={errors.price?.message} />
      </div>

      <div>
        <label htmlFor="square_feet" className="text-xs font-semibold text-navy-700">
          Square Feet
        </label>
        <Input
          id="square_feet"
          type="number"
          {...register('square_feet')}
          aria-invalid={!!errors.square_feet}
          aria-describedby={errors.square_feet ? 'square_feet-error' : undefined}
        />
        <FieldError id="square_feet-error" message={errors.square_feet?.message} />
      </div>

      <div>
        <label htmlFor="bedrooms" className="text-xs font-semibold text-navy-700">
          Bedrooms
        </label>
        <Input
          id="bedrooms"
          type="number"
          {...register('bedrooms')}
          aria-invalid={!!errors.bedrooms}
          aria-describedby={errors.bedrooms ? 'bedrooms-error' : undefined}
        />
        <FieldError id="bedrooms-error" message={errors.bedrooms?.message} />
      </div>

      <div>
        <label htmlFor="bathrooms" className="text-xs font-semibold text-navy-700">
          Bathrooms
        </label>
        <Input
          id="bathrooms"
          type="number"
          step="0.5"
          {...register('bathrooms')}
          aria-invalid={!!errors.bathrooms}
          aria-describedby={errors.bathrooms ? 'bathrooms-error' : undefined}
        />
        <FieldError id="bathrooms-error" message={errors.bathrooms?.message} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="image_url" className="text-xs font-semibold text-navy-700">
          Image URL
        </label>
        <Input
          id="image_url"
          type="url"
          placeholder="https://…"
          {...register('image_url')}
          aria-invalid={!!errors.image_url}
          aria-describedby={errors.image_url ? 'image_url-error' : undefined}
        />
        <FieldError id="image_url-error" message={errors.image_url?.message} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="latent_value_score" className="text-xs font-semibold text-navy-700">
          Latent Value Score (1–100)
        </label>
        <Input
          id="latent_value_score"
          type="number"
          min={1}
          max={100}
          {...register('latent_value_score')}
          aria-invalid={!!errors.latent_value_score}
          aria-describedby={errors.latent_value_score ? 'latent_value_score-error' : undefined}
        />
        <FieldError id="latent_value_score-error" message={errors.latent_value_score?.message} />
      </div>

      {errors.root && (
        <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
          {errors.root.message}
        </p>
      )}

      <div className="sm:col-span-2 mt-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding…' : 'Add Property'}
        </Button>
      </div>
    </form>
  );
}
