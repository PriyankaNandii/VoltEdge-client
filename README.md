VoltEdge

Project Overview


This is the frontend of a fullstack MERN stack-based single-page website that allows users to perform search filtering functionalities. The project includes features like pagination, searching, categorization, sorting, and Firebase authentication.

Features
Pagination: Efficient loading of products with navigation through pages.
Search: Search for products based on the product name.
Categorization: Filter products by brand, category, and price range.
Sorting: Sort products by price (Low to High, High to Low) and date added (Newest first).
Authentication: Google Authentication and Email/Password Authentication using Firebase.
Responsive Design: Fully responsive, mobile-first design.
Fixed-Size Product Cards: Concise display of product information.
Navbar and Footer: Includes a Navbar with website name/logo and routes, and a Footer with necessary information.
Setup Instructions
Clone the repository:


git clone <frontend-repo-url>
cd <frontend-repo-directory>
Install dependencies:


npm install
Environment Variables:
Create a .env file in the root directory and add the following variables:


VITE_API_URL=<Backend API URL>
VITE_FIREBASE_API_KEY=<Your Firebase API Key>
VITE_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
VITE_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
VITE_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
VITE_FIREBASE_APP_ID=<Your Firebase App ID>
Run the application:


npm run dev
Access the application:
Open your browser and navigate to http://localhost:5173.

Deployment
The frontend can be deployed using services like Vercel, Netlify, or Firebase Hosting.

Technologies Used
React.js with Vite
Firebase Authentication
CSS for styling
Axios for API requests
License
This project is licensed under the MIT License.

Backend Repository
Project Overview
This is the backend of a fullstack MERN stack-based single-page website. It provides the necessary APIs to fetch and manage product data. The project supports pagination, searching, categorization, and sorting of products.

Features
Pagination: API endpoints to load products efficiently with pagination.
Search: API to search products by name.
Categorization: API to filter products by brand, category, and price range.
Sorting: API to sort products by price and date added.
Setup Instructions
Clone the repository:
git clone <backend-repo-url>
cd <backend-repo-directory>
Install dependencies:
npm install
Environment Variables:
Create a .env file in the root directory and add the following variables:
PORT=<Port Number>
DB_USER=<Your MongoDB Username>
DB_PASS=<Your MongoDB Password>
Run the server:


npm start
Access the API:
The backend server will run on http://localhost:<Port Number>.

Deployment
The backend can be deployed using services like Heroku, Render, or Vercel.

Technology Used Frontend: React, React Router Backend: Node.js, Express, MongoDB for database, Firebase for file storage and authentication
Node.js
Express.js
MongoDB (Atlas)
Mongoose (Optional)
License
This project is licensed under the MIT License.
