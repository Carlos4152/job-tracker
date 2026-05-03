"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/shared/toast'
import { loginSchema, LoginFormData } from '@/features/auth/schema/auth.schema'
import { signinAction } from '../actions/auth.actions'

export default function useLogin() {
  const router = useRouter()

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
  })

  const onSubmit = async (data: LoginFormData) => {
    const result = await signinAction(data)

    if (!result.success) {
      toast.error('Login Failed', result.message || 'Invalid email or password.')
      return
    }

    toast.success('Success!', 'Redirecting to dashboard...', 3000)
    router.push('/dashboard')
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  }
}