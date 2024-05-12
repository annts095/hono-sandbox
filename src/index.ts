import { HttpBindings, serve } from "@hono/node-server";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

type Bindings = HttpBindings;

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.json({
    remoteAddress: c.env.incoming.socket.remoteAddress,
  });
});

app.get("/api/hello", (c) => {
  return c.json({ ok: true, message: "Hello Hono!" });
});

app.get(
  "/static/*",
  serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/static/, "/statics"),
  })
);

const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
