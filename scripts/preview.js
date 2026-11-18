import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { Readable } from "node:stream";
import contact from "../api/contact.js";
import { build, output } from "./build.js";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};
const aliases = {
  "/icon": "/assets/images/icon.png",
  "/opengraph-image": "/assets/images/opengraph.png",
};
try {
  process.loadEnvFile(".env.local");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const port = Number(process.env.PORT ?? 3000);
await build();

async function serveFile(response, file, method, status = 200) {
  const body = await readFile(file);
  response.writeHead(status, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  response.end(method === "HEAD" ? undefined : body);
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    let path;
    try {
      path = decodeURIComponent(url.pathname);
      if (path.startsWith("//") || path.includes("\\") || /[\u0000-\u001f\u007f]/u.test(path)) {
        response.writeHead(400).end();
        return;
      }
    } catch {
      response.writeHead(400).end();
      return;
    }

    if (path === "/api/contact") {
      const method = request.method;
      const body = method === "POST" ? Readable.toWeb(request) : undefined;
      const result = await contact.fetch(new Request(url, { method, headers: request.headers, body, duplex: "half" }));
      response.writeHead(result.status, Object.fromEntries(result.headers));
      response.end(Buffer.from(await result.arrayBuffer()));
      return;
    }

    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }

    if (path !== "/" && (path.endsWith("/") || path.endsWith(".html"))) {
      const clean = path.replace(/\/+$/, "").replace(/\.html$/, "");
      response.writeHead(308, { Location: (clean === "/index" ? "/" : clean) + url.search }).end();
      return;
    }

    const asset = Object.hasOwn(aliases, path) ? aliases[path] : path;
    const file = resolve(output, "." + (asset === "/" ? "/index.html" : extname(asset) ? asset : asset + ".html"));
    if (file.startsWith(output + sep)) {
      try {
        await serveFile(response, file, request.method);
        return;
      } catch (error) {
        if (!["ENOENT", "EISDIR", "ENOTDIR"].includes(error.code)) throw error;
      }
    }
    await serveFile(response, resolve(output, "404.html"), request.method, 404);
  } catch (error) {
    console.error("[preview]", error);
    if (!response.headersSent) response.writeHead(500);
    response.end();
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Brandora preview at http://127.0.0.1:${server.address().port}`);
});
