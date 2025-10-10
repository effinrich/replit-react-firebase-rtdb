import { useState } from "react";
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
  Field,
} from "@chakra-ui/react";
import { useAddUser } from "../hooks/useAddUser";

export function AddUserModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { mutate: addUser, isPending, error } = useAddUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    addUser(
      { name, zipCode },
      {
        onSuccess: () => {
          setName("");
          setZipCode("");
          onClose();
        },
      },
    );
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} placement={'top'}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
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
            <Button variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} colorScheme="blue">
              {isPending ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
