import { toast } from '@/components/shared/toast';
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from '@/modules/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function useForgotPassword() {
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    register,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.ok) {
        toast.error('Request Failed', result.error);
        return;
      }

      toast.success(
        'Email Sent',
        result.message ||
          'Password reset instructions have been sent to your email.',
      );

      reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Request failed. Please try again later.';

      toast.error('Error', message);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isSubmitting,
  };
}
