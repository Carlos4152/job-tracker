'use server';
import { ActionResult } from '@/types/action-result';
import { NetworkData, networkSchema } from '../schemas/network.schema';
import { NetworkDTO } from '../types/network.types';
import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { revalidatePath } from 'next/cache';
import { handleError } from '@/lib/errors/handle-error';
import { NetworkContact } from '@/lib/database/models/network.model';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import { connectDB } from '@/lib/database/db';
import { serializeNetwork } from '../utils/serialize-network';

export async function UpdateNetwork(
  contactId: string,
  formData: NetworkData,
): Promise<ActionResult<NetworkDTO>> {
  await connectDB();
  const parsed = networkSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Invalid form data',
    };
  }

  try {
    const userId = await getCurrentUserId();

    const contact = await NetworkContact.findById(contactId);

    if (!contact) throw new NotFoundError('Contact not found');
    if (contact.userId.toString() !== userId)
      throw new UnauthorizedError('Not authorized');

    contact.set(parsed.data);
    await contact.save();

    revalidatePath('/jobs');

    return {
      success: true,
      message: 'Contact updated successfully',
      data: serializeNetwork(contact),
    };
  } catch (error) {
    return handleError(error);
  }
}
