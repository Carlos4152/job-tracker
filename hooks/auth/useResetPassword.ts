import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from '@/modules/auth/auth.schema';
import { toast } from '@/components/shared/toast';

export function useResetPassword(token: string) {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error(
        'Invalid Link',
        'Reset token is missing. Please request a new password reset link.',
      );
      return;
    }

    try {
      const response = await fetch(`/api/auth/reset-password?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.ok) {
        toast.error(
          'Reset Failed',
          result.error || 'Unable to reset password. Please try again.',
        );
        return;
      }

      toast.success(
        'Password Updated',
        result.message ||
          'Your password has been updated. Please sign in with your new password.',
      );

      router.push('/sign-in');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';

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
