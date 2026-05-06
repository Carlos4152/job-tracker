'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/shared/toast';
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from '../schema/auth.schema';
import { ResetPassword } from '../actions/reset-password';

export function useResetPassword(token: string) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error('Invalid Link', 'Please request a new reset link.');
      router.push('/forgot-password');
    }
  }, [token, router]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    const result = await ResetPassword(data, token);

    if (!result.success) {
      toast.error(
        'Reset Failed',
        result.message || 'Unable to reset password.',
      );
      return;
    }

    toast.success(
      'Password Updated',
      result.message || 'Please sign in with your new password.',
    );
    router.push('/sign-in');
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
