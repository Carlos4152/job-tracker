"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/shared/toast'
import { signupSchema, SignupFormData } from '@/features/auth/schema/auth.schema'
import { signupAction } from '../actions/auth.actions'

export default function useSignup() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    const result = await signupAction(data)

    if (!result.success) {
      toast.error('Error', result.message || 'Signup failed')
      return
    }

    reset()
    toast.success('Success', result.message || 'Account created. Please sign in.')
    router.push('/sign-in')
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  }
}