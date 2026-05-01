import { ConflictError } from '@/lib/errors';
import { signupSchema } from '@/modules/auth/auth.schema';
import { authService } from '@/modules/auth/auth.service';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const result = await authService.signup(parsed.data);
    return Response.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof ConflictError) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    console.error('[SIGNUP_ERROR]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
