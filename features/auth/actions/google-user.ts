'use server';

import { connectDB } from '@/lib/database/db';
import { User } from '@/lib/database/models/user.model';

type GoogleUserData = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function GoogleUser(user: GoogleUserData) {
  if (!user?.email) return false;

  await connectDB();

  try {
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      if (existingUser.provider !== 'google') return false;
      return true;
    }

    const [firstName, ...lastNameParts] = (user.name ?? '').split(' ');

    await User.create({
      email: user.email,
      firstName: firstName || '',
      lastName: lastNameParts.join(' ') || '',
      provider: 'google',
      password: null,
    });

    return true;
  } catch (error) {
    console.error('Failed to upsert Google user:', error);
    return false;
  }
}
