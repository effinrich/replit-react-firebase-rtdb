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
import { useAddUser } from "../hooks/useAddUser";
import { userSchema } from "../schemas/userSchema";

export function AddUserModal({ isOpen, onClose }) {
  const { mutate: addUser, isPending, error } = useAddUser();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    addUser(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

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
              <DialogTitle>Add New User</DialogTitle>
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
                  {isPending ? "Adding..." : "Add User"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
}
