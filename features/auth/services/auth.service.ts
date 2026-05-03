import bcrypt from 'bcrypt';
import {
  LoginFormData,
  ResetPasswordFormData,
  SignupFormData,
} from '../schema/auth.schema';
import { User } from '../models/user.model';
import { ConflictError, UnauthorizedError } from '@/lib/errors';
import { connectDB } from '@/lib/db';
import { jwtService } from '@/lib/jwt';
import { sendEmail } from '@/lib/email/send';
import ResetPasswordEmail from '@/lib/email/templates/reset-password';
import PasswordUpdatedEmail from '@/lib/email/templates/password-updated';

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

  async forgotPassword(email: string) {
    await connectDB();
    const message =
      'If this email exists in our system, you will receive a password reset link shortly.';

    const user = await User.findOne({ email: email });
    if (!user) {
      return { message: message };
    }

    const { resetToken, resetTokenExpiry } =
      await jwtService.generateResetToken(user._id.toString());

    await User.findByIdAndUpdate(user._id, {
      passwordResetToken: resetToken,
      passwordResetExpires: resetTokenExpiry,
    });

    await sendEmail({
      to: user.email,
      subject: 'Reset your JobTrack password',
      template: ResetPasswordEmail({
        clientName: user.firstName,
        resetUrl: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`,
      }),
    });

    return { message: message };
  },

  async resetPassword(data: ResetPasswordFormData, token: string) {
    await connectDB();
    const { isValid, userId } = await jwtService.verifyResetToken(token);

    if (!isValid || !userId) {
      throw new ConflictError('Invalid or expired reset token');
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user || user._id.toString() !== userId) {
      throw new ConflictError('Invalid or expired reset token');
    }

    const isSamePassword = await bcrypt.compare(data.password, user.password);
    if (isSamePassword) {
      throw new ConflictError(
        'New password cannot be the same as your current password',
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Your password has been updated',
      template: PasswordUpdatedEmail({
        clientName: user.firstName,
        loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/sign-in`,
        updatedAt: new Date().toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        }),
      }),
    });

    return {
      message: 'Password updated successfully',
    };
  },

  async upsertGoogleUser(user: any) {
    if (!user?.email) return false;

    await connectDB();

    try {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) return true;

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
  },
};
