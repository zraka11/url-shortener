# URL Shortener

A fullstack JavaScript application for shortening URLs with expiration and statistics.

## Features

- Shorten URLs with custom expiration times
- Redirect to original URLs
- Track click statistics
- Delete shortened links
- Generate QR codes for shortened links

## Requirements Coverage

This project fulfills the following requirements:

- ✅ URL shortening with custom expiration times
- ✅ Redirect to original URLs
- ✅ Track click statistics("This link has been clicked X times.")
- ✅ Delete shortened links
- ✅ Generate QR codes for shortened links (Note: QR code functionality may require proper deployment for full production use, as local development might have limitations with image serving)
- ✅ Comprehensive README with setup and run instructions

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, TailwindCSS
- Libraries: nanoid, qrcode, axios

## Project Structure

```
url-shortener/
├── backend/
│   ├── config/
│   │   ├── env.js
│   │   └── db.js
│   ├── controllers/
│   │   └── urlController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Url.js
│   ├── routes/
│   │   └── url.js
│   ├── services/
│   │   └── urlService.js
│   ├── utils/
│   │   └── time.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── logo.svg
│   │   │   └── qr-icon.png
│   │   ├── components/
│   │   │   ├── CustomDropdown.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── config/
│   │   │   └── env.js
│   │   ├── services/
│   │   │   └── urlService.js
│   │   ├── utils/
│   │   │   └── http.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   └── App.css
│   ├── package.json
│   └── package-lock.json
├── package.json
├── package-lock.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd url-shortener
   ```

2. Install backend dependencies:

   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Configuration

Backend environment (.env in backend):

- `MONGO_URI` or `MONGODB_URI`: Your MongoDB connection string.
- `PORT`: (e.g., 5000) The port for the backend server.
- `BASE_URL`: The public base URL for the short links and redirects (e.g., `http://localhost:5000`). Do not include a trailing slash.

Frontend environment (.env in frontend):

- `REACT_APP_API_BASE_URL`: Base URL of the backend API (e.g., `http://localhost:5000`).
- `REACT_APP_SHORT_BASE_URL` (optional): Display domain for short links in the UI (defaults to `REACT_APP_API_BASE_URL` in development; set to `https://short.link` in production if you want the UI to display that domain).

### Running the Application

#### Prerequisites

- Start MongoDB: If using local MongoDB, ensure it's running on `mongodb://localhost:27017`

#### Running the Backend

```
cd backend
npm run dev
```

Server runs at http://localhost:5000

#### Running the Frontend

```
cd frontend
npm start
```

Frontend runs at http://localhost:3000

#### Running Both (Shortcut)

To run both backend and frontend concurrently:

```
npm start
```

This will start the backend on `http://localhost:5000` and frontend on `http://localhost:3000`.

### Usage

- Open the frontend in your browser
- Paste a URL in the input field
- Select an expiration time (optional)
- Click "Shorten URL"
- View your shortened links in the sidebar
- Click on links to redirect
- Use the QR button to generate QR codes
- Use the delete button to remove links

## API Endpoints

- `POST /api/url/shorten` - Shorten a URL
- `GET /:shortId` - Redirect to original URL
- `GET /api/url` - Get all shortened URLs
- `DELETE /api/url/:id` - Delete a shortened URL
- `GET /api/url/qr/:id` - Generate QR code for a URL
