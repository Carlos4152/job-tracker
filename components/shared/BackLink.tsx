'use client';
import { Box, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

interface BackLinkProps {
  path: string;
  label: string;
}

export default function BackLink({ path, label }: BackLinkProps) {
  return (
    <Box>
      <ChakraLink asChild focusRing="none">
        <NextLink href={path}>{label}</NextLink>
      </ChakraLink>
    </Box>
  );
}
