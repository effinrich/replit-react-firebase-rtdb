import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
} from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";

import { Logo } from "./logo";
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
    <Box height="full">
      <Container maxW="md" py={{ base: "24", md: "32" }} >
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
      </Container>
    </Box>
  );
}
