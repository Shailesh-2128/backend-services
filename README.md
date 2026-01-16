# Backend Services Repository

## Purpose
This repository serves as a centralized collection of essential backend services and microservice implementations. It is designed to demonstrate best practices, provide reusable code snippets, and serve as a reference for common backend functionalities used in modern web development. 

Whether you are building a new application or looking to integrate specific features like authentication, payment processing, or data management, this repository aims to provide ready-to-use solutions.

## Current Services

### 1. Google SSO (Single Sign-On)
A complete implementation of Google OAuth 2.0 authentication.
- **Location**: `/Google-SSO`
- **Tech Stack**: Node.js, Express, Passport.js, MongoDB (Mongoose).
- **Features**:
  - Google Login integration.
  - User creation and persistence usage MongoDB.
  - Session handling and JWT generation.
  - Securely creating and storing user profiles from Google data.

---
*More services will be added to this repository as they are developed.*


### 2. Cluster With Express
A demonstration of improving Node.js performance using the native `cluster` module and response compression.
- **Location**: `/cluster_Express`
- **Tech Stack**: Node.js, Express, Native Cluster Module, Compression.
- **Features**:
  - Utilizes Node.js `cluster` module to fork worker processes for each CPU core.
  - Implements `compression` middleware to reduce response body size.
  - Demonstrates load balancing across multiple worker processes.

### 3. Redis Caching Strategy
A practical implementation of Redis caching to check backend performance and database load.
- **Location**: `/redis`
- **Tech Stack**: Node.js, Express, Redis, MongoDB (Mongoose).
- **Features**:
  - Implements Look-Aside Caching strategy for database queries.
  - Real-time performance monitoring (Cache Hit vs. Cache Miss logging).
  - Custom cache key generation based on API routes and query parameters.
  - Significant reduction in response times for frequent read operations.