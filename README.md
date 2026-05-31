# ThreatHash Analyzer

A modern malware hash analysis and threat intelligence platform that allows users to scan file hashes, analyze suspicious files, and visualize malware risk using the VirusTotal API.

Built with a clean full-stack architecture using **React**, **FastAPI**, and **SQLite**, this project demonstrates practical cybersecurity workflows, malware analysis concepts, and API integration.

---
## 🌐 Live Demo

Try the application here:

- **Frontend:** [ThreatHash Analyzer](https://threathash-analyzer-1.onrender.com)
- **API Documentation:** [Swagger Docs](https://threathash-analyzer.onrender.com/docs)

---
# Features

- Malware hash scanning
- VirusTotal API integration
- SHA256 / MD5 / SHA1 hash support
- Risk score analysis
- Detection statistics dashboard
- Threat classification
- File upload support
- Modern responsive UI
- REST API backend
- SQLite database storage
- Security-focused architecture

---

# Tech Stack

## Frontend
- React
- Tailwind CSS
- Axios
- React Router

## Backend
- FastAPI
- Python
- SQLAlchemy
- Uvicorn

## Database
- SQLite

## APIs
- VirusTotal API

---

# Project Structure

```bash
ThreatHash-Analyzer/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# How It Works

1. User uploads a file or enters a hash.
2. Backend processes the request.
3. VirusTotal API scans the hash.
4. Threat intelligence data is returned.
5. Results are visualized in the dashboard.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/alanzthomaz/ThreatHash-Analyzer.git
cd ThreatHash-Analyzer
```

---

# Backend Setup

## Create Virtual Environment

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r backend/requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file inside the `backend` folder.

```env
VIRUSTOTAL_API_KEY=your_api_key_here
```

---

## Run Backend Server

```bash
cd backend
uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# Frontend Setup

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API health check |
| POST | `/scan/hash` | Scan file hash |
| POST | `/scan/upload` | Upload and scan file |
| GET | `/history` | View scan history |

---

# Security Notice

This project is built strictly for:

- Educational purposes
- Cybersecurity learning
- Malware analysis practice
- Threat intelligence demonstrations

Do NOT upload real sensitive files publicly.

---

# Future Improvements

- Real-time threat monitoring
- PDF report generation
- User authentication
- Docker deployment
- Advanced analytics dashboard
- YARA rule integration
- Multi-engine scanning support

---

# Author

## Alan Thomas

- GitHub: https://github.com/alanzthomaz

---

