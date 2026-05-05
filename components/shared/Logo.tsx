'use client';
import { Box, Link as ChakraLink, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

export default function Logo() {
  return (
    <Box>
      <ChakraLink
        asChild
        variant="plain"
        _hover={{ textDecor: 'none' }}
        focusRing="none"
      >
        <NextLink href="/">
          <Image
            src="/landit-logo.svg"
            alt="Landit Logo"
            width={35}
            height={35}
          />
          <Heading textTransform="uppercase">Landit</Heading>
        </NextLink>
      </ChakraLink>
    </Box>
  );
}
