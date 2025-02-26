import bcrypt from "bcrypt";

let users = []; // Temporary storage (use a database in production)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, userId } = req.body;
  if (!email || !password || !userId) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
}
