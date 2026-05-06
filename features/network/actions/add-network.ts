'use server';
import { revalidatePath } from 'next/cache';

import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { connectDB } from '@/lib/database/db';
import { NetworkContact } from '@/lib/database/models/network.model';
import { handleError } from '@/lib/errors/handle-error';

import { ActionResult } from '@/types/action-result';
import { NetworkDTO } from '../types/network.types';

import { NetworkData, networkSchema } from '../schemas/network.schema';
import { serializeNetwork } from '../utils/serialize-network';


export async function AddNetwork(
  formData: NetworkData,
  applicationId: string,
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

    const contact = await NetworkContact.create({
      ...parsed.data,
      userId,
      applicationId,
    });

    revalidatePath('/jobs');

    return {
      success: true,
      message: 'Contact created successfully',
      data: serializeNetwork(contact),
    };
  } catch (error) {
    return handleError(error);
  }
}
