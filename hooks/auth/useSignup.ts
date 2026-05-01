import { toast } from '@/components/shared/toast';
import { SignupFormData, signupSchema } from '@/modules/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function useSignup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error('Error', result.error || 'Signup failed');
        return;
      }

      reset();
      toast.success(
        'Success',
        result.message ||
          'Your account has been created. Please sign in to continue.',
      );

      router.push('/sign-in');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Error', 'Something went wrong. Please try again.');
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
