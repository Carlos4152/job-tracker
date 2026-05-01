import { ConflictError } from '@/lib/errors';
import { forgotPasswordSchema } from '@/modules/auth/auth.schema';
import { authService } from '@/modules/auth/auth.service';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const result = await authService.forgotPassword(parsed.data.email);
    return Response.json(
      { ok: true, message: result.message },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ConflictError) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    console.error('[FORGOT_PASSWORD_ERROR]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
