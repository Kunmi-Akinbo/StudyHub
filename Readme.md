StudyHub
A personal study companion web application that helps students optimize their learning through structured study sessions, note-taking, and progress tracking.
Overview
StudyHub is a modern study management platform designed to help students improve their academic performance and study habits. It combines proven productivity techniques like the Pomodoro method with comprehensive note-taking and progress analytics to create an all-in-one study solution.
Features

Pomodoro Timer: Customizable work/break intervals (25/5/15 minutes) with audio notifications and session tracking
Study Session Management: Automatic logging of study sessions with duration tracking and productivity metrics
Note-Taking System: Create, edit, and organize study notes with search functionality and category organization
Progress Analytics: Visual dashboard showing study patterns, session statistics, and weekly/monthly summaries
User Authentication: Secure user registration and login with JWT-based authentication
Responsive Design: Clean, modern interface optimized for both desktop and mobile devices

Tech Stack

Backend: Node.js (Express), TypeScript, PostgreSQL, JWT Authentication
Frontend: React.js, TypeScript, Tailwind CSS, Chart.js
Database: PostgreSQL with Knex.js query builder
Testing: Jest, React Testing Library, Supertest
API: RESTful API with Express and TypeScript

Prerequisites

Node.js 18+
PostgreSQL 14+
npm or yarn

Setup Instructions
1. Clone the Repository
bashgit clone https://github.com/yourusername/studyhub.git
cd studyhub
2. Backend Setup
Navigate to the backend directory and set up the Node.js application:
bashcd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Create database
npm run db:create

# Start the development server
npm run dev
3. Frontend Setup
In a new terminal, navigate to the frontend directory:
bashcd client

# Install dependencies
npm install

# Start the React development server
npm start
4. Access the Application

Backend API: http://localhost:5000
Frontend: http://localhost:3000

Usage

Register for a new account or login with existing credentials
Start a study session using the Pomodoro timer with customizable intervals
Take notes during your study sessions with the integrated note-taking system
Track your progress through the analytics dashboard
Review your study patterns and optimize your learning schedule

