"use client";

import {
  ChakraProvider as Provider,
  createSystem,
  defaultConfig,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { ColorModeProvider } from "./color-mode";

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      colorPalette: "purple",
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-inter)" },
      },
    },
    semanticTokens: {
      radii: {
        l1: { value: "0.125rem" },
        l2: { value: "0.25rem" },
        l3: { value: "0.375rem" },
      },
    },
  },
});

export const ChakraProvider = (props: PropsWithChildren) => (
  <Provider value={system}>
    <ColorModeProvider>{props.children} </ColorModeProvider>
  </Provider>
);
