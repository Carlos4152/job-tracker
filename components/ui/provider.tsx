// components/ui/provider.tsx
'use client';

import { system } from '@/lib/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function Provider({ children, ...props }: ThemeProviderProps) {
  
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange={true}
      enableSystem={false}
      defaultTheme="dark"
      {...props}
    >
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </ThemeProvider>
  );
}
