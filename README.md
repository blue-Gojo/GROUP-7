# 🧠 MindPal — Setup Guide

## What's inside this folder

```
mindpal/
├── server.js          ← The backend (keeps your Groq key safe)
├── package.json       ← Project info
├── .env               ← WHERE YOU PUT YOUR API KEY (private)
├── .gitignore         ← Stops your key being shared accidentally
└── public/
    └── index.html     ← The full MindPal app
```

---

## STEP 1 — Put your Groq API key in the .env file

Open the file called `.env` (it's in the mindpal folder).

You will see this line:
```
GROQ_API_KEY=paste_your_groq_api_key_here
```

Replace `paste_your_groq_api_key_here` with your real key from console.groq.com
Your key starts with `gsk_`

Example:
```
GROQ_API_KEY=gsk_abc123yourkeyhere
```

Save the file. Done. ✅

---

## STEP 2 — Install Node.js (if you haven't already)

Download it free from: https://nodejs.org
Install the LTS version.

---

## STEP 3 — Install the project

Open a terminal (Command Prompt on Windows) inside the mindpal folder.
Type this and press Enter:

```
npm install
```

Wait for it to finish. Only needed once. ✅

---

## STEP 4 — Start MindPal

In the same terminal, type:

```
node server.js
```

You will see:
```
  🧠  MindPal is running!
  🌐  Open: http://localhost:3000
```

Open your browser and go to: **http://localhost:3000**

MindPal is live! 🎉

---

## STEP 5 — Upload to your website (so anyone can use it)

Upload the entire mindpal folder to your web hosting.

On your hosting control panel (cPanel etc):
1. Find "Node.js App" or "Setup Node.js"
2. Point it to your mindpal folder
3. Set startup file to: server.js
4. Add environment variable: GROQ_API_KEY = your key
5. Start the app

Your MindPal will now be live at your domain! 🌐

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Cannot find module express" | Run npm install again |
| "Groq API key not set" | Check your .env file has the real key |
| Page loads but chat fails | Make sure node server.js is still running |
| Port 3000 in use | Change PORT=3001 in .env |

---

⚠️ Never share your .env file — it has your private API key inside.
MindPal is an AI support tool. It does not replace a licensed therapist.
