const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

// Generate an access token
async function generateToken(payload, expiresIn = "72h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify access token
async function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
}

// Decode token without verifying
function decodeToken(token) {
  return jwt.decode(token);
}

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
