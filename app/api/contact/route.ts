import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, orderNumber, message } = await req.json();
    if (!name || !email || !orderNumber || !message) {
      return NextResponse.json(
        {
          error: "Missing required fields or invalid data.",
        },
        { status: 400 }
      );
    }

    // SMTP config from env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to support
    await transporter.sendMail({
      from: `Contact Form <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nOrder Number: ${
        orderNumber || "N/A"
      }\nMessage: ${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Order Number:</b> ${
        orderNumber || "N/A"
      }</p><p><b>Message:</b><br/>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    // Auto-reply to sender (moderated, unique subject, headers, and styled HTML)
    const now = Date.now();
    const refId = `${now}-${Math.floor(Math.random() * 10000)}`;
    await transporter.sendMail({
      from: `Snuzz Support <no_reply_login@snuzzshop.com>`,
      to: email,
      replyTo: `no_reply_login@snuzzshop.com`,
      subject: `Thank you for contacting Snuzz Support [${refId}]`,
      text: `Dear ${name},\n\nThank you for reaching out to Snuzz Customer Support.\n\nWe have received your message and our team will get back to you as soon as possible.\n\nFor your reference, your ticket ID is: ${refId}.\n\nIf you did not submit this request, please ignore this email.\n\nBest regards,\nSnuzz Customer Support`,
      html: `<div style="font-family:sans-serif;font-size:16px;color:#222"><p>Dear ${name},</p><p>Thank you for reaching out to <b>Snuzz Customer Support</b>.</p><p>We have received your message and our team will get back to you as soon as possible.</p><div style="margin:18px 0 12px 0;font-size:14px;color:#888">Ticket ID: <b>${refId}</b></div><p>If you did not submit this request, please ignore this email.</p><br><p style="color:#888">Best regards,<br>Snuzz Customer Support</p></div>`,
      headers: {
        "X-Entity-Ref-ID": refId,
        "X-Mailer-Timestamp": now.toString(),
        "Message-ID": `<${refId}@snuzzshop.com>`,
        Date: new Date(now).toUTCString(),
        "List-Unsubscribe": `<mailto:no_reply_login@snuzzshop.com?subject=unsubscribe>`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
