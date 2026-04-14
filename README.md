# 🧠 Clario — Version 2

> A minimal, intelligent life dashboard for mood tracking, productivity, and personal clarity.

---

## 🚀 Overview

**Clario v2** is a modern web application designed to help users:

* Track their daily mood
* Build consistent habits
* Manage tasks efficiently
* Gain insights into their behavior

This version focuses on:

* ⚡ Performance
* 🎨 Clean Apple + Notion-inspired UI
* 🧠 Smart data-driven insights
* 🔐 Secure backend using Supabase

---

## ✨ Features

### 🧠 Mood Tracking

* Daily mood selection (Happy, Neutral, Stressed, etc.)
* One entry per day
* Weekly overview visualization
* Journal notes support

### 🔁 Habit Tracking

* Create and manage habits
* Daily completion logs
* Streak-based tracking system

### ✅ Task Management

* Add, update, and delete tasks
* Priority levels (low, medium, high)
* Optional due dates
* Folder organization (v2 feature 🔥)

### 🧠 AI Insights (v2 Highlight)

* Rule-based intelligent insights
* Detect patterns between:

  * mood
  * habits
  * productivity
* Foundation for future AI integration

### 🎨 Personalization

* Theme support (light, dark, pink)
* Onboarding flow for new users
* User preferences stored in database

---

## 🏗️ Tech Stack

### Frontend

* React (JavaScript)
* Tailwind CSS
* React Router

### Backend

* Supabase (Auth + PostgreSQL + RLS)

### Architecture

* Feature-based structure
* Service-layer data handling
* Custom hooks for state management

---

## 📁 Project Structure

```
src/
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── mood/
│   ├── habits/
│   ├── tasks/
│   └── insights/
├── lib/
├── context/
├── hooks/
├── styles/
└── utils/
```

---

## 🔐 Authentication

* Supabase Auth (email/password)
* Auto profile creation on signup
* Protected routes for authenticated users

---

## 🗄️ Database Highlights

* PostgreSQL via Supabase
* Row Level Security (RLS) enabled
* Optimized indexes for performance
* One mood per day constraint
* Habit log deduplication

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd clario
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### 4. Run the app

```bash
npm run dev
```

---

## 🧠 Future Roadmap

* 🤖 AI-powered insights (OpenAI integration)
* 📊 Advanced analytics dashboard
* 🔔 Smart notifications & reminders
* 📱 Mobile optimization
* 🌍 Social / accountability features

---

## 💡 Philosophy

Clario is built around one idea:

> *Clarity creates consistency.*

The goal is not just productivity —
but understanding your patterns and improving your daily life.

---

## 👨‍💻 Author

Built by **Joel Navales**

---

## 📌 Version

**Clario v2**

* Improved database architecture
* Theme system
* Task folders
* AI-ready structure

---

## 📄 License

This project is for educational and personal use.
