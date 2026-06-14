import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Property, PropertyInsert } from '@/lib/database.types';
import { createProperty, fetchProperties } from '../api/propertiesApi';

const PROPERTIES_KEY = ['properties'] as const;

/** Read server state for the property list (Phase 2 — TanStack Query). */
export function useProperties() {
  return useQuery({
    queryKey: PROPERTIES_KEY,
    queryFn: fetchProperties,
  });
}

/** Mutation to add a property, invalidating the list cache on success. */
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation<Property, Error, PropertyInsert>({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_KEY });
    },
  });
}
