'use client';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Field,
  Grid,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Link as ChakraLink,
  HStack,
} from '@chakra-ui/react';

import useSignup from '@/hooks/auth/useSignup';
import { PasswordInput } from '../ui/password-input';

export function SignupForm() {
  const { handleSubmit, errors, register, isSubmitting } = useSignup();

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

          {/* Header */}
          <Stack textAlign="center" gap={1.5}>
            <Heading as="h3" size="2xl">
              Complete Your Account Setup
            </Heading>
            <Text color="fg.muted">
              Your payment was successful! Just add your details to get started.
            </Text>
          </Stack>

          {/* Form Fields */}
          <VStack gap={5} width="full" px={2}>
            {/* First Name + Last Name Grid */}
            <Grid
              templateColumns={{ base: '1fr', md: '1fr 1fr' }}
              gap={3}
              width="full"
            >
              {/* First Name */}
              <Field.Root invalid={!!errors.firstName}>
                <Field.Label>First Name</Field.Label>
                <Input placeholder="e.g. John" {...register('firstName')} />
                <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
              </Field.Root>

              {/* Last Name */}
              <Field.Root invalid={!!errors.lastName}>
                <Field.Label>Last Name</Field.Label>
                <Input placeholder="e.g. Doe" {...register('lastName')} />
                <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
              </Field.Root>
            </Grid>

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
                placeholder="Create a strong password"
                {...register('password')}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            {/* Submit Button */}
            <Button
              type="submit"
              width="full"
              loading={isSubmitting}
              loadingText="Creating account..."
              spinnerPlacement="start"
            >
              Sign Up
            </Button>

            {/* Sign In Link */}
            <HStack textAlign="center" width="full" fontSize="sm">
              <Text as="span" color="fg.muted">
                Already have an account?{' '}
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
