import { getRedisClient } from '../kv.js';

const voices = [
  { value: 'alice', label: 'Alice (default)' },
  { value: 'man', label: 'Man' },
  { value: 'woman', label: 'Woman' },
  { value: 'alloy', label: 'Alloy' },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const client = await getRedisClient();
  const text = (await client.get('live_response')) || 'Hello, default message.';
  const selectedVoice = (await client.get('voice_selected')) || 'alice';

  const options = voices
    .map(v => `<option value="${v.value}" ${v.value === selectedVoice ? 'selected' : ''}>${v.label}</option>`)
    .join('');

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Twilio Live Response Admin</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f6f8;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
        .container {
          background-color: #fff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 600px;
        }
        h2 {
          text-align: center;
          margin-bottom: 24px;
          color: #333;
        }
        textarea, select {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          margin-bottom: 16px;
          box-sizing: border-box;
        }
        button {
          display: block;
          width: 100%;
          padding: 14px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          background-color: #5AA36A;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        button:hover {
          background-color: #78C589;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Twilio Live Voice Response</h2>
        <form method="POST" action="/api/update">
          <textarea name="text" rows="6" placeholder="Type your response here...">${text}</textarea>
          <label for="voice">Select Voice:</label>
          <select name="voice" id="voice">${options}</select>
          <button type="submit">Save</button>
        </form>
      </div>
    </body>
    </html>
  `);
}
