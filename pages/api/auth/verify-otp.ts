import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required.' });
  }

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.otp !== otp) {
    return res.status(401).json({ error: 'Invalid OTP or email.' });
  }

  // Clear OTP after successful login
  await prisma.user.update({ where: { email }, data: { otp: null } });

  // Optionally, update subscription status here if needed

  // Return success and user info
  return res.status(200).json({ success: true, user: { id: user.id, email: user.email } });
}
