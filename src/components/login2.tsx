import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Stack
} from '@chakra-ui/react'
import { BsGoogle } from 'react-icons/bs'

import { Logo } from './logo'
import { ImagePlaceholder } from './image-placeholder'
import { SocialLoginButton } from './social-login-button'

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
    <Flex height="full" flex="1">
      <Flex direction="column" flex="1.5">
        <HStack justify="space-between" px={{ base: '4', md: '8' }} minH="16">
          <Logo />
          <Link href="#" variant="underline" textStyle="sm">
            Not working? Get help
          </Link>
        </HStack>

        <Container maxW="md" flex="1" py={{ base: '24', md: '32' }}>
          <Stack gap="8">
            <Stack gap={{ base: '2', md: '3' }}>
              <Heading size={{ base: '2xl', md: '3xl' }}>Sign in</Heading>
              
            </Stack>

            <Stack gap="4">
              <SocialLoginButton onClick={handleSignIn} icon={<BsGoogle />}>Continue with Google</SocialLoginButton>
            </Stack>
          </Stack>
        </Container>
      </Flex>
      <Box flex="1" hideBelow="lg">
        <ImagePlaceholder />
      </Box>
    </Flex>
  )
}
