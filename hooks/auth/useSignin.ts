import { toast } from '@/components/shared/toast';
import { LoginFormData, loginSchema } from '@/modules/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function useLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log(result);

      if (result?.error) {
        toast.error(
          'Login Failed',
          'Invalid email or password. Please try again.',
        );
        return;
      }

      toast.success(
        'Success!',
        'Successfully signed in! Redirecting to dashboard...',
        3000,
      );

      console.log(result);
      router.push('/dashboard');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Sign in operation failed';
      toast.error('Login Error', message);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
    errors,
  };
}
