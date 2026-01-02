# Google SSO Setup Guide

This project demonstrates a Google Single Sign-On (SSO) authentication flow using Passport.js, Express, and MongoDB.

## Prerequisites

- Node.js installed
- MongoDB installed and running locally on port 27017
- Google Cloud Console Project with OAuth 2.0 Credentials (Client ID and Client Secret)

## Setup Instructions

1.  **Clone/Open the project** in your code editor.

2.  **Install Dependencies**:
    Open a terminal in the project root and run:
    ```bash
    npm install
    ```
    (Note: `mongoose` has been added to the project).

3.  **Configure Environment Variables**:
    Create or update the `.env` file in the root directory with your Google Credentials and a JWT secret.
    
    Example `.env` content:
    ```env
    GOOGLE_CLIENT_ID=your_google_client_id_here
    GOOGLE_CLIENT_SECRET=your_google_client_secret_here
    JWT_SECRET=your_secret_key
    ```
    *Make sure to replace the values with your actual credentials.*

4.  **Database Connection**:
    The application connects to MongoDB at `mongodb://localhost:27017/oogle-sso-setup` (as requested). Ensure your MongoDB service is running.

## Running the Application

1.  Start the server:
    ```bash
    node server.js
    ```
    You should see:
    ```
    MongoDB Connected
    App running on port 5000
    ```

2.  Open your browser and navigate to:
    `http://localhost:5000`

3.  Click on the "Sign up with Google" button.

4.  After logging in with your Google account, you will be redirected to the `/profile` page, displaying your name and the generated JWT token.

## Project Structure

- **server.js**: Main entry point. Sets up Express, connects to MongoDB, and configures Passport middleware.
- **models/User.js**: Mongoose model for storing user data (Google ID, email, name, etc.).
- **config/passport.js**: Passport Google Strategy configuration. Finds or creates a user in the database upon login.
- **routes/auth.js**: Authentication routes. `/auth/google` triggers login, and `/auth/google/callback` handles the response and redirects to profile.
- **index.html**: Simple frontend landing page.

## Changes Made to Original Code

- **Added Mongoose**: Connected to MongoDB to store user data.
- **Created User Model**: Defined a schema to save Google user details.
- **Updated Passport Config**: Modified the strategy to check the database for existing users or create new ones, and correctly serialize/deserialize users.
- **Fixed Routes**: Corrected `routes/auth.js` to access properties from the Mongoose user object and updated the redirect URL.
- **Server Configuration**: Ensured Passport middleware is initialized correctly and served the static `index.html`.
