import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  verificationCode: string;
  verificationExpires: Date;
  online: boolean;
  accountConfirm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
  verificationCode: { type: String, default: null },
  verificationExpires: { type: Date, default: null },
  online: { type: Boolean, default: false },
  accountConfirm: { type: Boolean, default: false },
});

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
