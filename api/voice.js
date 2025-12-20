import { getRedisClient } from '../kv.js';

export default async function handler(req, res) {
  const client = await getRedisClient();
  const text = (await client.get('live_response')) || 'Hello, default message.';
  const voice = (await client.get('voice_selected')) || 'alice';

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(`
    <Response>
      <Say voice="${voice}">${text}</Say>
    </Response>
  `);
}
