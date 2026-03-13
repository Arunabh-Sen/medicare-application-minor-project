# 🏥 Medicare - Healthcare Management System

Medicare is a comprehensive, full-stack healthcare platform designed to bridge the gap between patients and doctors. It simplifies the process of finding specialists, booking appointments, and managing healthcare records with a seamless, user-friendly interface.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Routing**: [React Router Dom](https://reactrouter.com/)
- **Animations & UI Components**: [Swiper.js](https://swiperjs.com/), [React Icons](https://react-icons.github.io/react-icons/), [React Toastify](https://fkhadra.github.io/react-toastify/)

### Backend
- **Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)
- **Payment Gateway**: [Stripe API](https://stripe.com/)

---

## ✨ Primary Features

### 👤 Patient Features
- **Intuitive Discovery**: Search and filter doctors by specialty, location, or name.
- **Appointment Booking**: Book appointments with preferred doctors in just a few clicks.
- **Secure Payments**: Integrated Stripe payment system for hassel-free booking confirmations.
- **Personal Dashboard**: View booking history, manage profile details, and track appointment status.
- **Review System**: Rate and review doctors based on experience.

### ⚕️ Doctor Features
- **Professional Profile**: Showcase qualifications, experience, and specialization.
- **Appointment Management**: Real-time dashboard to track upcoming and past appointments.
- **Patient Insights**: Access patient details for scheduled consultations.
- **Dynamic Scheduling**: Manage availability and time slots efficiently.

---

## 🔄 Application Workflow

1.  **Authentication**: Users register and log in as either a **Patient** or a **Doctor**. 
2.  **Doctor Search**: Patients browse through a curated list of specialists.
3.  **Booking**: Patients select a doctor, choose an available slot, and proceed to checkout.
4.  **Payment**: Secure payment via Stripe confirms the appointment.
5.  **Management**: 
    - **Patients** see their confirmed bookings in 'My Bookings'.
    - **Doctors** see the new appointment in their 'Appointments' tab.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local installation
- Stripe Account (for payment integration)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Arunabh-Sen/medicare-application-minor-project.git
   cd medicare-application-minor-project
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   CLIENT_SITE_URL=http://localhost:5173
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:5000/api/v1
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
medicare-application/
├── backend/            # Express API, Mongoose Models, Controllers, Routes
├── frontend/           # React App, Tailwind Styling, Assets
└── mongodb_setup_guide.md # Guide for database configuration
```

---

## 📝 License
Distributed under the ISC License.
