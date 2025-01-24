A full-stack web application designed to manage school payments and transactions.
It consists of a backend built with node.js and express.js and a frontend developed using React.js with Material-UI. 
The system allows schools to track payment transactions and check statuses.

Features

Backend

User authentication using JWT.

CRUD operations for transactions.

RESTful APIs for fetching transactions.


Frontend

Responsive UI with Material-UI.

Dashboard for transaction overview.

Search, filter, and pagination for transactions.

Real-time transaction status check.


Technologies Used

Backend:

NestJS

MongoDB

Mongoose

JWT Authentication

Axios (for external API calls)

Frontend:

React.js (Vite for project setup)

Tailwind CSS

Axios (for API communication)

React Router

Setup Instructions

Backend Setup

Clone the repository:

git clone https://github.com/your-username/school-payments-backend.git
cd school-payments-backend

Install dependencies:

npm install

Configure environment variables:

Create a .env file and add the following:

APP_REQUEST_ORIGIN_URL=your frontend url

MONGO_URI=mongodb+srv://testuser:edviron@edvironassessment.ub8p5.mongodb.net/?retryWrites=true&w=majority&appName=edvironAssessment

JWT_SECRET=your_jwt_secret

Start the server:

npm run start

Frontend Setup

Clone the repository:

git clone https://github.com/your-username/school-payments-frontend.git

cd school-payments-frontend

Install dependencies:

npm install

Configure environment variables:
Create a .env file and add API base URL:

VITE_BACKEND_URL =your-backend-url

Start the frontend application:

npm run dev

API Documentation

The complete API documentation can be found here.

Key Endpoints

GET /transactions - Fetch all transactions.

GET /transactions/:school_id - Fetch transactions for a specific school.

POST /check-status - Check transaction status by custom_order_id.

POST /update-status - Manually update transaction status.


Deployment

The application is hosted on:

Backend: render

Frontend: Vercel 
