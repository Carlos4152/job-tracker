'use server';

import { handleError } from '@/lib/errors/handle-error';
import { SignupFormData, signupSchema } from '../schema/auth.schema';
import { connectDB } from '@/lib/database/db';
import { User } from '@/lib/database/models/user.model';
import { ConflictError } from '@/lib/errors';
import bcrypt from 'bcrypt';
import { ActionResult } from '@/types/action-result';

export async function Signup(formData: SignupFormData): Promise<ActionResult> {
  try {
    await connectDB();
    const parsed = signupSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const userExists = await User.findOne({ email: parsed.data.email });
    if (userExists) {
      throw new ConflictError('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

    const user = await User.create({
      ...parsed.data,
      password: hashedPassword,
    });

    return {
      success: true,
      message: 'Account created successfully',
    };
  } catch (error) {
    return handleError(error);
  }
}
