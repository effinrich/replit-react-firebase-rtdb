import { Box, Button, Heading, Text, VStack, Flex } from "@chakra-ui/react";
import { useAuth } from "../providers/auth-provider";

export function Login() {
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        maxW="md"
        w="full"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
      >
        <VStack gap={6}>
          <Heading size="2xl">User Dashboard</Heading>
          <Text fontSize="lg">Sign in to manage your users</Text>
          <Button size="lg" onClick={handleSignIn} width="full">
            Sign in with Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
