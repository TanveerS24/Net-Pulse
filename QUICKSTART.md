# Load Sphere - Quick Start Guide

## 🚀 Quick Start (5 Steps)

### 1️⃣ Ensure MongoDB is Running
- Open MongoDB Compass OR
- Start MongoDB service:
  ```bash
  # Windows (as Administrator)
  net start MongoDB
  
  # Or use MongoDB Compass to connect to:
  # mongodb://localhost:27017
  ```

### 2️⃣ Start the Backend Server
```bash
cd "c:\Users\Tanveer\Vs Code\PS Capstone\Load Sphere\server"
npm run dev
```
✅ Server running on http://localhost:5000

### 3️⃣ Start the Frontend (New Terminal)
```bash
cd "c:\Users\Tanveer\Vs Code\PS Capstone\Load Sphere\client"
npm run dev
```
✅ Client running on http://localhost:5173

### 4️⃣ Open in Browser
Navigate to: **http://localhost:5173**

### 5️⃣ Start Exploring!
- Dashboard: View overall statistics
- Traffic Prediction: Run network traffic simulations
- Server Performance: Test server load scenarios
- Analytics: Review historical data

## 🎯 First Time Setup
If this is your first time running the app:

```bash
# Backend dependencies
cd server
npm install

# Frontend dependencies  
cd ../client
npm install --legacy-peer-deps
```

## 🔥 What to Expect

### Traffic Prediction Module
1. Adjust growth rate slider
2. Click "Start Traffic Simulation"
3. Watch real-time packet transmission
4. View Binomial distribution calculations
5. Get scaling recommendations

### Server Performance Module
1. Set base arrival rate
2. Click "Start Server Load Simulation"
3. Monitor server utilization live
4. View Poisson distribution analysis
5. Get performance boost suggestions

## 📊 Database
- Database: epic-collections
- Collections: trafficsimulations, serversimulations
- Connection: mongodb://localhost:27017/epic-collections

## 🎨 Theme
Dark Ember - Black background with orange glow accents

## 🛠️ Troubleshooting

**MongoDB Not Connected?**
- Check if MongoDB service is running
- Verify .env has correct MONGODB_URI

**Port Already in Use?**
- Backend: Change PORT in server/.env
- Frontend: Vite will auto-assign next port

**Build Errors?**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 📞 Need Help?
Check the main README.md for detailed documentation.

---
**Happy Analyzing! 🚀**
