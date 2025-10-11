import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/userService";
import { getLocationData } from "../services/weatherService";
import { toaster } from "../../../components/ui/toaster";

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, zipCode }) => {
      const locationData = await getLocationData(zipCode);

      const userData = {
        name,
        zipCode,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        timezone: locationData.timezone,
      };

      return await createUser(userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toaster.success({
        title: "User added successfully",
        description: "The new user has been added to the database.",
      });
    },
    onError: (error) => {
      toaster.error({
        title: "Failed to add user",
        description: error.message,
      });
    },
  });
}
