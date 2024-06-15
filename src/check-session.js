// pages/api/check-session.js
import { auth } from "@/auth";

export default async function handler(req, res) {
  const session = await auth(req);

  if (session?.user) {
    res.status(200).json({ user: session.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
