import { useState } from 'react';
import {
  Table,
  Button,
  Box,
  Heading,
  Flex,
  Spinner,
  Text,
  IconButton
} from '@chakra-ui/react';
import { useUsers } from '../hooks/useUsers';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { AddUserModal } from './AddUserModal';
import { EditUserModal } from './EditUserModal';
import { formatTimezone } from '../../../utils/formatTimezone';

export function UserTable() {
  const { data: users = [], isLoading, error } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

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
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="2xl">User Dashboard</Heading>
        <Button colorScheme="blue" onClick={() => setIsAddModalOpen(true)}>
          Add User
        </Button>
      </Flex>

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
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell fontWeight="medium">{user.name}</Table.Cell>
                <Table.Cell>{user.zipCode}</Table.Cell>
                <Table.Cell>{user.latitude?.toFixed(4) || 'N/A'}</Table.Cell>
                <Table.Cell>{user.longitude?.toFixed(4) || 'N/A'}</Table.Cell>
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
  );
}
