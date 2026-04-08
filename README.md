# AWS Mentorship Hub

AWS Mentorship Hub is a comprehensive Q&A platform tailored for the AWS Mentorship Bootcamp. It allows students to view active projects, their learning outcomes, and ask questions related to specific projects. Students can report bugs, post general questions, state where they are stuck, and upload attachments (like screenshots or logs). Instructors can then respond to these questions, creating a collaborative learning environment.

## 🚀 Tech Stack

- **Frontend:** React.js, Vite, Axios
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL (with SQLite fallback for local development)
- **Containerization & Deployment:** Docker, Docker Compose, Nginx

## 🏗️ Architecture

- **Nginx** reverse proxies traffic to the React frontend (`/`) and Django backend (`/api/`, `/admin/`, `/media/`, `/health/`).
- The **Django Backend** manages the database, handles API requests, processes media attachments, and serves the admin panel.
- The **React Frontend** consumes the API to provide an interactive, dynamic, and responsive user interface.

## 💻 Local Development Setup (Without Docker)

To run the frontend and backend separately for local development and debugging, follow the steps below.

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run database migrations:
   ```bash
   python manage.py migrate
   ```
5. (Optional) Create a superuser to access the Django Administration panel and add initial Projects:
   ```bash
   python manage.py createsuperuser
   ```
6. Start the development server:
   ```bash
   python manage.py runserver
   ```
   The backend API will be available at `http://localhost:8000/`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173/`. 
   
*(Note: When running without Docker, requests from the frontend will go to the configured API `VITE_API_BASE_URL` or default endpoints. You may need to ensure your Django application allows CORS for the Vite dev server).*

## 🐳 Docker Deployment

The application is fully containerized, making it easy to run the entire stack (Frontend, Backend, Postgres Database, and Nginx) with a single command.

### Prerequisites
- Docker
- Docker Compose

### Running the Stack

1. From the project root, build and start the containers in detached mode:
   ```bash
   docker-compose up --build -d
   ```
2. Run backend database migrations:
   ```bash
   docker-compose exec backend python manage.py migrate
   ```
3. Access the application:
   - **Frontend Application:** http://localhost
   - **Backend API Base:** http://localhost/api/
   - **Django Admin Panel:** http://localhost/admin/

### Stopping the Services
To stop running the containers without removing data:
```bash
docker-compose stop
```
To bring down the containers completely and cleanly:
```bash
docker-compose down
```

## 📚 Features

- **Project Tracking:** Instructors can add new projects, which appear dynamically on the frontend.
- **Q&A System:** Students can ask questions, attaching context through files.
- **Instructors Dashboard:** Built-in Django Admin interface for instructors to manage items and provide answers.
- **Health Checks:** Built-in backend health status display in the UI to alert users if the server experiences downtime.

## 📄 License

See the LICENSE file for details.