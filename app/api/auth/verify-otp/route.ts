import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { email, otp } = body;
  if (!email || !otp) {
    return new Response(JSON.stringify({ error: 'Email and OTP are required.' }), { status: 400 });
  }

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.otp !== otp) {
    return new Response(JSON.stringify({ error: 'Invalid OTP or email.' }), { status: 401 });
  }

  // Clear OTP after successful login
  await prisma.user.update({ where: { email }, data: { otp: null } });

  // Optionally, update subscription status here if needed

  // Return success and user info
  return new Response(JSON.stringify({ success: true, user: { id: user.id, email: user.email } }), { status: 200 });
}
