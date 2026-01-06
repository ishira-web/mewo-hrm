# 🚀 AI-Powered HR System

A next-generation Applicant Tracking System (ATS) and HR management platform powered by Artificial Intelligence. Streamline your recruitment process with automated resume scoring, real-time tracking, and smart analytics.



## ✨ Key Features

### 🤖 AI Core

- **Smart Resume Parsing**: Automatically extracts skills, experience, and contact info using **Spacy NER**.
- **Contextual Scoring**: Ranks candidates based on job description matching using **TF-IDF & Cosine Similarity**.
- **Instant Feedback**: Candidates get immediate feedback on their resume match score.

### ⚡ Real-Time & Interactive

- **Live Updates**: Real-time application status changes via **Socket.io**.
- **Email Notifications**: Automated email alerts for interview scheduling and status updates.
- **Premium Dark Mode**: Sleek, eye-friendly interface designed for professionals.

### 🛠️ HR Tools

- **Job Management**: Create, edit, and manage job postings.
- **Application Pipeline**: Drag-and-drop style stage tracking (Applied → Screening → Interview → Offer).
- **Interview Scheduler**: Built-in scheduling tool with calendar integration features.
- **Analytics Dashboard**: Visual insights into hiring funnels and resume compatibility.
- **Data Export**: Export candidate data and reports to CSV.

## 🏗️ Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (Premium Dark Theme)
- **State/Real-time**: React Hooks, Socket.io-client

### Backend

- **Server**: Node.js, Express, TypeScript
- **Database**: MySQL 8.0
- **ORM**: Raw SQL / MySQL2 (Optimized for performance)
- **Auth**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io Server

### AI Service

- **Framework**: Python FastAPI
- **NLP**: Spacy (en_core_web_sm), NLTK
- **ML**: Scikit-learn (TF-IDF), NumPy
- **Parsing**: Pdfplumber

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.10
- MySQL >= 8.0

### Quick Setup (Local)

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd HRM
   ```

2. **Database Setup**

   - Import `database/init.sql` into your MySQL instance.
   - Credentials configured in `backend/.env` (Default: root/root).

3. **Install Dependencies**

   ```bash
   # Backend
   cd backend && npm install

   # Frontend
   cd frontend && npm install

   # AI Service
   cd ai-service
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   ```

4. **Start Services** (Run in separate terminals)

   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev

   # Terminal 2: Frontend
   cd frontend && npm run dev

   # Terminal 3: AI Service
   cd ai-service && python -m uvicorn main:app --reload --port 8000
   ```

5. **Access the App**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)
   - AI Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 🐳 Docker Setup (Optional)

```bash
docker-compose up -d --build
```

_Note: First build may take time due to AI model downloads._

## 📸 Screenshots

| Candidate Dashboard     | HR Analytics           |
| ----------------------- | ---------------------- |
| _View real-time status_ | _Track hiring metrics_ |

## 📄 License

MIT License - Free for personal and commercial use.
