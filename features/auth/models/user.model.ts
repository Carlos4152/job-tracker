import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  provider: 'credentials' | 'google';
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  verificationCode: string | null;
  verificationExpires: Date | null;
  online: boolean;
  accountConfirm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, default: null },
    provider: {
      type: String,
      enum: ['credentials', 'google'],
      default: 'credentials',
    },
    passwordResetToken: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
    verificationCode: { type: String, default: null },
    verificationExpires: { type: Date, default: null },
    online: { type: Boolean, default: false },
    accountConfirm: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
