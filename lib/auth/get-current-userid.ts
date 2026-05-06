import { UnauthorizedError } from '../errors';
import { auth } from './auth';

export async function getCurrentUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new UnauthorizedError('Not authenticated');
  return session.user.id;
}
