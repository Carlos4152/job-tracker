import bcrypt from 'bcrypt';
import { LoginFormData, SignupFormData } from './auth.schema';
import { User } from './user.model';
import { ConflictError, UnauthorizedError } from '@/lib/errors';
import { connectDB } from '@/lib/db';

export const authService = {
  async signup(userData: SignupFormData) {
    await connectDB();
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      throw new ConflictError('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    return {
      message: 'Account created successfully',
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    };
  },

  async signin(userData: LoginFormData) {
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
  },
};
