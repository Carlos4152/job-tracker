import { JWTPayload, SignJWT, jwtVerify } from 'jose';

// @Types
export interface VerifyTokenResult<T = unknown> {
  isValid: boolean;
  payload?: T;
}

export enum TokenType {
  PASSWORD_RESET = 'password_reset',
  EMAIL_VERIFICATION = 'email_verification',
}

export const TokenExpiration = {
  PASSWORD_RESET: '1h',
  EMAIL_VERIFICATION: '24h',
} as const;

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error('JWT_SECRET environment variable is not set');
const secret = new TextEncoder().encode(secretKey);

// Helpers
async function signToken(payload: JWTPayload, expiresIn: string) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .setIssuedAt()
    .sign(secret);
}

async function verifyToken<T>(
  token: string,
  expectedType: TokenType,
): Promise<VerifyTokenResult<T>> {
  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.type !== expectedType) {
      return { isValid: false };
    }

    return {
      isValid: true,
      payload: payload as T,
    };
  } catch {
    return { isValid: false };
  }
}

// -----------------------------
// 🔹 SERVICE
// -----------------------------
export const jwtService = {
  // PASSWORD RESET
  async generateResetToken(userId: string) {
    const resetToken = await signToken(
      { userId, type: TokenType.PASSWORD_RESET },
      TokenExpiration.PASSWORD_RESET,
    );

    return {
      resetToken,
      resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
    };
  },

  async verifyResetToken(token: string) {
    const result = await verifyToken<{ userId: string }>(
      token,
      TokenType.PASSWORD_RESET,
    );

    return {
      isValid: result.isValid,
      userId: result.payload?.userId,
    };
  },

  // EMAIL VERIFICATION
  async generateVerificationToken(userId: string) {
    return signToken(
      { userId, type: TokenType.EMAIL_VERIFICATION },
      TokenExpiration.EMAIL_VERIFICATION,
    );
  },

  async verifyVerificationToken(token: string) {
    const result = await verifyToken<{ userId: string }>(
      token,
      TokenType.EMAIL_VERIFICATION,
    );

    return {
      isValid: result.isValid,
      userId: result.payload?.userId,
    };
  },
};
