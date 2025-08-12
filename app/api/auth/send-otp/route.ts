import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;
  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
  }

  // Find or create user
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }

  // Generate OTP and save to DB
  const otp = generateOtp();
  await prisma.user.update({ where: { email }, data: { otp } });

  // Send OTP email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Your Snuzz PRO OTP Code',
    text: `Your OTP code is: ${otp}`,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
