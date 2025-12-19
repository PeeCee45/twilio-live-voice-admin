# Twilio Live Voice Response Admin

A **serverless Twilio voice response manager** built for **Vercel** using **Redis Cloud**. This project allows you to **update live voice responses** and **choose the voice** through a simple, modern admin UI. When someone calls your Twilio number, the webhook serves the latest response in real time.

---

## Features

- **Admin UI**: Type messages and select the voice in a clean, mobile-friendly interface.
- **Redis Cloud**: Stores the latest message and voice selection persistently.
- **Serverless on Vercel**: Fully compatible with Vercel serverless functions.
- **Twilio Integration**: Responds to incoming calls with dynamic text-to-speech using Twilio `<Say>`.
- **Voice Options**: Supports multiple voices (`Alice`, `Man`, `Woman`, `Alloy`).
- **Secure Configuration**: Redis credentials stored in environment variables, never hardcoded.

---

## Tech Stack

- Node.js
- Redis Cloud (managed Redis instance)
- Vercel Serverless Functions
- Twilio Voice Webhooks

---

## Setup & Usage

1. **Clone the repository**

```bash
git clone https://github.com/PeeCee45/twilio-live-voice-admin.git
cd twilio-live-voice-admin
```

2. **Add Redis credentials** in a `.env` file (or set as Vercel Environment Variables):

```env
REDIS_HOST=<your_redis_host>
REDIS_PORT=<your_redis_port>
REDIS_PASSWORD=<your_redis_password>
```

3. **Install dependencies**

```bash
npm install
```

4. **Run locally**

```bash
npx vercel dev
```

- Admin UI: `http://localhost:3000/api`  
- Update endpoint: `http://localhost:3000/api/update`  
- Twilio webhook: `http://localhost:3000/api/voice`

---

5. **Deploy to Vercel**

```bash
vercel
```

- Follow the prompts to link your project or create a new one.  
- Once deployed, your live app will be available at: `https://twilio-live-voice-admin.vercel.app/api`

---

6. **Configure Twilio**

- Set your Twilio number's **voice webhook URL** to:

```text
https://twilio-live-voice-admin.vercel.app/api/voice
```

- Use the **POST** method for the webhook.  
- Now, when someone calls your Twilio number, it will respond with the live message and selected voice from your admin UI.

---

7. **Access Admin UI**

```text
https://twilio-live-voice-admin.vercel.app/api
```

- Type your message, select a voice, and save. The changes will be used live for incoming calls.

---

## Screenshots

_Add screenshots here to show your Admin UI and workflow._

---

## License

MIT © [Promise Ibeh](https://github.com/peecee45)
