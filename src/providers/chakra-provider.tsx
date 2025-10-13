import { ChakraProvider as BaseChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ChakraProviderProps {
  children: ReactNode;
}

export function ChakraProvider({ children }: ChakraProviderProps) {
  return (
    <BaseChakraProvider value={defaultSystem}>
      {children}
    </BaseChakraProvider>
  );
}
