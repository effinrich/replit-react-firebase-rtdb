import { Box, Container, Heading, Stack, Flex } from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";

import { SocialLoginButton } from "./social-login-button";

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
    <Flex minH="100vh" align="center" justify="center">
      <Box
        maxW="md"
        w="full"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
      >
        <Stack gap="8">
          <Stack gap={{ base: "2", md: "3" }}>
            <Heading size={{ base: "2xl", md: "3xl" }}>
              Sign in to manage users
            </Heading>
          </Stack>

          <Stack gap="4">
            <SocialLoginButton onClick={handleSignIn} icon={<BsGoogle />}>
              Continue with Google
            </SocialLoginButton>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
