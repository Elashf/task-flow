# TaskFlow

A modern full-stack task management application inspired by productivity tools like Trello.

TaskFlow allows users to organize their work through **Boards, Lists, and Cards** with a clean and responsive dashboard interface.

## ✨ Features

* 🔐 Authentication & protected routes
* 📋 Create and manage Boards, Lists & Cards
* ✏️ CRUD operations
* 🔎 Search 
* 📊 Dashboard interface
* 📱 Responsive design
* 🌓 Modern UI with Tailwind CSS & shadcn/ui
* 🗄️ PostgreSQL database with Prisma ORM
* 🔄 Drag & Drop
* 🛡️ Form validation with Zod 

## 🛠️ Tech Stack

* **Next.js** — App Router
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL / Neon**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide React**
*  **Zod**

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── dashboard/
│   └── ...
├── components/
├── lib/
├── generated/
└── ...
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Elashf/TaskFlow.git
cd TaskFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🎯 Purpose

TaskFlow was built to practice and demonstrate modern **Next.js full-stack development**, including database integration, authentication, CRUD operations, reusable components, and responsive UI design.

## 👩‍💻 Author

**Elahe Farahani**

GitHub: https://github.com/Elashf
