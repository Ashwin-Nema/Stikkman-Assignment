# Project Setup

## Prerequisites

Before starting, ensure that you have the following installed:

1. **Node.js** - Version 20.11.1 or higher
2. **MySQL** - Complete installation including server, workbench, and shell
3. **Cloudinary Account** - Create an account on Cloudinary to obtain the following credentials:
    - `CLOUDINARY_CLOUD_NAME`
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`

## Backend Configuration

1. Navigate to the backend folder in the root directory (path: backend).
2. Create a `.env` file and add the following variables:
    - `PORT` - Specify the port on which the backend server will run (e.g., 4000).
    - `SQL_HOST` - MySQL host.
    - `SQL_USER` - MySQL user.
    - `SQL_PASSWORD` - MySQL password.
    - `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name.
    - `CLOUDINARY_API_KEY` - Cloudinary API key.
    - `CLOUDINARY_API_SECRET` - Cloudinary API secret.

### Note:
- If the backend is running on a port other than 4000, update the `PORT` variable accordingly in the `.env` file.
- MySQL host, user, and password should be provided in the respective variables.
- Cloudinary configuration details should be obtained from the [Cloudinary account](https://cloudinary.com/) and added to the `.env` file.

## Frontend Configuration

If the backend is running on a port other than 4000, follow these steps to configure the frontend:

1. Open the file `rest-urls.js` located at `frontend/src/app/lib/rest-urls.js`.
2. Update the `hostname` constant to specify the correct port on which the backend is running.
3. For video tutorial for entire setup please refer: [Project setup video](https://drive.google.com/file/d/1Z9y0ywte1E9PLy4RlCcs1FigRusKfkoW/view?usp=sharing)


## Installation

### Frontend Setup

1. Open a terminal.
2. Navigate to the frontend directory:
    ```
    cd frontend
    ```
3. Install dependencies:
    ```
    npm install
    ```

### Backend Setup

1. Open another terminal.
2. Navigate to the backend directory:
    ```
    cd backend
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Seed the database and create tables:
    ```
    npm run seed
    ```
5. Start the backend server:
    ```
    npm run dev
    ```

## Running the Application

### Frontend

1. In the first terminal (frontend directory), start the frontend server:
    ```
    npm run dev
    ```

### Backend

1. In the second terminal (backend directory), start the backend server:
    ```
    npm run dev
    ```

Now you have both the frontend and backend servers running simultaneously. Hence setup is complete


