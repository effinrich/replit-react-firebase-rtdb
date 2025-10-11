import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/userService";
import { getLocationData } from "../services/weatherService";
import { toaster } from "../../../components/ui/toaster";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name, zipCode, oldZipCode }) => {
      let locationData = null;

      if (zipCode !== oldZipCode) {
        locationData = await getLocationData(zipCode);
      }

      const userData = {
        name,
        zipCode,
        ...(locationData && {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          timezone: locationData.timezone,
        }),
      };

      return updateUser(id, userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toaster.success({
        title: "User updated successfully",
        description: "The user information has been updated.",
      });
    },
    onError: (error) => {
      toaster.error({
        title: "Failed to update user",
        description: error.message,
      });
    },
  });
}
