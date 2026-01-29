import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@sanity/client";

const sanityWriteClient =
  process.env.SANITY_PROJECT_ID && process.env.SANITY_WRITE_TOKEN
    ? createClient({
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET || "production",
        apiVersion: "2024-01-01",
        useCdn: false,
        token: process.env.SANITY_WRITE_TOKEN,
      })
    : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, honeypot } = body;

    // Honeypot check — bots will fill this hidden field
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Send email via SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SponsrBridge Contact" <${process.env.SMTP_USER}>`,
      to: "hello@sponsrbridge.io",
      // to: "arshaq0506@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // Store in Sanity
    if (sanityWriteClient) {
      await sanityWriteClient.create({
        _type: "contactSubmission",
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        message,
        submittedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 },
    );
  }
}
