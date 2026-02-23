# Event-Registration
Full-stack Event Registration System built with React (Vite), Node.js, Express, and MongoDB where users can explore events and register with real-time data storage.

## Features
- Modern, responsive UI with premium aesthetics.
- Event listing and detailed view.
- Registration form with real-time validation.
- Duplicate registration prevention (email + event).
- RESTful API backend following MVC pattern.

## Tech Stack
- **Frontend:** React, Vite, Axios, React Router.
- **Backend:** Node.js, Express, MongoDB, Mongoose.
- **Validation:** validator.js.

## Prerequisites
- Node.js installed.
- MongoDB installed and running locally.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (one is provided, but you can use `.env.example` as a template).
4. Seed initial data:
   ```bash
   node seeder.js
   ```
5. Start the backend server:
   ```bash
   npm start
   ```
   *The server will run on http://localhost:5000*

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The app will run on http://localhost:5173 (or the port shown in your terminal)*

## API Endpoints
- `GET /api/events` - Fetch all events.
- `GET /api/events/:id` - Fetch a single event.
- `POST /api/events` - Create an event (Internal/Test).
- `POST /api/register` - Register for an event.
- `GET /api/events/:id/registrations` - Fetch attendees for an event.
