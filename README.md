# Landit

A full stack job application tracking tool built for developers
actively searching for work. Track applications, manage contacts,
and stay organized throughout your job search.

🔗 **Live Demo:** [landit-prod.vercel.app](https://landit-prod.vercel.app)


## Features

- **Authentication** — Google OAuth and email/password with email verification, forgot password and reset password flow
- **Job Management** — Add, update, delete and track job applications by status
- **Search & Filter** — Search by company or position, filter by application status
- **Contacts** — Link people to job applications with name, position, location, LinkedIn, email, phone and profile image
- **Dashboard** — Overview of your application pipeline at a glance

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Chakra UI
- React Hook Form + Zod

**Backend**
- Next.js Server Actions
- MongoDB + Mongoose
- NextAuth.js v5 (Google OAuth + Credentials)
- Nodemailer + React Email (email templates)
- Bcrypt (password hashing)
- Jose (JWT)

**Infrastructure**
- Vercel (deployment)
- MongoDB Atlas (production database)

## Architecture

This project follows a feature-based architecture where each domain
owns its validation schema, business logic, server actions, and data
access layer.

```
/features     → feature modules (auth, job, contact)
/app/api      → API handlers where needed
/components   → UI components organized by feature
/lib          → shared utilities (db, auth, errors, email)
/constants    → app-wide constants organized by feature
/helper       → utility functions (date formatting)
```

**Request flow**

- Server Actions handle user interactions directly from components
- Services contain business logic and database queries
- Components stay focused on UI — no fetch logic, no business rules

## Local Development

**Prerequisites**
- Node.js 18+
- MongoDB installed locally or a MongoDB Atlas account

**1. Clone the repo**
```bash
git clone https://github.com/Carlos4152/job-tracker.git
cd job-tracker
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in your `.env.local`:
```bash
# Database
MONGO_URI=mongodb://127.0.0.1:27017/job-tracker

# Auth
AUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email
EMAIL_FROM=your_email
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_smtp_user
EMAIL_SERVER_PASSWORD=your_smtp_password

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**4. Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `AUTH_SECRET` | Random secret for NextAuth v5 |
| `NEXTAUTH_URL` | Base URL of your app |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `EMAIL_FROM` | Sender email address |
| `EMAIL_SERVER_HOST` | SMTP host |
| `EMAIL_SERVER_PORT` | SMTP port |
| `EMAIL_SERVER_USER` | SMTP username |
| `EMAIL_SERVER_PASSWORD` | SMTP password |
| `NEXT_PUBLIC_APP_URL` | Public base URL |


## Key Technical Decisions

**Why Server Actions over API Routes**

Server Actions colocate data mutations with the components that
trigger them, reducing boilerplate and eliminating the need for
a separate fetch layer for most operations. This aligns with the
App Router model and keeps the codebase lean without sacrificing
separation of concerns — business logic still lives in services,
not in components.

**Why Mongoose over Prisma**

Prisma's MongoDB support is limited compared to its PostgreSQL
support. Mongoose is the industry standard for MongoDB with Node.js
and gives full control over schema design and queries.

**Why feature-based architecture**

Organizing by feature instead of by layer (controllers/models/services)
means each feature is self-contained. Adding a new feature never
requires touching existing modules — only a new folder is created.

**Why React Email + Nodemailer**

React Email allows writing email templates as React components,
making them easier to maintain and preview. Nodemailer handles
SMTP delivery and works with any email provider without vendor
lock-in.

## Project Structure
```
/app
  /(auth)         → public auth pages (sign in, sign up, reset)
  /(webapp)       → protected app pages (jobs, dashboard)
  /api            → API handlers

/features
  /auth
    /actions      → server actions
    /components   → auth forms (SigninForm, SignupForm, etc)
    /hooks        → useSignin, useSignup, etc
    /models       → user.model.ts
    /schemas      → auth.schema.ts
    /services     → auth.service.ts
    /types        → auth.types.ts
    /constants    → auth.constants.ts
    /helpers      → auth-specific utilities
  /job
    /actions      → server actions
    /components   → JobTable, JobForm, JobCard, JobSearch
    /hooks        → useJobs, useCreateJob, etc
    /models       → job.model.ts
    /schemas      → job.schema.ts
    /services     → job.service.ts
    /types        → job.types.ts
    /constants    → job.constants.ts
    /helpers      → job-specific utilities
  /contact
    /actions      → server actions
    /components   → ContactForm, ContactCard
    /hooks        → useContacts, useCreateContact, etc
    /models       → contact.model.ts
    /schemas      → contact.schema.ts
    /services     → contact.service.ts
    /types        → contact.types.ts
    /constants    → contact.constants.ts
    /helpers      → contact-specific utilities

/lib
  db.ts           → mongoose connection with caching
  auth.ts         → NextAuth config
  errors.ts       → custom error classes
  jwt.ts          → JWT utilities
  /email          → React Email templates + nodemailer config

/components       → shared UI components used across features
/constants        → app-wide constants
/helper           → app-wide utility functions
```

## Roadmap

- [ ] Dashboard with pipeline stats and charts
- [ ] Export applications to CSV
- [ ] Interview scheduling and reminders
- [ ] Browser extension to save jobs from LinkedIn

## Author

**Carlos Lopez**

[LinkedIn](https://www.linkedin.com/in/lopezcarlosdev/) ·
[GitHub](https://github.com/Carlos4152) ·
[Portfolio](https://carlos-swe.vercel.app/)