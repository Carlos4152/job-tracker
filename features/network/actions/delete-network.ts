'use server';

import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { connectDB } from '@/lib/database/db';
import { NetworkContact } from '@/lib/database/models/network.model';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import { handleError } from '@/lib/errors/handle-error';
import { ActionResult } from '@/types/action-result';
import { revalidatePath } from 'next/cache';

export async function DeleteNetwork(contactId: string): Promise<ActionResult> {
  try {
    await connectDB();
    const userId = await getCurrentUserId();

    const contact = await NetworkContact.findById(contactId);
    if (!contact) throw new NotFoundError('Contact not found');
    if (contact.userId.toString() !== userId)
      throw new UnauthorizedError('Not authorized');

    await contact.deleteOne();
    revalidatePath('/jobs');

    return { success: true, message: 'Contact deleted successfully' };
  } catch (error) {
    return handleError(error);
  }
}
