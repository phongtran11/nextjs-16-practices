# Next.js 16 Practices 🚀

A modern, scalable web application built with **Next.js 16 (RC)**, **React 19**, and a robust tech stack designed for performance, security, and developer experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Neon Serverless)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## ✨ Key Features

- **Authentication**:
  - Email/Password Login & Registration.
  - **Soft Delete Support**: Deleted users are blocked from login with standard "Invalid credentials" error for security.
  - **Server-Side Session Management**: Optimized with `React.cache` for request deduplication.
- **Admin Dashboard**:
  - Protected routes with role-based access control (RBAC).
  - Responsive Sidebar & Layout.
- **Internationalization (i18n)**:
  - Full support for English (`en`) and Vietnamese (`vi`).
  - Route middleware for locale detection.
- **Modern UI/UX**:
  - Dark/Light mode support.
  - Responsive design.
  - Toast notifications & Loading states.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- PostgreSQL Database (Neon recommended)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd nextjs-16-practices
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**

    Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
    BETTER_AUTH_SECRET="your-secret-key"
    NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
    ```

4.  **Database Setup:**

    Push the schema to your database:

    ```bash
    npm run db:push
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

## 📜 Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run start`: Start production server.
- `npm run db:generate`: Generate SQL migration files.
- `npm run db:migrate`: Apply migrations.
- `npm run db:push`: Push schema directly to DB (useful for prototyping).
- `npm run db:studio`: Open Drizzle Studio to manage data.

## 🤝 Contributing

Contributions are welcome! Please follow the project structure and coding standards.

## 📄 License

This project is licensed under the MIT License.
