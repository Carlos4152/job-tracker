'use server';
import bcrypt from 'bcrypt';
import { handleError } from '@/lib/errors/handle-error';
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from '../schema/auth.schema';
import { connectDB } from '@/lib/database/db';
import { jwtService } from '@/lib/auth/jwt';
import { ConflictError } from '@/lib/errors';
import { User } from '@/lib/database/models/user.model';
import { sendEmail } from '@/lib/email/send';
import PasswordUpdatedEmail from '@/lib/email/templates/password-updated';
import { ActionResult } from '@/types/action-result';

export async function ResetPassword(
  formData: ResetPasswordFormData,
  token: string,
): Promise<ActionResult> {
  try {
    await connectDB();
    const parsed = resetPasswordSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }

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

    const isSamePassword = await bcrypt.compare(
      parsed.data.password,
      user.password,
    );
    if (isSamePassword) {
      throw new ConflictError(
        'New password cannot be the same as your current password',
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

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
      success: true,
      message: 'Password updated successfully',
    };
  } catch (error) {
    return handleError(error);
  }
}
