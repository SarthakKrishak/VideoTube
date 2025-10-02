# VideoTube

A modern, full-stack video sharing platform inspired by YouTube, built with Node.js backend and React frontend.

## 🚀 Features

- **Video Upload & Streaming**: Upload and stream videos with support for multiple formats
- **User Authentication**: Secure user registration and login system
- **Video Management**: Create, edit, and delete video content
- **Comments System**: Interactive commenting on videos
- **User Profiles**: Customizable user profiles and channels
- **Search & Discovery**: Advanced search functionality to find videos
- **Responsive Design**: Mobile-friendly interface that works on all devices

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Multer** - File upload handling
- **Cloudinary** - Video storage and streaming

### Frontend

- **React** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Navigation
- **Tailwind CSS** - Styling

## 📁 Project Structure

```
03_yt_similar_app/
├── backend/                 # Backend API server
│   ├── controllers/         # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── index.js            # Server entry point
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main App component
│   └── public/             # Static assets
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Cloudinary account (for video storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 03_yt_similar_app
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/youtube-clone
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start the development servers**

   Backend (from backend directory):

   ```bash
   npm run dev
   ```

   Frontend (from frontend directory):

   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Video Endpoints

- `GET /api/videos` - Get all videos
- `POST /api/videos` - Upload new video
- `GET /api/videos/:id` - Get video by ID
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video

### User Endpoints

- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/videos` - Get user's videos

## 🎯 Key Features Implementation

### Video Upload

- Multi-part file upload using Multer
- Video processing and optimization
- Cloudinary integration for storage and streaming
- Thumbnail generation

### Authentication

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes middleware
- User session management

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or your preferred database
2. Configure environment variables
3. Deploy to Heroku, Vercel, or AWS

### Frontend Deployment

1. Build the production version
2. Deploy to Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sarthak Krishak**

- GitHub: [@sarthakkrishak](https://github.com/sarthakkrishak)
- LinkedIn: [Sarthak Krishak](https://linkedin.com/in/sarthakkrishak)

## 🙏 Acknowledgments

- YouTube for inspiration
- Open source community for amazing libraries
- Contributors and testers

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact the author directly
- Check the documentation

---

⭐ If you found this project helpful, please give it a star!
