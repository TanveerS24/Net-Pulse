# Load Sphere - Probabilistic Analysis System

## Overview

**Load Sphere** is a full-stack web application that provides **Probabilistic Analysis of Network Traffic and Server Performance Using Discrete Distributions**. The system features two core modules:

1. **Network Traffic Prediction** - Using Binomial Distribution
2. **Predictive Server Performance Booster** - Using Poisson Distribution

## Features

### Module 1: Network Traffic Prediction
- Real-time traffic simulation with configurable growth rate
- Live packet tracking (total, successful, failed)
- Binomial distribution calculation with step-by-step formula display
- Reliability metrics panel
- Scaling recommendations (horizontal & vertical)
- Historical data storage and analytics

### Module 2: Server Performance Booster
- Real-time server load simulation
- Dynamic arrival rate (λ) tracking
- Poisson distribution calculation with detailed steps
- Server boost analyzer (overload probability, response delay, congestion risk)
- Performance boost recommendations
- CPU/Instance scaling suggestions

### Dashboard Features
- Real-time charts and visualizations
- Historical analytics with comparison views
- Alert system for high congestion and overload risks
- Statistics cards showing key metrics
- Dark Ember themed interface

## Tech Stack

### Frontend
- **React** 19.2.0 with hooks and functional components
- **React Router** 6.22.0 for navigation
- **Recharts** 2.12.0 for data visualization
- **Axios** 1.6.7 for API calls
- **Lucide React** for icons
- **Vite** 7.3.1 for build tooling

### Backend
- **Node.js** with Express 5.2.1
- **MongoDB** with Mongoose 8.0.0
- **CORS** enabled
- **dotenv** for environment configuration

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Compass)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
cd "c:\Users\Tanveer\Vs Code\PS Capstone\Load Sphere"
```

### Step 2: Easy Installation (Windows)
**Option A: Automated Installation (Recommended)**
```bash
# Double-click install.bat to install all dependencies
# Then double-click start-app.bat to run the application
```

**Option B: Manual Installation**
Continue with steps 3-5 below.

### Step 3: Setup MongoDB
1. Install MongoDB Community Edition or use MongoDB Compass
2. Create a database named `epic-collections`
3. Default connection: `mongodb://localhost:27017/epic-collections`

### Step 4: Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# The .env file is already configured with:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/epic-collections
# NODE_ENV=development

# Start the server
npm run dev
```

The server will run on `http://localhost:5000`

### Step 5: Frontend Setup
```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The client will run on `http://localhost:5173` (or next available port)

### Step 6: Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

## API Endpoints

### Traffic Simulation APIs
- `POST /api/traffic/simulations` - Save traffic simulation
- `GET /api/traffic/simulations` - Get all traffic simulations
- `GET /api/traffic/simulations/:id` - Get specific simulation
- `GET /api/traffic/statistics` - Get traffic statistics
- `DELETE /api/traffic/simulations/:id` - Delete simulation

### Server Simulation APIs
- `POST /api/server/simulations` - Save server simulation
- `GET /api/server/simulations` - Get all server simulations
- `GET /api/server/simulations/:id` - Get specific simulation
- `GET /api/server/statistics` - Get server statistics
- `DELETE /api/server/simulations/:id` - Delete simulation

## Usage Guide

### Traffic Prediction Module
1. Navigate to **Traffic Prediction** from sidebar
2. Adjust the growth rate slider (10-200 packets/sec)
3. Click **Start Traffic Simulation**
4. Monitor live metrics:
   - Total packets transmitted
   - Successful/Failed packets
   - Success probability
5. View real-time charts showing traffic trends
6. Check binomial distribution calculation
7. Review reliability metrics and scaling recommendations
8. Click **Stop Simulation** to save data

### Server Performance Module
1. Navigate to **Server Performance** from sidebar
2. Set the base arrival rate (1-20 req/sec)
3. Click **Start Server Load Simulation**
4. Monitor server metrics:
   - Requests per second
   - Arrival rate (λ)
   - Queue length
   - Server utilization
5. View real-time charts
6. Check Poisson distribution calculation
7. Review boost analyzer and recommendations
8. Click **Stop Simulation** to save data

### Analytics
1. Navigate to **Analytics History**
2. Switch between Traffic and Server tabs
3. View historical simulations in table format
4. Click eye icon to view detailed calculations
5. Compare past simulations using scatter plots
6. Delete old simulations using trash icon

## Dark Ember Theme

The application features a custom **Dark Ember** theme with:
- Background: Charcoal black (#0f0f0f)
- Primary Accent: Ember orange (#ff6b35)
- Secondary: Ember amber (#f59e0b)
- Cards: Dark grey with soft shadows
- Buttons: Neon ember hover effects
- Charts: Orange, red, and amber gradients

## Project Structure

```
Load Sphere/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main app component
│   │   ├── App.css        # Dark Ember styles
│   │   └── main.jsx       # Entry point
│   └── package.json
│
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── models/       # Mongoose schemas
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API routes
│   │   └── index.js      # Server entry point
│   ├── .env              # Environment variables
│   └── package.json
│
└── README.md
```

## Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/epic-collections
NODE_ENV=development
```

All sensitive data is stored in the `.env` file and not committed to version control.

## Database Schema

### TrafficSimulation Collection
```javascript
{
  total_packets: Number,
  successful_packets: Number,
  failed_packets: Number,
  probability: Number,
  reliability_score: Number,
  packet_loss_probability: Number,
  retransmission_estimate: Number,
  horizontal_scaling: Number,
  vertical_scaling: Number,
  scaling_recommendation: String,
  binomial_calculation: String,
  timestamp: Date
}
```

### ServerSimulation Collection
```javascript
{
  arrival_rate: Number,
  request_count: Number,
  requests_per_second: Number,
  queue_length: Number,
  server_utilization: Number,
  overload_probability: Number,
  expected_delay: Number,
  congestion_risk: Number,
  boost_percentage: Number,
  cpu_scaling: Number,
  instance_scaling: Number,
  auto_scaling_threshold: Number,
  boost_recommendation: String,
  poisson_calculation: String,
  timestamp: Date
}
```

## Mathematical Formulas

### Binomial Distribution
```
P(X = k) = nCk × p^k × (1-p)^(n-k)

Where:
- n = total number of packets
- k = successful packets
- p = success probability
- nCk = binomial coefficient
```

### Poisson Distribution
```
P(X = k) = (λ^k × e^-λ) / k!

Where:
- λ = arrival rate (lambda)
- k = number of events
- e = Euler's number (2.71828...)
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally
- Check connection string in `.env` file
- Verify database name is `epic-collections`

### Port Conflicts
- Backend default: 5000 (change in `.env`)
- Frontend default: 5173 (Vite auto-assigns)

### Module Not Found Errors
```bash
# In server directory
npm install

# In client directory
npm install
```

## Development Scripts

### Backend
```bash
npm run dev    # Start with nodemon (hot reload)
npm start      # Start production server
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Contributing
This is a capstone project for educational purposes.

## License
ISC

## Author
Load Sphere Development Team

---

**Built with ❤️ using React, Node.js, MongoDB, and Recharts**
