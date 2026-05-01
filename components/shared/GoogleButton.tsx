'use client';
import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import GoogleSvg from '@/public/google.svg';
import { signIn } from 'next-auth/react';

export default function GoogleButton() {
  return (
    <Button
      type="button"
      width="full"
      spinnerPlacement="start"
      variant="subtle"
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
    >
      <Image src={GoogleSvg} alt="Google Icon" width={18} height={18} />
      Google
    </Button>
  );
}
