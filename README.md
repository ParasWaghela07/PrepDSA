# InterWin - Last Minute Interview Prep

## Overview

InterWin is a powerful web application designed to help users prepare efficiently for technical interviews. It offers an extensive collection of resources, including Data Structures and Algorithms (DSA) questions, aptitude tests, technical interview questions, and a mock interview feature to simulate real-world scenarios.

## Features

- **DSA Questions**: A vast collection of data structure and algorithm-based problems, categorized by company (Google, Amazon, Microsoft, etc.).
- **Aptitude Tests**: A variety of logical and quantitative reasoning questions to sharpen problem-solving skills.
- **Technical Interview Questions**: Covers multiple domains such as web development, system design, databases, and more.
- **Mock Interviews**: Simulated interview sessions(company-wised) to help users practice and build confidence.
- **Personalized Dashboard**:
  - Track overall progress and performance.
  - View and revisit solved questions.
  - Bookmark important questions for future reference.
  - Monitor company-specific DSA question performance.

## Tech Stack

- **Frontend**: React.js (MERN Stack), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**:
  - **Frontend**: Vercel
  - **Backend**: Render
- **Storage**: Cloudinary (for media and image uploads)

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- Git

### Clone Repository

```sh
git clone https://github.com/yourusername/interwin.git
cd interwin
```

### Backend Setup

```sh
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file in the `server` directory and add the following details:

```env
PORT=4000
mongodb_url=your_mongo_url
JWT_SECRET=xyz

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email (which should have 2-step authentication enabled to get MAIL_PASS)
MAIL_PASS=your password

# Cloudinary storage settings
CLOUD_NAME=cloud_name
CLOUD_API_KEY=cloud_key
CLOUD_API_SECRET=cloud_secret
FOLDER_NAME=folder_name  # Folder to store media (images)
```

### Start Backend

```sh
npm run dev
```

### Frontend Setup

```sh
cd client
npm install
```

### Start Frontend

```sh
npm run dev
```

### Running the Application

Open two terminals:

1. Navigate to the `server` directory and run:
   ```sh
   npm run dev
   ```
2. Navigate to the `client` directory and run:
   ```sh
   npm run dev
   ```

## Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com)
- **Backend** is deployed on [Render](https://render.com)
- **Media storage** is managed via [Cloudinary](https://cloudinary.com)

