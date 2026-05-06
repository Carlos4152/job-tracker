'use server';

import { connectDB } from '@/lib/database/db';
import { User } from '@/lib/database/models/user.model';
import { UnauthorizedError } from '@/lib/errors';
import { LoginFormData } from '../schema/auth.schema';
import bcrypt from 'bcrypt';

export async function SignIn(userData: LoginFormData) {
  await connectDB();

  const user = await User.findOne({ email: userData.email });
  if (!user) throw new UnauthorizedError('Invalid credentials');

  const isValid = await bcrypt.compare(userData.password, user.password);
  if (!isValid) throw new UnauthorizedError('Invalid credentials');

  return {
    message: 'Login successfully',
    user: {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
}
