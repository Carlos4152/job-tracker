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
  Separator,
} from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import useLogin from '@/features/auth/hooks/useSignin';
import GoogleButton from '../../../components/shared/GoogleButton';

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

          <GoogleButton />

          <HStack w="full" align="center">
            <Separator flex="1" />
            <Text px="2">or</Text>
            <Separator flex="1" />
          </HStack>

          {/* Form Fields */}
          <Stack gap={5} width="full" px={2}>
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
              <Stack
                pt={1}
                display="flex"
                justifyContent="end"
                alignItems="end"
                width="100%"
              >
                <ChakraLink
                  focusRing="none"
                  asChild
                  fontSize="sm"
                  color="blue.500"
                >
                  <NextLink href="/forgot-password">Forgot password?</NextLink>
                </ChakraLink>
              </Stack>
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

            <Stack width="100%">
              <Box display="flex" fontSize="sm" gap={2} justifyContent="center">
                <Text>Don't have an account? </Text>
                <ChakraLink focusRing="none" asChild color="blue.500">
                  <NextLink href="/sign-up">Create an account</NextLink>
                </ChakraLink>
              </Box>
            </Stack>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
}
