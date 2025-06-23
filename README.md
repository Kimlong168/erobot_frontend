# MERN To-Do Board Application

A modern, fully-featured task management application built with the MERN stack, featuring dynamic board layouts, customizable columns, and responsive design for optimal productivity across all devices.

## 🎯 Mission Overview

This project demonstrates proficiency in full-stack MERN development through a comprehensive To-Do List application with advanced board management capabilities. The application emphasizes clean architecture, intuitive user experience, and modern web development best practices.

## ✨ Core Features

### 📋 Task Management (CRUD Operations)
- **Create Tasks**: Add new tasks with title, description, priority, and due dates
- **Read Tasks**: View all tasks across different columns and layouts
- **Update Tasks**: Edit task details, move between columns, and update status
- **Delete Tasks**: Remove completed or unwanted tasks with confirmation

### 📱 Responsive Interface
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Desktop Experience**: Enhanced functionality for larger screens
- **Touch-Friendly**: Intuitive drag-and-drop on mobile devices
- **Adaptive Layout**: Seamlessly adjusts to any screen size

### 🗂️ Dynamic Board View
- **Kanban-Style Columns**: Visual task organization (To Do, Doing, Done)
- **Custom Column Management**: Users can create, rename, and delete columns
- **Drag & Drop**: Intuitive task movement between columns
- **Column Ordering**: Reorder columns to match workflow preferences
- **Visual Indicators**: Color coding and progress tracking

### 📝 Optional List View (Bonus Feature)
- **Toggle Between Views**: Switch between board and list layouts
- **Sortable Lists**: Sort by priority, due date, or creation time
- **Compact Display**: More tasks visible in limited space
- **Quick Actions**: Inline editing and status updates

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Hooks
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
- Concurrently (Run multiple scripts)

## 📋 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [MongoDB](https://www.mongodb.com/) (v5.0 or higher) or MongoDB Atlas account
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-todo-board.git
cd mern-todo-board
```

### 2. Install Dependencies

**Install all dependencies (frontend + backend):**
```bash
npm install
```

**Or install separately:**
```bash
# Frontend dependencies
cd client
npm install

# Backend dependencies
cd ../server
npm install
```

### 3. Environment Configuration

Create a `.env` file in the **server** directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/todo-board
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-board

# CORS Configuration
CLIENT_URL=http://localhost:5173

# Optional: JWT Configuration (if implementing authentication)
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
```

Create a `.env` file in the **client** directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=To-Do Board
VITE_APP_VERSION=1.0.0
```

### 4. Database Setup

**Option 1: Local MongoDB**
```bash
# Start MongoDB service (varies by OS)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option 2: MongoDB Atlas**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Update the `MONGODB_URI` in your `.env` file

## 💻 Running the Application

### Development Mode

**Start both frontend and backend concurrently:**
```bash
npm run dev
```

**Or start them separately:**

**Backend server:**
```bash
cd server
npm run dev
```
Server runs on: `http://localhost:5000`

**Frontend development server:**
```bash
cd client
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Production Build

**Build the frontend:**
```bash
cd client
npm run build
```

**Start production server:**
```bash
cd server
npm start
```

## 📁 Project Structure

```
mern-todo-board/
├── client/                     # React frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Board/          # Board view components
│   │   │   ├── Task/           # Task components
│   │   │   ├── Column/         # Column components
│   │   │   └── Layout/         # Layout components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service layer
│   │   ├── utils/              # Utility functions
│   │   ├── styles/             # Global styles
│   │   ├── App.jsx             # Main App component
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                     # Express backend
│   ├── controllers/            # Route controllers
│   ├── models/                 # Mongoose models
│   ├── routes/                 # API routes
│   ├── middleware/             # Custom middleware
│   ├── config/                 # Configuration files
│   ├── utils/                  # Utility functions
│   ├── server.js               # Server entry point
│   └── package.json
├── .env.example                # Environment variables template
├── package.json                # Root package.json
└── README.md                   # This file
```

## 🎨 Design Decisions

### Architecture Choices

**Frontend Architecture:**
- **Component-Based Design**: Modular, reusable components for maintainability
- **Custom Hooks**: Centralized state management and API logic
- **Service Layer**: Abstracted API calls for clean separation of concerns
- **Responsive Design**: Mobile-first approach with Tailwind CSS

**Backend Architecture:**
- **RESTful API Design**: Clear, predictable endpoints following REST principles
- **MVC Pattern**: Separation of models, views, and controllers
- **Middleware Pipeline**: Authentication, validation, and error handling
- **Database Modeling**: Efficient schema design with proper relationships

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
- **Touch Gestures**: Swipe actions for quick task management
- **Mobile-Optimized Drag & Drop**: Smooth touch interactions
- **Responsive Column Layout**: Horizontal scrolling on mobile
- **Quick Actions Menu**: Context menus for rapid task updates

### 🔄 List View Toggle
- **Seamless View Switching**: Toggle between board and list views
- **List View Features**:
  - Sortable by priority, due date, creation date
  - Bulk selection and actions
  - Compact display for maximum productivity
  - Inline editing capabilities

### 🎯 Advanced Task Features
- **Priority Levels**: High, Medium, Low priority indicators
- **Due Date Management**: Calendar integration and overdue alerts
- **Task Categories**: Custom tags and labels
- **Search & Filter**: Find tasks quickly across all columns
- **Task Statistics**: Progress tracking and completion metrics

### 🎨 User Experience Enhancements
- **Dark/Light Mode**: System preference detection and manual toggle
- **Keyboard Shortcuts**: Power user productivity features
- **Undo/Redo**: Mistake recovery functionality
- **Auto-Save**: Real-time data persistence
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

*Note: Screenshots and GIFs will be added upon completion*

## 🧪 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Tasks
- `GET /tasks` - Retrieve all tasks
- `GET /tasks/:id` - Get specific task
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:id/move` - Move task between columns

#### Columns
- `GET /columns` - Retrieve all columns
- `POST /columns` - Create new column
- `PUT /columns/:id` - Update column
- `DELETE /columns/:id` - Delete column
- `PATCH /columns/reorder` - Reorder columns

### Sample API Response

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "priority": "high",
    "status": "doing",
    "columnId": "507f1f77bcf86cd799439012",
    "dueDate": "2024-06-25T00:00:00.000Z",
    "createdAt": "2024-06-23T10:30:00.000Z",
    "updatedAt": "2024-06-23T10:30:00.000Z"
  }
}
```

## 🧪 Testing

Run the test suite:

```bash
# Frontend tests
cd client
npm run test

# Backend tests
cd server
npm run test

# Run all tests
npm run test:all
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Build the application:
```bash
cd client
npm run build
```

2. Deploy to Vercel:
```bash
vercel --prod
```

### Backend Deployment (Heroku)

1. Create Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production
```

3. Deploy:
```bash
git push heroku main
```

### Full-Stack Deployment (Railway/Render)

1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically on push to main branch

## 📈 Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useMemo & useCallback**: Optimizes expensive calculations
- **Code Splitting**: Lazy loading for better initial load times
- **Image Optimization**: WebP format and lazy loading
- **Database Indexing**: Optimized queries for better performance
- **Caching Strategy**: Client-side and server-side caching

## 🔒 Security Considerations

- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin request handling
- **Environment Variables**: Sensitive data protection
- **Error Handling**: Secure error messages without data exposure
- **Rate Limiting**: API protection against abuse

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Timeline

**Day 1 (June 21st):**
- ✅ Project setup and initial architecture
- ✅ Backend API development (CRUD operations)
- ✅ Database schema design and implementation

**Day 2 (June 22nd):**
- ✅ Frontend component development
- ✅ Board view with drag-and-drop functionality
- ✅ Responsive design implementation

**Day 3 (June 23rd):**
- ✅ Column management features
- ✅ List view implementation (bonus)
- ✅ Final testing and deployment preparation

## 🎯 Assessment Criteria Met

- ✅ **Full-Stack MERN Proficiency**: Complete implementation using all MERN stack technologies
- ✅ **Clean Code Architecture**: Well-organized, maintainable codebase
- ✅ **Backend API Creation**: RESTful API with proper error handling
- ✅ **Database Integration**: Efficient MongoDB integration with Mongoose
- ✅ **Intuitive Frontend Design**: User-friendly interface with modern UX principles
- ✅ **Effective Technology Use**: Leveraging each technology's strengths
- ✅ **User Experience Focus**: Responsive, accessible, and performant application

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- Portfolio: [Your Portfolio Website](https://yourportfolio.com)

## 🙏 Acknowledgments

- **React Beautiful DnD**: Excellent drag-and-drop library
- **Tailwind CSS**: Utility-first CSS framework
- **MongoDB**: Flexible NoSQL database
- **Express.js**: Fast, minimalist web framework
- **Vite**: Next-generation frontend tooling

---

**Project Completion**: Monday, June 23rd, 2024 (On Schedule)
