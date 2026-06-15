import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/ds-components/core/Input.jsx';
import { Select } from '@/ds-components/core/Select.jsx';
import { Button } from '@/ds-components/core/Button.jsx';
import { Badge } from '@/ds-components/core/Badge.jsx';
import { MapPin, Plus } from 'lucide-react';
import { PROPERTY_TYPES } from '@/lib/database.types';
import { useCreateProperty } from '../hooks/useProperties';
import {
  usePropertySchema,
  type PropertyFormValues,
} from '../hooks/usePropertySchema';

interface AddPropertyFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}


export function AddPropertyForm({ onSuccess, onCancel }: AddPropertyFormProps) {
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
    <form onSubmit={onSubmit} noValidate>
      <div className="pv-modal__body">
        <div className="pv-form__full">
          <Input
            id="title"
            label="Listing title"
            placeholder="e.g. The Linden — 24-unit multifamily"
            required
            {...register('title')}
            error={errors.title?.message}
          />
        </div>

        <div className="pv-form__full">
          <Input
            id="location"
            label="Location"
            placeholder="Neighborhood, City"
            iconLeft={<MapPin size={16} />}
            {...register('location')}
            error={errors.location?.message}
          />
        </div>

        <Input
          id="description"
          label="Property description"
          placeholder="Brief description of the listing..."
          {...register('description')}
          error={errors.description?.message}
        />

        <Input
          id="image_url"
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          {...register('image_url')}
          error={errors.image_url?.message}
        />

        <input type="hidden" {...register('latent_value_score', { valueAsNumber: true })} value={Math.floor(Math.random() * 40) + 50} />

        <Select
          id="property_type"
          label="Property type"
          {...register('property_type')}
          options={[...PROPERTY_TYPES]}
          error={errors.property_type?.message}
        />

        <Input
          id="price"
          label="Asking price"
          prefix="$"
          type="number"
          step="1000"
          placeholder="0"
          inputMode="numeric"
          required
          {...register('price', { valueAsNumber: true })}
          error={errors.price?.message}
        />

        <Input
          id="square_feet"
          label="Square footage"
          type="number"
          placeholder="0"
          inputMode="numeric"
          required
          {...register('square_feet', { valueAsNumber: true })}
          error={errors.square_feet?.message}
        />

        <Input
          id="bedrooms"
          label="Bedrooms"
          type="number"
          placeholder="0"
          inputMode="numeric"
          {...register('bedrooms', { valueAsNumber: true })}
          error={errors.bedrooms?.message}
        />

        <Input
          id="bathrooms"
          label="Bathrooms"
          type="number"
          step="0.5"
          placeholder="0"
          inputMode="numeric"
          {...register('bathrooms', { valueAsNumber: true })}
          error={errors.bathrooms?.message}
        />
      </div>

      <div className="pv-modal__foot">
        <Badge tone="gold" dot>Score pending ingest</Badge>
        <div className="pv-modal__foot-actions">
          <Button variant="ghost" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting} iconLeft={!isSubmitting && <Plus size={16} />}>
            {isSubmitting ? 'Adding…' : 'Add to portfolio'}
          </Button>
        </div>
      </div>
    </form>
  );
}

