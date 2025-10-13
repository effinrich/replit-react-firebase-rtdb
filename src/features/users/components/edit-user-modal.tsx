import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Stack,
  Text,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
  DialogBackdrop,
  DialogPositioner,
  Field,
  Portal,
} from "@chakra-ui/react";
import { useUpdateUser } from "../hooks/use-update-user";
import { userSchema } from "../schemas/user-schema";
import { User, UserFormData } from "../../../types/user";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const { mutate: updateUser, isPending, error } = useUpdateUser();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        zipCode: user.zipCode || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserFormData) => {
    if (!user) return;

    updateUser(
      {
        id: user.id,
        name: data.name,
        zipCode: data.zipCode,
        oldZipCode: user.zipCode,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  if (!user) return null;

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={onClose}
      size="md"
      placement={"top"}
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogCloseTrigger />
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogBody>
                <Stack gap={4}>
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>Name</Field.Label>
                    <Input
                      {...register("name")}
                      placeholder="Enter name"
                    />
                    {errors.name && (
                      <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  <Field.Root invalid={!!errors.zipCode}>
                    <Field.Label>Zip Code</Field.Label>
                    <Input
                      {...register("zipCode")}
                      placeholder="Enter 5-digit zip code"
                    />
                    {errors.zipCode && (
                      <Field.ErrorText>{errors.zipCode.message}</Field.ErrorText>
                    )}
                  </Field.Root>

                  {error && (
                    <Text color="red.500" fontSize="sm">
                      {error.message}
                    </Text>
                  )}
                </Stack>
              </DialogBody>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} colorScheme="blue">
                  {isPending ? "Updating..." : "Update User"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
}
