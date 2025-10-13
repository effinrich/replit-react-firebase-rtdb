import { UserTable } from './features/users';
import { Toaster } from './components/ui/toaster';
import { useAuth } from './providers/auth-provider';
import { Login } from './components/login2';
import { Spinner, Flex } from '@chakra-ui/react';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      {user ? <UserTable /> : <Login />}
      <Toaster />
    </>
  );
}
