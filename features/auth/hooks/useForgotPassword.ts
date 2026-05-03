'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/shared/toast';
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from '@/features/auth/schema/auth.schema';
import { forgotPasswordAction } from '../actions/auth.actions';

export function useForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const result = await forgotPasswordAction(data);

    if (!result.success) {
      toast.error('Request Failed', result.message || 'Something went wrong.');
      return;
    }

    toast.success(
      'Email Sent',
      result.message || 'Check your inbox for reset instructions.',
    );
    reset();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
