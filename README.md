# Personal Diary Application

A full-stack diary application built with Laravel, React, TypeScript, and Tailwind CSS. This application allows users to create, read, update, and manage their personal diary entries with a modern and responsive user interface.

## Features

- Modern and responsive UI with Tailwind CSS
- RESTful API endpoints for diary management
- Form validation and real-time character counting
- Loading states and error handling
- Smooth navigation between pages
- Efficient data fetching with React Query
- SQLite database for data persistence

## Prerequisites

Before you begin, ensure you have the following installed:
- PHP 8.2 or higher
- Composer
- Node.js and npm
- SQLite

## Installation

### Backend Setup (Laravel)

1. Navigate to the server directory:
```bash
cd Server
```

2. Install PHP dependencies:
```bash
composer install
```

3. Run migrations:
```bash
php artisan migrate
```

4. Start the Laravel development server:
```bash
php artisan serve
```

### Frontend Setup (React)

1. Navigate to the client directory:
```bash
cd Client
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. You can now:
   - View all diary entries on the main page
   - Add new diary entries
   - Edit existing entries
   - View individual entries


## License

This project is licensed under the ELTE License.
