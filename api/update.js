// api/update.js
import { getRedisClient } from './kv.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const client = await getRedisClient();

  let body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', async () => {
    const parsed = new URLSearchParams(Buffer.concat(body).toString());
    const text = parsed.get('text') || 'Hello, default message.';
    const voice = parsed.get('voice') || 'alice';

    await client.set('live_response', text);
    await client.set('voice_selected', voice);

    // Redirect back to Admin UI
    res.writeHead(302, { Location: '/api' });
    res.end();
  });
}
