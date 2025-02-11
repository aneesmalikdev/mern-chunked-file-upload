
# MERN Chunked File Upload

A MERN stack project demonstrating efficient chunked file uploads. The application uses a React client to split large files into smaller chunks and an Express server (with Multer) to receive, store, and reassemble these chunks into the final file. This approach improves reliability and resource management when handling very large file uploads.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- **Chunked File Upload:** Splits large files into smaller chunks on the client.
- **Efficient Handling:** Uploads each chunk individually to reduce memory overhead and improve network reliability.
- **Reassembly:** The server reassembles the chunks in order to reconstruct the original file.
- **Progress Tracking:** Tracks upload progress on the client side.
- **MERN Stack:** Built with React for the frontend and Express for the backend.

## Project Structure

```
mern-chunked-file-upload/
├── client/             # React application (frontend)
│   ├── public/
│   ├── src/
│   └── package.json
├── server/             # Express server (backend)
│   ├── routes/
│   ├── controllers/
│   └── package.json
├── uploads/            # Directory for final and temporary uploaded files (ignored by Git)
├── .gitignore          # Git ignore file to exclude node_modules and uploads
└── README.md           # This file
```

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/mern-chunked-file-upload.git
   cd mern-chunked-file-upload
   ```

2. **Install server dependencies:**

   ```bash
   cd server
   npm install
   # or
   yarn install
   ```

3. **Install client dependencies:**

   ```bash
   cd ../client
   npm install
   # or
   yarn install
   ```

## Usage

### Running the Server

1. Open a terminal and navigate to the `server` directory:

   ```bash
   cd server
   npm start
   ```

   The server will start on the default port (e.g., `http://localhost:5000`).

### Running the Client

1. Open another terminal and navigate to the `client` directory:

   ```bash
   cd client
   npm start
   ```

   The client will start on a port (typically `http://localhost:3000`) and connect to the backend server for file uploads.

### Uploading a File

1. In the client application, select a file using the file input.
2. Click the **Upload** button.
3. The file is split into chunks on the client, and each chunk is sent to the server.
4. Once all chunks are uploaded, the server reassembles the file in the `uploads/` directory.

## Environment Variables

If needed, create a `.env` file in the `server` directory to define any environment-specific variables (e.g., custom ports, file paths):

```dotenv
PORT=5000
# Add any other variables as needed
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details
