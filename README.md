# Agentic Content Gen Bedrijfspunt

This project is an intelligent application that transforms product ideas into detailed technical breakdowns and actionable development tickets. It leverages a multi-agent AI workflow to analyze requirements and generate specifications for frontend, backend, and infrastructure.

## 🚀 Features

- **Idea Submission:** User-friendly form to submit product ideas with cloud provider and user count preferences.
- **Multi-Agent Workflow:** Orchestrated by LangGraph, multiple AI agents work in parallel to analyze the request:
  - **Assessor Agent:** Provides a high-level assessment of the product idea.
  - **Frontend Agent:** Generates frontend technical specifications.
  - **Backend Agent:** Generates backend technical specifications.
  - **Infrastructure Agent:** Generates infrastructure requirements.
  - **Aggregator Agent:** Synthesizes all specifications into a structured list of development tickets.
- **Technical Breakdown:** View a comprehensive assessment and a list of generated tickets (Frontend, Backend, Infra).
- **Localization:** Fully localized in Dutch.
- **Modern UI:** Built with React, TypeScript, and Vite for a fast and responsive experience.

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Routing:** React Router DOM
- **HTTP Client:** Axios

### Backend

- **Framework:** Django 5.1 (Django REST Framework)
- **AI Orchestration:** LangGraph
- **LLM Provider:** Azure OpenAI (GPT-4o-mini)
- **Database:** SQLite (Default)

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.12 or higher)
- **Azure OpenAI API Key** (with access to GPT-4o-mini deployment)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd agentic-content-gen-bedrijfspunt
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python3.12 -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in `backend/langgraphbackend/agents/agent_workflows/` (or where required) with your Azure OpenAI credentials:

```env
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_ENDPOINT=your_endpoint
OPENAI_API_VERSION=your_api_version
```

Run migrations and start the server:

```bash
cd langgraphbackend
python manage.py migrate
python manage.py runserver
```

The backend will be available at `http://localhost:8000`.

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## 🧩 Architecture

The core of the application is the **LangGraph** workflow defined in `backend/langgraphbackend/agents/agent_workflows/generate_idea.py`.

1.  **Input:** User submits an idea via the React frontend.
2.  **Parallel Processing:** The request is sent to the backend, where the `StateGraph` triggers the **Assessor**, **Frontend**, **Backend**, and **Infrastructure** agents simultaneously.
3.  **Aggregation:** Once all specialist agents complete their tasks, the **Aggregator (Ticket)** agent combines their outputs.
4.  **Output:** The system returns a structured JSON response containing the general assessment and a list of categorized tickets, which is then rendered by the frontend.

## 📄 License

[License Name]
