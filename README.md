# PixelForge Nexus  
**Role-Based Project Collaboration System (MERN Stack)**

PixelForge Nexus is a full-stack project collaboration platform designed to manage software projects using **role-based access control**.  
The system allows **Admins, Leads, and Developers** to collaborate efficiently through project creation, developer assignment, document uploads, and dashboard analytics.

---

## 🚀 Features

### Authentication & Authorization
- Secure JWT-based authentication
- Role-based login:
  - **Admin** – Create projects, assign leads/developers
  - **Lead** – Manage assigned projects
  - **Developer** – View assigned projects and documents

### Project Management
- Create and manage projects
- Assign developers
- View project details
- Mark projects as completed

### Document Management
- Upload project documents
- Secure file storage
- Download/view uploaded files

### Dashboard Analytics
- Total projects
- Active projects
- Completed projects
- Role-based dashboard view

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- Framer Motion
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Upload)

---


---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/pixelforge-nexus.git
cd pixelforge-nexus

###Backend Setup
```bash
cd server
npm install
npm run server

###Frontend Setup
```bash
cd client
npm install
npm run dev



