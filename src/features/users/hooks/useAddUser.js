import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { weatherService } from '../services/weatherService';

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, zipCode }) => {
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
    },
  });
}
