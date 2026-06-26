import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  message?: string;
  services?: string[];
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 422 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 422 });
  }

  const lead = {
    name,
    email,
    company: body.company?.trim() ?? "",
    budget: body.budget ?? "",
    services: Array.isArray(body.services) ? body.services : [],
    message,
    receivedAt: new Date().toISOString(),
  };

  // Pluggable delivery: forward to a webhook / email provider when configured.
  // Set CONTACT_FORWARD_URL (e.g. a Formspree/Zapier/Slack endpoint) in your env.
  const forwardUrl = process.env.CONTACT_FORWARD_URL;
  if (forwardUrl) {
    try {
      const res = await fetch(forwardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Forward failed: ${res.status}`);
    } catch (err) {
      console.error("[contact] forward error", err);
      return NextResponse.json(
        { error: "We couldn't send your message. Please email us directly." },
        { status: 502 },
      );
    }
  } else {
    // No provider wired up yet — record it so nothing is lost during setup.
    console.log("[contact] new lead", lead);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
