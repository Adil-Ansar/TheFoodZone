**Invoice Payment Collection System**

This project is an Invoice Payment Collection System built with Node.js, Express, and MongoDB.

**Installation**

Follow these steps to set up the project locally:
**Prerequisites**

 Node.js installed
 MongoDB installed and running

Steps

Clone the repository

    git clone <repository_url>

Install dependencies

    cd invoice_payment_collection_system
    npm install

Set up environment variables

Create a .env file in the root directory and add the following:

    PORT=4000
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>

Replace <your_mongodb_uri> with your MongoDB connection string and <your_jwt_secret> with a secure secret for JWT.

Start the server

    npm start

This will start the server at http://localhost:3000.

Run in development mode

For development with automatic server restart:

    npm run dev

Usage

    Use Postman or similar tools to interact with the APIs.
    Refer to the Postman collection for available endpoints and their usage.

