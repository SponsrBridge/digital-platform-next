import { NextRequest, NextResponse } from "next/server";
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
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!sanityWriteClient) {
      return NextResponse.json(
        { success: false, message: "Service unavailable" },
        { status: 503 }
      );
    }

    // Check for duplicate subscription
    const existing = await sanityWriteClient.fetch(
      `count(*[_type == "newsletterSubscription" && email == $email])`,
      { email }
    );

    if (existing > 0) {
      return NextResponse.json(
        { success: false, message: "Already subscribed" },
        { status: 409 }
      );
    }

    await sanityWriteClient.create({
      _type: "newsletterSubscription",
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
