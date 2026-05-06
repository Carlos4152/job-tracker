import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        link: {
          value: { base: '{colors.blue.600}', _dark: '{colors.blue.500}' },
        },
      },
    },
    tokens: {
      fonts: {
        heading: { value: 'var(--font-dm-sans), sans-serif' },
        body: { value: 'var(--font-dm-sans), sans-serif' },
      },
    },
  },
  globalCss: {
    'html, body': {
      fontFamily: 'var(--font-dm-sans), sans-serif',
    },
    h1: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
    },
    h2: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
    },
    h3: {
      fontFamily: 'var(--font-dm-sans), sans-serif',
    },
    h4: {
      fontFamily: 'var(--font-dm-sans), sans-serif',
    },
    h5: {
      fontFamily: 'var(--font-dm-sans), sans-serif',
    },
    h6: {
      fontFamily: 'var(--font-dm-sans), sans-serif',
    },
  },
});

export const system = createSystem(defaultConfig, config);
