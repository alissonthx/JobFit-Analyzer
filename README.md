# JobFit-Analyzer

<img src="frontend/public/page.png">

How to Run the Project

Clone and setup:

```bash
git clone https://github.com/alissonthx/JobFit-Analyzer.git
```

```bash
cd jobfit-analyzer
```

```bash
npm install
```

Set up environment variables on .env file, example:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://postgres:password@localhost:5432/jobfit
```

Start with Docker:

```bash
docker-compose up --build
```

Or run locally:

# Backend

``` bash
cd backend && npm run dev
``` 

# Frontend (in another terminal)

```bash
cd frontend && npm run dev
```

# 🛠️ Tech Stack
## Frontend

- React with TypeScript

- Vite for fast development

- Axios for API calls

- Lucide React for icons

## Backend

- Node.js with TypeScript

- Express.js server

- OpenAI API for AI analysis

- Redis for caching

- PostgreSQL for data storage (optional)

- Jest for testing

## Infrastructure

- Docker & Docker Compose

- Redis for session storage

- PostgreSQL database

# 📋 Prerequisites

## Before running this project, make sure you have:

- Node.js (v18 or higher)

- Docker and Docker Compose

- OpenAI API key
