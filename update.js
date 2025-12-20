import { client } from "./kv.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let body = [];
    req.on("data", chunk => body.push(chunk));
    req.on("end", async () => {
      body = Buffer.concat(body).toString();
      const params = new URLSearchParams(body);

      const text = params.get("text") || "Hello, default message.";
      const voice = params.get("voice") || "alice";

      await client.set("live_response", text);
      await client.set("voice_selected", voice);

      res.writeHead(302, { Location: "/api" });
      res.end();
    });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
