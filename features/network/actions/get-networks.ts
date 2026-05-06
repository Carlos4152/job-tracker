'use server';

import { ActionResult } from '@/types/action-result';
import { NetworkDTO } from '../types/network.types';
import { getCurrentUserId } from '@/lib/auth/get-current-userid';
import { handleError } from '@/lib/errors/handle-error';
import { connectDB } from '@/lib/database/db';
import { NetworkContact } from '@/lib/database/models/network.model';
import { serializeNetwork } from '../utils/serialize-network';

export async function GetNetworks(
  applicationId: string,
): Promise<ActionResult<NetworkDTO[]>> {
  try {
    await connectDB();
    const userId = await getCurrentUserId();

    const contacts = await NetworkContact.find({ userId, applicationId });

    return {
      success: true,
      data: contacts.map((c) => serializeNetwork(c)),
    };
  } catch (error) {
    return handleError(error);
  }
}
