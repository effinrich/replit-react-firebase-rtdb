import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { weatherService } from '../services/weatherService';
import { toaster } from '../../../components/ui/toaster';
import { UserFormData } from '../../../types/user';

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, zipCode }: UserFormData) => {
      const locationData = await weatherService.getLocationData(zipCode);

      const userData = {
        name,
        zipCode,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        timezone: locationData.timezone
      };

      return await userService.addUser(userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toaster.success({
        title: 'User added successfully',
        description: 'The new user has been added to the database.',
      });
    },
    onError: (error: Error) => {
      toaster.error({
        title: 'Failed to add user',
        description: error.message,
      });
    },
  });
}
