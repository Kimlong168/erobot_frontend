# Taskflow (To-Do Application)

A fully-featured task management application built with the MERN stack, featuring dynamic board layouts, customizable columns, and responsive design for optimal productivity across all devices.

## 🎯 Mission Overview

This project demonstrates proficiency in full-stack MERN development through a comprehensive To-Do List application with advanced board management capabilities. The application emphasizes clean architecture, intuitive user experience, and modern web development best practices.

## ✨ Core Features

### 📋 Task Management (CRUD Operations)
- **Create Tasks**: Add new tasks with title, description and priority
- **Read Tasks**: View all tasks across different columns and layouts
- **Update Tasks**: Edit task details and move between columns (drag and drop)
- **Delete Tasks**: Remove completed or unwanted tasks with confirmation

### 🗂️ Dynamic Board View
- **Kanban-Style Columns**: Visual task organization (To Do, Doing, Done)
- **Custom Column Management**: Users can create, rename, and delete columns
- **Drag & Drop**: Intuitive task movement between columns
- **Column Ordering**: Reorder columns to match workflow preferences
- **Visual Indicators**: User can add color to each column
- **Multiple boards**: User can create boards as much as they need

### 📝 List/Board View (Bonus Feature)
- **Toggle Between Views**: Switch between board and list layouts

  ### Authentication
- **Authentication**: User can register a new account or login to access their boards
  
### 📱 Responsive Interface
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Desktop Experience**: Enhanced functionality for larger screens
- **Touch-Friendly**: Intuitive drag-and-drop on mobile devices
- **Adaptive Layout**: Seamlessly adjusts to any screen size


## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite (Build tool and dev server)
- React Beautiful DnD (Drag and drop functionality)
- Tailwind CSS (Styling and responsive design)
- React Router DOM (Client-side routing)
- Axios (HTTP client)
- React Hot Toast (Notifications)
- Lucide React (Icons)

**Backend:**
- Node.js (Runtime environment)
- Express.js (Web framework)
- MongoDB (Database)
- Mongoose (ODM for MongoDB)
- CORS (Cross-origin resource sharing)
- Dotenv (Environment variables)
- Nodemon (Development server)

**Development Tools:**
- ESLint (Code linting)
- Prettier (Code formatting)

## 📋 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [MongoDB](https://www.mongodb.com/) (v5.0 or higher) or MongoDB Atlas account
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Kimlong168/ANB-Taskflow-Client.git
cd ANB-Taskflow-Client
```

### 2. Install Dependencies

**Install all dependencies:**
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_APP_BASE_URL=http://localhost:5173

```

**Frontend development server:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Production Build

**Build the frontend:**
```bash
npm run build
```

## 📁 Project Structure


## 🎨 Design Decisions

### Architecture Choices

**Frontend Architecture:**
- **Component-Based Design**: Modular, reusable components for maintainability
- **Custom Hooks**: Centralized state management and API logic
- **Service Layer**: Abstracted API calls for clean separation of concerns
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technology Justification

**React with Vite:**
- Fast development server and build times
- Modern bundling with tree-shaking
- Better developer experience than Create React App

**MongoDB with Mongoose:**
- Flexible schema for evolving task requirements
- Easy integration with Node.js
- Powerful querying capabilities

**Express.js Framework:**
- Lightweight and fast
- Extensive middleware ecosystem
- Perfect for RESTful APIs

## ✨ Bonus Features Implemented

### 🎛️ Advanced Column Management
- **Dynamic Column Creation**: Users can add custom workflow stages
- **Column Customization**: Rename columns to match team terminology
- **Column Deletion**: Remove unused workflow stages
- **Column Reordering**: Drag columns to optimize workflow layout
- **Column Color Coding**: Visual distinction between different stages

### 📱 Enhanced Mobile Experience
- **Mobile-Optimized Drag & Drop**: Smooth touch interactions
- **Responsive Column Layout**: Horizontal scrolling on mobile
- **Quick Actions Menu**: Context menus for rapid task updates

### 🔄 List View Toggle
- **Seamless View Switching**: Toggle between board and list views

### 🎨 User Experience Enhancements
- **Dark/Light Mode**: System preference detection and manual toggle
- **Loading States**: Smooth transitions and feedback

## 📸 Application Screenshots

### Desktop Board View
![Desktop Board View](./screenshots/desktop-board-view.png)
*Dynamic board layout with customizable columns and drag-and-drop functionality*

### Mobile Responsive Design
![Mobile View](./screenshots/mobile-responsive.png)
*Optimized mobile experience with touch-friendly interactions*

### Column Management
![Column Management](./screenshots/column-management.gif)
*Dynamic column creation, renaming, and reordering*

### List View Toggle
![List View](./screenshots/list-view-toggle.gif)
*Seamless switching between board and list layouts*

### Task Management Demo
![Task CRUD Operations](./screenshots/task-management-demo.gif)
*Complete task lifecycle: create, update, move, and delete*

## 👨‍💻 Author

**[Chann Kimlong]**
- GitHub: [@Kimlong168](https://github.com/Kimlong168)
- Portfolio: [Portfolio Website](https://kimlongchann.dev)

## 🙏 Acknowledgments

- **React Beautiful DnD**: Excellent drag-and-drop library
- **Tailwind CSS**: Utility-first CSS framework
- **MongoDB**: Flexible NoSQL database
- **Express.js**: Fast, minimalist web framework
- **Vite**: Next-generation frontend tooling

---

**Project Completion**: Monday, June 23rd, 2024 (On Schedule)
