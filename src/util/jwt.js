import * as jose from 'jose';

// Secret key should be properly encoded for jose to use
async function getSecretKey() {
  const secret = process.env.NEXT_PUBLIC_SECRET_KEY;
  // Convert string to Uint8Array for jose's API
  return new TextEncoder().encode(secret);
}

// Generate an access token
export async function generateToken(payload, expiresIn = "72h") {
  const secretKey = await getSecretKey();
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

// Verify access token
export async function verifyToken(token) {
  try {
    const secretKey = await getSecretKey();
    const { payload } = await jose.jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
}

// Decode token without verifying
export function decodeToken(token) {
  return jose.decodeJwt(token);
}