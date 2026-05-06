import mongoose, { Schema, Document } from 'mongoose';

export interface INetwork extends Document {
  userId: mongoose.Types.ObjectId;
  applicationId: mongoose.Types.ObjectId;
  name: string;
  jobTitle: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const networkSchema = new Schema<INetwork>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    jobTitle: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    location: { type: String, default: null },
    linkedin: { type: String, required: true },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true },
);

export const NetworkContact =
  mongoose.models.NetworkContact ||
  mongoose.model<INetwork>('NetworkContact', networkSchema);
