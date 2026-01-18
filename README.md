# Simple KYC - Know Your Customer Application

A web-based KYC (Know Your Customer) submission and review system built with React.js and JSON Server.

## Overview

This application allows users to submit their financial and personal information for KYC verification, and enables officers to review and approve/reject submissions.

## Technologies Used

- **Frontend**: React.js with React Router
- **Backend**: JSON Server (Mock REST API)
- **Form Management**: React Hook Form
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Project Structure

```
project-root/
├── client/          # React frontend application
│   ├── src/
│   ├── package.json
│   └── ...
├── server/          # JSON Server backend
│   ├── db.json     # Database file
│   ├── package.json
│   └── ...
└── README.md
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Client Dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install Server Dependencies**
   ```bash
   cd ../server
   npm install
   ```

## Running the Application

### Start the Backend Server

```bash
cd server
npm start
```

The JSON Server will run on `http://localhost:8000` (or the port specified in your configuration)

### Start the Frontend Client

Open a new terminal window:

```bash
cd client
npm run dev
```

The React application will run on `http://localhost:5173` (or the port specified by Vite)

## Test Accounts

### Officer Account

- **Email**: `officer123@gmail.com`
- **Password**: `officer123`
- **Role**: Officer (Can review and approve/reject submissions)

### Normal User Accounts

**User 1:**

- **Email**: `khanh123@gmail.com`
- **Password**: `khanh123`
- **Role**: Normal User (Can submit KYC forms)

**User 2:**

- **Email**: `linhtran98@gmail.com`
- **Password**: `linh123`
- **Role**: Normal User

**User 3:**

- **Email**: `hoangminh2000@gmail.com`
- **Password**: `minh123`
- **Role**: Normal User

**User 4:**

- **Email**: `thuylee21@gmail.com`
- **Password**: `thuy123`
- **Role**: Normal User

## Features

### For Normal Users

- Register and login to the system
- Fill out comprehensive KYC forms including:
  - Basic information (name, date of birth)
  - Contact information (addresses, emails, phones)
  - Identification documents
  - Occupation history
  - Financial information (incomes, assets, liabilities, wealth sources)
  - Investment experience and risk tolerance
- View submission status
- Automatic calculation of net worth

### For Officers

- Review pending KYC submissions
- View submitted user information
- Approve or reject submissions
- Filter between reviewed and unreviewed submissions
- Click on submissions to view detailed KYC information

## Configuration

### JSON Server Configuration

The server runs with the following default settings:

- **Port**: 8000
- **Database**: `server/db.json`
- **Routes**: RESTful API endpoints for users and user profiles

### Client Configuration

- **Development Server**: Vite dev server
- **API Base URL**: Configure in your API client to point to `http://localhost:8000`

## Database Structure

### Users Collection

```json
{
  "id": "string",
  "email": "string",
  "password": "string (hashed)",
  "role": "number (0: Normal User, 1: Officer)"
}
```

### User Profiles Collection

```json
{
  "id": "string",
  "userId": "string",
  "firstName": "string",
  "lastName": "string",
  "addresses": [],
  "emails": [],
  "phones": [],
  "documents": [],
  "occupations": [],
  "incomes": [],
  "assets": [],
  "liabilities": [],
  "wealthSources": [],
  "totalNetWorth": "number",
  "status": "number (0: Pending, 1: Approved, 2: Rejected)"
}
```
