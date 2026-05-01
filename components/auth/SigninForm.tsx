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
  Icon,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import useLogin from '@/hooks/auth/useSignin';

export function SigninForm() {
  const { handleSubmit, errors, isSubmitting, register } = useLogin();

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
          <Box p={4}>Logo here</Box>
          <Stack textAlign="center" gap={1.5}>
            <Heading as="h3" size="2xl">
              Welcome Back!
            </Heading>
            <Text color="fg.muted">
              Please enter credentials to access your account
            </Text>
          </Stack>

          {/* Form Fields */}
          <VStack gap={5} width="full" px={2}>
            {/* Email Field */}
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email Address</Field.Label>
              <Input
                type="email"
                placeholder="e.g. john.doe@example.com"
                {...register('email')}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            {/* Password Field */}
            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>

              <PasswordInput
                placeholder="Enter your password"
                {...register('password')}
              />

              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            {/* Submit Button */}
            <Button
              type="submit"
              width="full"
              loading={isSubmitting}
              loadingText="Signing in..."
              spinnerPlacement="start"
            >
              Sign In
            </Button>

            {/* Forgot Password Link */}
            <ChakraLink textAlign="start" width="full" focusRing="none" asChild>
              <NextLink href="/forgot-password">
                <Text as="span" fontSize="sm">
                  Forgot password?
                </Text>
              </NextLink>
            </ChakraLink>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
