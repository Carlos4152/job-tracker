'use server';

import { handleError } from '@/lib/errors/handle-error';
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from '../schema/auth.schema';
import { connectDB } from '@/lib/database/db';
import { User } from '@/lib/database/models/user.model';
import { jwtService } from '@/lib/auth/jwt';
import { sendEmail } from '@/lib/email/send';
import ResetPasswordEmail from '@/lib/email/templates/reset-password';

export async function ForgotPassword(formData: ForgotPasswordFormData) {
  try {
    await connectDB();
    const message = 'you will receive a password reset link shortly.';
    const parsed = forgotPasswordSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const user = await User.findOne({ email: parsed.data.email });
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

    return { success: true, message: message };
  } catch (error) {
    return handleError(error);
  }
}
