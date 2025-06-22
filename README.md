# 🎬 CineGold - Cinema Ticket Management System

A modern, full-stack cinema ticket management system built with React TypeScript frontend and Node.js backend.

## 🌟 Features

### 🎭 Frontend Features
- **Landing Page** with hero section and movie carousel
- **Movie Details** with detailed information and booking options
- **User Authentication** (Login, Register, Password Reset)
- **User Profile** management
- **Reservation System** with seat selection
- **Admin Dashboard** for comprehensive management
- **Responsive Design** with modern UI/UX

### 🔧 Backend Features
- **RESTful API** with TypeScript
- **Authentication & Authorization** with Supabase
- **CRUD Operations** for all entities
- **Database Integration** with proper relationships
- **Middleware** for authentication and validation

### 🎫 Management Modules
- **Films Management** - Add, edit, delete movies
- **Rooms/Theaters Management** - Configure cinema halls
- **Screenings Management** - Schedule movie showings
- **Bookings Management** - Handle reservations
- **Users Management** - User administration
- **Tickets Management** - Ticket generation and validation

## 🏗️ Project Structure

```
CineGold/
├── tickets-backend/          # Node.js TypeScript Backend
│   ├── controllers/          # API Controllers
│   ├── routes/              # API Routes
│   ├── middleware/          # Authentication & Validation
│   ├── db/                  # Database Configuration
│   └── types/               # TypeScript Definitions
│
└── ts-ticket-frontend/      # React TypeScript Frontend
    ├── src/
    │   ├── client/          # Client-facing pages
    │   │   └── Landing/     # Landing page components
    │   ├── view/            # Admin views
    │   │   ├── Auth/        # Authentication components
    │   │   ├── booking/     # Booking management
    │   │   ├── films/       # Film management
    │   │   ├── salle/       # Room management
    │   │   ├── seance/      # Screening management
    │   │   └── user/        # User management
    │   ├── CRUD/            # API Controllers
    │   ├── hooks/           # Custom React Hooks
    │   ├── contexts/        # React Contexts
    │   └── components/      # Reusable Components
    └── public/              # Static Assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for authentication)

### Backend Setup

```bash
# Navigate to backend directory
cd tickets-backend

# Install dependencies
npm install

# Configure environment variables
# Create .env file with:
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_supabase_anon_key
# PORT=3001

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd ts-ticket-frontend

# Install dependencies
npm install

# Configure environment variables
# Create .env file with:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# VITE_API_URL=http://localhost:3001

# Start development server
npm run dev
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe server-side code
- **Express.js** - Web framework
- **Supabase** - Authentication and database
- **CORS** - Cross-origin resource sharing

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset

### Movies
- `GET /api/films` - Get all films
- `POST /api/films` - Create new film
- `PUT /api/films/:id` - Update film
- `DELETE /api/films/:id` - Delete film

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Rooms & Screenings
- `GET /api/rooms` - Get all rooms
- `GET /api/screenings` - Get all screenings
- `POST /api/screenings` - Create new screening

## 👥 User Roles

- **Customer** - Browse movies, make reservations, manage profile
- **Admin** - Full system management, user administration, content management

## 🎨 UI/UX Features

- Modern, responsive design
- Intuitive navigation
- Real-time updates
- Mobile-friendly interface
- Accessibility compliant
- Dark/Light theme support

## 📱 Pages & Components

### Client Pages
- **Landing Page** - Hero section with featured movies
- **Movie Details** - Comprehensive movie information
- **Reservation** - Seat selection and booking
- **User Profile** - Account management

### Admin Pages
- **Dashboard** - System overview
- **Film Management** - Movie CRUD operations
- **Room Management** - Theater configuration
- **Screening Management** - Show scheduling
- **Booking Management** - Reservation oversight
- **User Management** - User administration

## 🔐 Authentication Flow

1. User registration/login via Supabase
2. JWT token management
3. Protected routes with middleware
4. Role-based access control
5. Secure password handling

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
# Build for production
npm run build

# Deploy build folder
```

### Backend Deployment (Railway/Heroku)
```bash
# Ensure environment variables are set
# Deploy using platform-specific commands
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anas Lrhazouli**
- GitHub: [@Anaslrhazouli](https://github.com/Anaslrhazouli)

## 🙏 Acknowledgments

- React team for the amazing framework
- Supabase for authentication and database services
- TypeScript team for type safety
- Vite for fast development experience

---

⭐ Star this repository if you find it helpful!
