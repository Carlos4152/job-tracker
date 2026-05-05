'use server';

import { ConflictError } from '@/lib/errors';
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
  ResetPasswordFormData,
  resetPasswordSchema,
  SignupFormData,
  signupSchema,
} from '../schema/auth.schema';
import { authService } from '../services/auth.service';

export async function signupAction(formData: SignupFormData) {
  const parsed = signupSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await authService.signup(parsed.data);
    return { success: true, message: result.message };
  } catch (error) {
    if (error instanceof ConflictError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}

export async function forgotPasswordAction(formData: ForgotPasswordFormData) {
  const parsed = forgotPasswordSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await authService.forgotPassword(parsed.data.email);
    return { success: true, message: result.message };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Something went wrong' };
  }
}

export async function resetPasswordAction(
  formData: ResetPasswordFormData,
  token: string,
) {
  const parsed = resetPasswordSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await authService.resetPassword(parsed.data, token);
    return { success: true, message: result.message };
  } catch (error) {
    if (error instanceof ConflictError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong' };
  }
}
