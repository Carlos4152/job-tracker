import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  company: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  platform: string;
  location: string;
  salary?: string;
  jobLink: string;
  companyWebsite?: string;
  companyLinkedIn?: string;
  description?: string;
  timeline: ITimelineEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITimelineEntry {
  event: string;
  date: Date;
  note?: string;
}

const timelineSchema = new Schema<ITimelineEntry>(
  {
    event: { type: String, required: true },
    date: { type: Date, required: true },
    note: { type: String, default: null },
  },
  { _id: false },
);

const jobSchema = new Schema<IJob>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    company: { type: String, required: true },
    status: {
      type: String,
      enum: ['applied', 'interview', 'offer', 'rejected'],
      default: 'applied',
    },
    platform: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, default: null },
    jobLink: { type: String, required: true },
    companyWebsite: { type: String, default: null },
    companyLinkedIn: { type: String, default: null },
    description: { type: String, default: null },
    timeline: { type: [timelineSchema], default: [] },
  },
  { timestamps: true },
);

jobSchema.pre('deleteOne', { document: true, query: false }, async function () {
  const NetworkContact = mongoose.model('NetworkContact');
  await NetworkContact.deleteMany({ applicationId: this._id });
});

export const Job =
  mongoose.models.Job || mongoose.model<IJob>('Job', jobSchema);
