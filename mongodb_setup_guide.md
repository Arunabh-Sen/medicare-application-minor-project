# Comprehensive Guide: MongoDB Setup & API Handling

This guide explains how to set up your database and how the backend API works.

## 1. MongoDB Setup (Choose One)

### Option A: MongoDB Atlas (Cloud - Recommended)
1.  **Create an Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2.  **Create a Cluster**: Follow the free tier prompts to create a new cluster.
3.  **Set Up Network Access**: Go to "Network Access" and click "Add IP Address". Select "Allow Access from Anywhere" (0.0.0.0/0) for development.
4.  **Create a Database User**: Go to "Database Access", create a user with a username and password. Remember these!
5.  **Get Connection String**: Click "Connect" on your cluster, choose "Drivers", and copy the connection string.
6.  **Update `.env`**: Replace the `MONGO_URI` in `backend/.env` with your string.
    *   Example: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/medicare?retryWrites=true&w=majority`

### Option B: MongoDB Local
1.  **Install MongoDB**: Download and install MongoDB Community Server.
2.  **Run MongoDB**: Ensure the service is running on your machine.
3.  **Update `.env`**: Set `MONGO_URI = mongodb://localhost:27017/medicare`.

---

## 2. Running the Backend
1.  Open a terminal in the `backend` folder.
2.  Run `npm install` to install dependencies.
3.  Run `npm run dev` to start the server with nodemon (auto-restarts on changes).

---

## 3. How the API Works

### Authentication Flow
- **Registration**: `POST /api/v1/auth/register`. Receives user details and role (`patient` or `doctor`). Passwords are hashed using `bcryptjs` before being saved to MongoDB.
- **Login**: `POST /api/v1/auth/login`. Returns a JWT (JSON Web Token) and user data. The token is valid for 15 days.

### Dashboard Handling
- The frontend stores the token in `localStorage`.
- **Protected Routes**: Components are wrapped in `ProtectedRoute.jsx` which checks the user's role and token in `AuthContext`.
- **API Requests**: The `useFetchData` hook automatically adds the `Authorization: Bearer <token>` header to all requests.
- **Role-based Logic**:
    - If logged in as **Patient**, you are redirected to `/users/profile/me`.
    - If logged in as **Doctor**, you are redirected to `/doctors/profile/me`.

### Key Endpoints
- `GET /api/v1/users/profile/me`: Fetches the logged-in patient's profile.
- `GET /api/v1/users/appointments/my-appointments`: Fetches doctors booked by the patient.
- `GET /api/v1/doctors/profile/me`: Fetches the logged-in doctor's profile and their patient appointments.

---

## 4. Setting up Images (Cloudinary)
We use Cloudinary for profile pictures.
1.  Go to `frontend/src/utils/uploadCloudinary.js`.
2.  Update the `upload_preset` and `cloud_name` with your own Cloudinary credentials if you wish to use your own account.
