# MindPal AI Therapist 🧠

MindPal is a highly skilled, specialized AI Therapist application built with Node.js and a vanilla web frontend. It is powered by the **Groq API** (using the `llama-3.3-70b-versatile` model) to deliver fast, empathetic, and professional therapy-style interactions.

MindPal is designed to provide guided support across multiple evidence-based therapeutic modalities, ensuring varying layers of communication based on the user's specific needs (e.g., CBT, DBT, trauma-informed care).

---

## ✨ Features

- **Multiple Therapeutic Modalities:** Choose from distinct therapeutic approaches using specialized system prompts:
  - 🧠 General Therapy
  - 🔄 CBT (Cognitive Behavioral Therapy)
  - ⚖️ DBT (Dialectical Behavior Therapy)
  - 🧘 Mindfulness-Based Therapy
  - 🕯️ Grief Counseling
  - 🛡️ Trauma-Informed Care
  - 😰 Anxiety and Panic Disorder Support
  - 🌧️ Depression Support
  - 🤝 Relationship Therapy
- **Blazing Fast AI:** Runs on the Groq API utilizing the completely free and ultra-fast `llama-3.3-70b-versatile` model.
- **Secure by Design:** Your API key stays on the server side and is never exposed to the frontend or directly to end-users.
- **Responsive Frontend:** Clean and simple vanilla HTML/JS frontend located in the `/public` directory.
- **Health Checks:** Built-in `/health` API endpoint to monitor the server.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Libraries:**
  - `express` - Web server framework
  - `cors` - For managing cross-origin cross-sharing policies
  - `dotenv` - For handling environment variables securely
  - `node-fetch` - To interact with the Groq REST API
- **AI Model:** Groq API (`llama-3.3-70b-versatile`)

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
You will also need a **free Groq API Key**, which you can obtain from [console.groq.com](https://console.groq.com/).

### 2. Installation

Clone this repository or download the project files, then navigate to your project directory.

```bash
cd GROUP-7
```

Install the required npm dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add your Groq API Key:

```env
PORT=3000
GROQ_API_KEY=your_actual_groq_api_key_here
```

*(Note: Never commit your `.env` file to source control. It is already added to `.gitignore` on this project.)*

### 4. Running the Application

To start the server, simply run:

```bash
npm start
```

You should see output indicating that the server is running successfully:
```
  🧠  MindPal is running!
  🌐  Open: http://localhost:3000

  ✅  Groq API key loaded
```

Open your browser and navigate to `http://localhost:3000` to start chatting with MindPal.

---

## 📂 Project Structure

```text
├── public/                 # Frontend assets
│   └── index.html          # Main client interface (UI)
├── .env                    # Environment variables (create this)
├── .gitignore              # Files/folders ignored by Git
├── package.json            # NPM dependencies & scripts
├── package-lock.json       # Locked dependency versions
└── server.js               # Node.js backend server and API endpoints
```

---

## 🛡️ Disclaimer

**MindPal is an experimental AI application.** It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health provider with any questions you may have regarding a medical or mental health condition.

If you are experiencing a crisis, please call or text `988` (Suicide and Crisis Lifeline) or text `HOME` to `741741` (Crisis Text Line) immediately.
