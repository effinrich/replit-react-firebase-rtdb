import { useState, useEffect } from "react";
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
import { useUpdateUser } from "../hooks/useUpdateUser";

export function EditUserModal({ isOpen, onClose, user }) {
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { mutate: updateUser, isPending, error } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setZipCode(user.zipCode || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser(
      {
        id: user.id,
        name,
        zipCode,
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

            <form onSubmit={handleSubmit}>
              <DialogBody>
                <Stack gap={4}>
                  <Field.Root required>
                    <Field.Label>Name</Field.Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      required
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Zip Code</Field.Label>
                    <Input
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="Enter zip code"
                      required
                    />
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
