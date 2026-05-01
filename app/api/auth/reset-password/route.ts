import { ConflictError } from '@/lib/errors';
import { forgotPasswordSchema, resetPasswordSchema } from '@/modules/auth/auth.schema';
import { authService } from '@/modules/auth/auth.service';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

      const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return Response.json(
        { error: 'Missing reset token' },
        { status: 400 }
      );
    }

    const result = await authService.resetPassword(parsed.data, token);

    return Response.json(
      { ok: true, message: result.message },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ConflictError) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    console.error('[RESET_PASSWORD_ERROR]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
