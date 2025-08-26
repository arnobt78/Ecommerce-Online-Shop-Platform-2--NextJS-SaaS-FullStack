import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;
  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), {
      status: 400,
    });
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

  const now = Date.now();
  const refId = `${now}-${Math.floor(Math.random() * 10000)}`;
  await transporter.sendMail({
    from: `Snuzz PRO <${process.env.SMTP_USER}>`,
    to: email,
    replyTo: `${process.env.SMTP_USER}`,
    subject: `Your Snuzz PRO OTP Code: ${otp} [${now}]`,
    text: `Hello,\n\nYour OTP code for Snuzz PRO is: ${otp}\n\nThis code will expire in 1 minute.\nIf you did not request this, please ignore this email.\n\nThank you,\nSnuzz PRO Team`,
    html: `<div style=\"font-family:sans-serif;font-size:16px;color:#222\"><p>Hello,</p><p>Your <b>OTP code</b> for <b>Snuzz PRO</b> is:</p><div style=\"font-size:2em;font-weight:bold;letter-spacing:2px;margin:16px 0\">${otp}</div><p>This code will expire in <b>1 minute</b> (<span id=\"otp-timer\">60</span> seconds).</p><p>If you did not request this, please ignore this email.</p><br><p style=\"color:#888\">Thank you,<br>Snuzz PRO Team</p></div>`,
    headers: {
      "X-Entity-Ref-ID": refId,
      "X-Mailer-Timestamp": now.toString(),
      "Message-ID": `<${refId}@snuzzshop.com>`,
      Date: new Date(now).toUTCString(),
      "List-Unsubscribe": `<mailto:${process.env.SMTP_USER}?subject=unsubscribe>`,
    },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
