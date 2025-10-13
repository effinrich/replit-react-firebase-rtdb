import { useState, useMemo } from "react";
import {
  Table,
  Button,
  Box,
  Heading,
  Flex,
  Spinner,
  Text,
  Input,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { useUsers } from "../hooks/use-users";
import { useDeleteUser } from "../hooks/use-delete-user";
import { AddUserModal } from "./add-user-modal";
import { EditUserModal } from "./edit-user-modal";
import { formatTimezone } from "../../../utils/format-timezone";
import { Logo } from "../../../components/logo";
import { useAuth } from "../../../providers/auth-provider";
import { User } from "../../../types/user";

export function UserTable() {
  const { data: users = [], isLoading, error } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { user: authUser, signOut } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }

    const query = searchQuery.toLowerCase().trim();
    return users.filter((user) => {
      const name = (user.name || "").toLowerCase();
      const zipCode = String(user.zipCode || "").toLowerCase();

      return name.includes(query) || zipCode.includes(query);
    });
  }, [users, searchQuery]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Text color="red.500">Error loading users: {error.message}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        borderBottom="1px"
        borderColor="gray.200"
        px={8}
        py={4}
        bg={{ base: "purple.900", _dark: "gray.900" }}
      >
        <Flex justify="space-between" align="center">
          <HStack justify="space-between">
            <Logo />
            <Flex align="center" gap={3}>
              <Avatar.Root
                size="sm"
                name={authUser?.displayName || authUser?.email || undefined}
                src={authUser?.photoURL || undefined}
              >
                <Avatar.Image />
              </Avatar.Root>
              <Box>
                <Text fontWeight="medium" fontSize="sm">
                  {authUser?.displayName || "User"}
                </Text>
                <Text
                  fontSize="xs"
                  color={{ base: "purple.900", _dark: "gray.400" }}
                >
                  {authUser?.email}
                </Text>
              </Box>
            </Flex>
            <Button size="sm" variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </HStack>
        </Flex>
      </Box>

      <Box p={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="xl">Users</Heading>
          <Button colorScheme="purple" onClick={() => setIsAddModalOpen(true)}>
            Add User
          </Button>
        </Flex>

        {users.length > 0 && (
          <Box mb={6}>
            <Input
              placeholder="Search by name or zip code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="lg"
              maxW="400px"
            />
          </Box>
        )}

        {users.length === 0 ? (
          <Box
            p={8}
            textAlign="center"
            borderWidth="1px"
            borderRadius="lg"
            borderStyle="dashed"
          >
            <Text fontSize="lg" color="gray.500">
              No users yet. Click "Add User" to create your first user.
            </Text>
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Box p={8} textAlign="center" borderWidth="1px" borderRadius="lg">
            <Text fontSize="lg" color="gray.500">
              No users found matching "{searchQuery}"
            </Text>
          </Box>
        ) : (
          <Table.Root variant="outline" size="lg">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Zip Code</Table.ColumnHeader>
                <Table.ColumnHeader>Latitude</Table.ColumnHeader>
                <Table.ColumnHeader>Longitude</Table.ColumnHeader>
                <Table.ColumnHeader>Timezone</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredUsers.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell fontWeight="medium">{user.name}</Table.Cell>
                  <Table.Cell>{user.zipCode}</Table.Cell>
                  <Table.Cell>{user.latitude?.toFixed(4) || "N/A"}</Table.Cell>
                  <Table.Cell>{user.longitude?.toFixed(4) || "N/A"}</Table.Cell>
                  <Table.Cell>{formatTimezone(user.timezone)}</Table.Cell>
                  <Table.Cell>
                    <Flex gap={2}>
                      <Button size="sm" onClick={() => handleEdit(user)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}

        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
        />
      </Box>
    </Box>
  );
}
