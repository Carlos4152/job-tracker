'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/shared/toast';
import { loginSchema, LoginFormData } from '@/features/auth/schema/auth.schema';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function useLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!result.ok) {
      toast.error('Login Failed', result.error || 'Invalid email or password.');
      return;
    }

    toast.success('Success!', 'Redirecting to dashboard...', 3000);
    router.push('/jobs');
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
