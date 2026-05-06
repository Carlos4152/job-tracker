export type NetworkDTO = {
  _id: string;
  userId: string;
  applicationId: string;
  name: string;
  jobTitle: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  linkedin: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};
