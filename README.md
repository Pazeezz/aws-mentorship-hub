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

You can run the frontend and backend separately for active development. This will use a local SQLite database by default.

**Terminal 1: Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

**Terminal 2: Frontend**
```bash
cd frontend
npm install
VITE_API_BASE_URL="http://localhost:8000/api" npm run dev
```

Then navigate to:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api/`

## 🐳 Running with Docker Compose

Running with Docker spins up the full production-like environment with PostgreSQL and an Nginx reverse proxy.
*(Note: Be aware that the Docker environment creates a fresh Postgres database, which is separate from your local SQLite database!)*

```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials & AWS keys
docker compose up --build -d
```

Because Nginx handles the reverse proxying on port 80, you can access everything smoothly here:
- **Main Application**: `http://localhost/`
- **Backend API**: `http://localhost/api/`
- **Backend Health Check**: `http://localhost/health/`

## 📚 Features

- **Project Tracking:** Instructors can add new projects, which appear dynamically on the frontend.
- **Q&A System:** Students can ask questions, attaching context through files.
- **Instructors Dashboard:** Built-in Django Admin interface for instructors to manage items and provide answers.
- **Health Checks:** Built-in backend health status display in the UI to alert users if the server experiences downtime.

## 🔐 Logging in as Admin

The application uses Django's built-in administration panel. To log in as an administrator to manage projects and answers, follow these steps:

1. **Create a Superuser account:**
   - **Local Development:** In your backend terminal, run: `python manage.py createsuperuser`
   - **Docker:** In the project root, run: `docker compose exec backend python manage.py createsuperuser`
   *(You will be prompted to enter a username, email, and password).*

2. **Access the Dashboard:**
   - **Local Development:** Navigate to `http://localhost:8000/admin/`
   - **Docker:** Navigate to `http://localhost/admin/`

3. **Manage the Hub:** Log in using your new credentials. You can now create active Projects for your students, which will immediately become visible on the landing page!

## 📄 License

See the LICENSE file for details.