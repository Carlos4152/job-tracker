import { INetwork } from '@/lib/database/models/network.model';
import { NetworkDTO } from '../types/network.types';

export function serializeNetwork(contact: INetwork): NetworkDTO {
  return {
    _id: contact._id.toString(),
    userId: contact.userId.toString(),
    applicationId: contact.applicationId.toString(),
    name: contact.name,
    jobTitle: contact.jobTitle,
    email: contact.email,
    phone: contact.phone ?? null,
    location: contact.location ?? null,
    linkedin: contact.linkedin,
    imageUrl: contact.imageUrl ?? null,
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString(),
  };
}
