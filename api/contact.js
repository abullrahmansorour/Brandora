const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const trim = (value) => typeof value === "string" ? value.trim() : "";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response(null, { status: 405, headers: { Allow: "POST" } });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    const name = trim(body.name);
    const email = trim(body.email);
    const message = trim(body.message);

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 422 },
      );
    }

    if (!isEmail(email)) {
      return Response.json({ error: "Invalid email address." }, { status: 422 });
    }

    const lead = {
      name,
      email,
      company: trim(body.company),
      budget: body.budget ?? "",
      services: Array.isArray(body.services) ? body.services : [],
      message,
      receivedAt: new Date().toISOString(),
    };

    const forwardUrl = process.env.CONTACT_FORWARD_URL;
    if (forwardUrl) {
      try {
        const response = await fetch(forwardUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok) throw new Error("Forward failed with status " + response.status);
      } catch (error) {
        console.error("[contact] forward error", error);
        return Response.json(
          { error: "We couldn't send your message. Please email us directly." },
          { status: 502 },
        );
      }
    } else {
      console.log("[contact] new lead", lead);
    }

    return Response.json({ ok: true });
  },
};
