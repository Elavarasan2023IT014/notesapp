# Personal Notes API

## Project Overview

The **Personal Notes API** is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB** to allow users to manage their personal notes securely. Users can register, log in, and perform CRUD (Create, Read, Update, Delete) operations on their notes, with an additional feature to search notes by title or content. The API uses **JWT (JSON Web Token)** for authentication to ensure only authorized users can access their notes. This project demonstrates a full-stack backend with robust error handling, secure authentication, and a clean, modular structure.

### Features
- **User Authentication**: Register and log in users with secure password hashing (bcryptjs) and JWT-based authentication.
- **Notes Management**: Create, read, update, delete, and search notes, with all operations restricted to the authenticated user.
- **Search Functionality**: Case-insensitive search for notes by title or content using MongoDB’s `$regex`.
- **MongoDB Integration**: Stores user and note data with Mongoose schemas.

## Tech Stack
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for routing and middleware.
- **MongoDB**: NoSQL database for storing users and notes.
- **Mongoose**: ODM for MongoDB to define schemas and handle queries.
- **bcryptjs**: For secure password hashing.
- **jsonwebtoken**: For generating and verifying JWTs.
- **dotenv**: For managing environment variables.

## Project Structure
```
personal-notes-api/
├── config/
│   └── db.js              # MongoDB connection setup
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── Notes.js           # Mongoose schema for Notes
│   └── User.js            # Mongoose schema for Users
├── controllers/
│   ├── authController.js  # User registration and login logic
│   └── noteController.js  # CRUD and search logic for notes
├── routes/
│   ├── authRoutes.js            # Authentication routes
│   └── notesRoutes.js           # Note management routes
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
├── server.js              # Main server file
└── README.md              # Project documentation
```

## Setup Instructions

### Prerequisites
- **Node.js**: v14 or higher
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas)
- **Git**: For cloning the repository
- **Postman** or **cURL**: For testing API endpoints

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Elavarasan2023IT014/notesapp.git
   cd notesapp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory with the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=3000
     ```
     - Replace `your_mongodb_connection_string` with your MongoDB URI (e.g., from MongoDB Atlas).
     - Replace `your_jwt_secret_key` with a secure random string (e.g., `mysecretkey123`).
     - `PORT` can be any available port (default is `3000`).

4. **Start the Server**:
   ```bash
   npm start
   ```
   - The server will run on `http://localhost:3000` (or the specified `PORT`).

### Testing
- Use Postman, cURL, or a similar tool to test the API endpoints.
- Ensure MongoDB is running and the `MONGO_URI` is correct.
- All note-related endpoints require a JWT token in the `Authorization` header (`Bearer <token>`).

## API Endpoints

Below is a list of all available endpoints, including HTTP methods, paths, descriptions, and example requests/responses.

### Authentication Routes

#### Register a User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Creates a new user account with name, email, and password.

#### Login a User
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticates a user and returns a JWT token.

### Notes Routes (All Require Authentication)
- **Header**: Include `Authorization: Bearer <jwt_token>` in all requests.

#### Create a Note
- **Endpoint**: `POST /api/notes`
- **Description**: Creates a new note for the authenticated user.

#### Get All Notes
- **Endpoint**: `GET /api/notes`
- **Description**: Retrieves all notes for the authenticated user, sorted by creation date (newest first).

#### Get a Note by ID
- **Endpoint**: `GET /api/notes/:id`
- **Description**: Retrieves a specific note by its ID, if owned by the authenticated user.

#### Update a Note
- **Endpoint**: `PUT /api/notes/update/:id`
- **Description**: Updates a specific note’s title or content, if owned by the authenticated user.

#### Delete a Note
- **Endpoint**: `DELETE /api/notes/:id`
- **Description**: Deletes a specific note, if owned by the authenticated user.

#### Search Notes
- **Endpoint**: `GET /api/notes/search?query=<search_term>`
- **Description**: Searches the authenticated user’s notes by title or content (case-insensitive).
- **Example**: `GET /api/notes/search?query=task`

## Security Features
- **JWT Authentication**: All note routes are protected with JWTs, verified by `middleware/auth.js`.
- **Password Hashing**: User passwords are hashed using bcryptjs.
- **User-Specific Data**: Notes are tied to the authenticated user’s ID, ensuring data isolation.

## Challenges Overcome
- **Route Order Issue**: Fixed a bug where `/api/notes/search` was misrouted to `/api/notes/:id` by reordering routes in `notes.js`.
- **JWT Payload Mismatch**: Corrected the JWT payload to use `id` instead of `user_id` to ensure `req.user.id` was set correctly.
- **Security**: Ensured all note operations are restricted to the authenticated user using JWT and `req.user.id`.

## Contact
For questions or contributions, open an issue or pull request on GitHub.
