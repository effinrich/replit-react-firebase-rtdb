import { Container } from '@chakra-ui/react'

import { ColorModeButton } from "../../providers/color-mode";

export const Footer = () => {
  return (
    <Container minH="40" width="100%" borderTopWidth="1px" as="footer" py="4" mt="8" display="flex" alignItems="center" justifyContent="center">
      <Container textAlign="right">
        <ColorModeButton />
      </Container>
    </Container>
  )
}
