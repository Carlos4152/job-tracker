import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: {
    token?: string;
  };
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const token = params.token;
  if (!token) redirect('/forgot-password');

  return <ResetPasswordForm token={token} />;
};

export default page;
