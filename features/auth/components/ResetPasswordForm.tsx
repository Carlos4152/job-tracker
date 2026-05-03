'use client';

import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Stack,
  Text,
  VStack,
  Link as ChakraLink,
  HStack,
} from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import { useResetPassword } from '@/features/auth/hooks/useResetPassword';

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { errors, handleSubmit, isSubmitting, register } =
    useResetPassword(token);

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
          <Box p={4}>Logo Here</Box>

          <Stack textAlign="center" gap={1.5}>
            <Heading as="h3" size="2xl">
              Set New Password
            </Heading>
            <Text color="fg.muted">Enter your new password below</Text>
          </Stack>

          <VStack gap={5} width="full" px={2}>
            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                placeholder="Enter your password"
                {...register('password')}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.confirmPassword}>
              <Field.Label>Confirm Password</Field.Label>
              <PasswordInput
                placeholder="Confirm your password"
                {...register('confirmPassword')}
              />
              <Field.ErrorText>
                {errors.confirmPassword?.message}
              </Field.ErrorText>
            </Field.Root>

            <Button
              type="submit"
              width="full"
              loading={isSubmitting}
              loadingText="Resetting password..."
              spinnerPlacement="start"
            >
              Reset Password
            </Button>

            <HStack textAlign="center" width="full" fontSize="sm">
              <Text as="span" color="fg.muted">
                Remember your password?{' '}
              </Text>
              <ChakraLink
                asChild
                color="blue.500"
                _hover={{ textDecoration: 'underline' }}
                focusRing="none"
              >
                <NextLink href="/sign-in">Sign in</NextLink>
              </ChakraLink>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
