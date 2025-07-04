# Celeb Network 🌟

A full-stack app that allows fans to follow celebrities, built using:

- Frontend: Next.js + Tailwind CSS
- Backend: Nest.js + PostgreSQL + OpenAI
- Deployment: Vercel + AWS Lambda via Serverless Framework

---

## 🚀 Features
- Celebrity signup with AI-powered suggestions
- Autofill onboarding form from AI or hardcoded data
- Role-based login (fan / celebrity)
- Celebrity dashboard (mocked visits/stats)
- Fan dashboard (followed celebrities)
- PDF profile download (Puppeteer)
- Swagger API documentation

---

## 🧱 Tech Stack
| Layer    | Tech               |
|----------|--------------------|
| Frontend | Next.js, Tailwind  |
| Backend  | Nest.js, TypeORM   |
| AI       | OpenAI API         |
| Auth     | JWT                |
| DB       | PostgreSQL (Railway) |
| Deploy   | Vercel (FE), AWS Lambda (BE) |

---

## ⚡ Setup Locally
### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run start:dev 

### Frontend
cd frontend
npm install
npm run dev
