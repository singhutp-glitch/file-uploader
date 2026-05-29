# File Uploader

A full-stack file upload and management application built with Node.js, Express, Prisma, PostgreSQL, Passport.js, and Supabase Storage.

## Features

* User authentication with Passport.js
* Session-based login system
* Create, update, and delete folders
* Upload files into folders
* File validation for type and size
* Cloud file storage using Supabase Storage
* File download support
* Delete files from cloud storage and database
* Prisma ORM with PostgreSQL

## Tech Stack

* Node.js
* Express
* Prisma
* PostgreSQL
* Passport.js
* Multer
* Supabase Storage
* EJS

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL=
SESSION_SECRET=
SUPABASE_URL=
SUPABASE_KEY=
```

## Run The App

```bash
npm run dev
```

## Database Migration

```bash
npx prisma migrate dev
```
