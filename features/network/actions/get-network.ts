'use server';

import { ActionResult } from '@/types/action-result';
import { Network } from '../types/network.types';
import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { handleError } from '@/lib/errors/handle-error';
import { connectDB } from '@/lib/database/db';
import { NetworkContact } from '@/lib/database/models/network.model';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';

export async function GetNetwork(
  contactId: string,
): Promise<ActionResult<Network>> {
  try {
    await connectDB();
    const userId = await getCurrentUserId();

    const contact = await NetworkContact.findById(contactId);

    if (!contact) throw new NotFoundError('Contact not found');
    if (contact.userId.toString() !== userId)
      throw new UnauthorizedError('Not authorized');

    return { success: true, data: contact.toObject() };
  } catch (error) {
    return handleError(error);
  }
}
