'use client';

import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Link as ChakraLink,
  HStack,
} from '@chakra-ui/react';
import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password';
import Logo from '@/components/shared/Logo';

export function ForgotPasswordForm() {
  const { handleSubmit, register, errors, isSubmitting } = useForgotPassword();

  return (
    <Box position="relative" h="full" display="flex" flexDirection="column">
      <Container
        maxW="lg"
        mx="auto"
        my="auto"
        px={4}
        width="full"
        display="flex"
        justifyContent="center"
      >
        <VStack as="form" onSubmit={handleSubmit} gap={8} width="full">
          <Box p={4}>
            <Logo />
          </Box>

          <Stack textAlign="center" gap={1.5}>
            <Heading as="h3" size="2xl">
              Reset Your Password
            </Heading>
            <Text color="fg.muted">
              Enter your email and we&apos;ll send you reset instructions
            </Text>
          </Stack>

          <VStack gap={5} width="full" px={2}>
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email Address</Field.Label>
              <Input
                type="email"
                placeholder="e.g. john.doe@example.com"
                {...register('email')}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Button
              type="submit"
              width="full"
              loading={isSubmitting}
              loadingText="Sending reset link..."
              spinnerPlacement="start"
            >
              Send Reset Password
            </Button>

            {/* Back to Sign In Link */}
            <ChakraLink
              textAlign="start"
              width="full"
              focusRing="none"
              asChild
              color="link"
            >
              <NextLink href="/sign-in">
                <HStack as="span" fontSize="sm">
                  Back to sign in
                </HStack>
              </NextLink>
            </ChakraLink>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
