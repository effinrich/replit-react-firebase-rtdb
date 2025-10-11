import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/userService";
import { toaster } from "../../../components/ui/toaster";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toaster.success({
        title: "User deleted successfully",
        description: "The user has been removed from the database.",
      });
    },
    onError: (error) => {
      toaster.error({
        title: "Failed to delete user",
        description: error.message,
      });
    },
  });
}
