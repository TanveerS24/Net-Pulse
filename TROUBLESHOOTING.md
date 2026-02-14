# Load Sphere - Troubleshooting Guide

## 🔧 Common Issues & Solutions

---

## 🗄️ MongoDB Issues

### Issue: "MongoDB connection failed"
**Symptoms:**
- Server logs show connection error
- "Error: connect ECONNREFUSED"

**Solutions:**
1. **Check if MongoDB is running:**
   ```bash
   # Windows
   net start MongoDB
   
   # Or check services
   services.msc → Look for "MongoDB"
   ```

2. **Verify MongoDB Compass connection:**
   - Open MongoDB Compass
   - Connect to: `mongodb://localhost:27017`
   - Should see server connection

3. **Check .env file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/epic-collections
   ```
   - Ensure no typos
   - Verify port 27017
   - Check database name

4. **Restart MongoDB:**
   ```bash
   net stop MongoDB
   net start MongoDB
   ```

---

## 🌐 Port Conflicts

### Issue: "Port 5000 already in use"
**Symptoms:**
- "Error: listen EADDRINUSE"
- Backend won't start

**Solutions:**
1. **Find process using port:**
   ```bash
   netstat -ano | findstr :5000
   ```

2. **Kill the process:**
   ```bash
   taskkill /PID <PID_NUMBER> /F
   ```

3. **Or change port in .env:**
   ```env
   PORT=5001  # Use different port
   ```

### Issue: "Port 5173 already in use"
**Symptoms:**
- Vite shows error
- Frontend won't start

**Solutions:**
- Vite will automatically try next available port (5174, 5175, etc.)
- Accept the suggested port
- Or manually specify in vite.config.js

---

## 📦 Dependency Issues

### Issue: "Module not found" errors
**Symptoms:**
- Import errors in code
- "Cannot find module 'X'"

**Solutions:**
1. **Reinstall backend dependencies:**
   ```bash
   cd server
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Reinstall frontend dependencies:**
   ```bash
   cd client
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

### Issue: "peer dependency" warnings
**Solution:**
```bash
npm install --legacy-peer-deps
```
This is expected for lucide-react with React 19.

---

## 🔴 CORS Errors

### Issue: "CORS policy blocked"
**Symptoms:**
- Network requests fail in browser
- Console shows CORS error

**Solutions:**
1. **Verify CORS is enabled in app.js:**
   ```javascript
   app.use(cors());
   ```

2. **Check API URL in client:**
   ```javascript
   // In client/src/services/api.js
   const API_BASE_URL = 'http://localhost:5000/api';
   ```

3. **Restart both servers:**
   - Stop backend and frontend
   - Start backend first
   - Then start frontend

---

## 💻 Backend Issues

### Issue: "TypeError: Cannot read property"
**Symptoms:**
- 500 error from API
- Server crashes

**Solutions:**
1. **Check request body:**
   - Ensure all required fields sent
   - Verify data types match schema

2. **Check MongoDB models:**
   - Verify field names match
   - Check required fields

3. **Check server logs:**
   - Look at terminal output
   - Identify exact error line

### Issue: ".env variables not loading"
**Solutions:**
1. **Verify .env location:**
   - Must be in `server/` directory
   - Not in `server/src/`

2. **Check dotenv import:**
   ```javascript
   require('dotenv').config();
   ```

3. **Restart server after .env changes**

---

## 🎨 Frontend Issues

### Issue: "Blank white screen"
**Symptoms:**
- Nothing renders
- No errors in console

**Solutions:**
1. **Check console for errors:**
   - Press F12
   - Look at Console tab
   - Read error messages

2. **Verify API connection:**
   - Check Network tab
   - See if API calls succeed
   - Look for 404 or 500 errors

3. **Clear browser cache:**
   ```
   Ctrl + Shift + Delete
   Clear cache and reload
   ```

### Issue: "Charts not rendering"
**Solutions:**
1. **Check data format:**
   - Recharts needs array of objects
   - Verify data structure

2. **Check console for Recharts errors**

3. **Verify Recharts installed:**
   ```bash
   npm list recharts
   ```

---

## 🔄 API Issues

### Issue: "404 Not Found" on API calls
**Symptoms:**
- API returns 404
- "Cannot GET /api/..."

**Solutions:**
1. **Verify route exists:**
   - Check `server/src/routes/simulation.routes.js`
   - Ensure route defined

2. **Check route registration:**
   ```javascript
   // In server/src/index.js
   app.use('/api', simulationRouter);
   ```

3. **Check URL in frontend:**
   - Must match backend route
   - Include `/api` prefix

### Issue: "500 Internal Server Error"
**Solutions:**
1. **Check server logs for exact error**
2. **Verify database connection**
3. **Check controller logic**
4. **Ensure all fields provided**

---

## 📊 Simulation Issues

### Issue: "Simulation not starting"
**Symptoms:**
- Click button, nothing happens
- No data updates

**Solutions:**
1. **Check browser console for errors**
2. **Verify state updates:**
   - `isSimulating` should be true
   - Check React DevTools

3. **Check interval creation:**
   - Verify `setInterval` called
   - Check `simulationInterval.current`

### Issue: "Simulation won't stop"
**Solutions:**
1. **Click stop button**
2. **Refresh page if needed**
3. **Check `clearInterval` called**

### Issue: "Data not saving to database"
**Symptoms:**
- Simulation runs but no data in Analytics
- Console shows save errors

**Solutions:**
1. **Check network tab:**
   - See if POST request sent
   - Check response status

2. **Verify MongoDB connection**
3. **Check request payload:**
   - All required fields present
   - Correct data types

---

## 🎨 Styling Issues

### Issue: "Dark theme not applied"
**Solutions:**
1. **Clear browser cache**
2. **Hard refresh:**
   ```
   Ctrl + F5
   ```
3. **Check App.css imported:**
   ```javascript
   import './App.css';
   ```

### Issue: "Sidebar not showing"
**Solutions:**
1. **Check `sidebarOpen` state**
2. **Click toggle button (☰)**
3. **Check CSS classes applied**

---

## 🔍 Debugging Tips

### General Debugging Process
1. **Check browser console first**
2. **Check network tab for API calls**
3. **Check server terminal for logs**
4. **Check MongoDB Compass for data**
5. **Use React DevTools for state**

### Useful Commands
```bash
# Check running processes on port
netstat -ano | findstr :5000

# Check MongoDB status
net start MongoDB

# View all npm packages
npm list

# Clear npm cache
npm cache clean --force

# Check Node version
node --version

# Check npm version
npm --version
```

### Browser DevTools
```
F12              - Open DevTools
Ctrl + Shift + C - Inspect Element
Ctrl + Shift + I - Console
Ctrl + Shift + J - Console (Chrome)
```

---

## 🆘 Still Having Issues?

### Steps to Take:
1. **Stop all servers**
2. **Close all terminals**
3. **Restart MongoDB**
4. **Clear node_modules:**
   ```bash
   # Backend
   cd server
   rm -rf node_modules package-lock.json
   npm install
   
   # Frontend
   cd ../client
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```
5. **Start fresh:**
   ```bash
   # Terminal 1
   cd server
   npm run dev
   
   # Terminal 2
   cd client
   npm run dev
   ```

### Check Prerequisites:
- ✅ Node.js v18+ installed
- ✅ MongoDB installed and running
- ✅ Ports 5000 and 5173 available
- ✅ Internet connection (for first install)

### Common Error Messages:

**"Cannot find module"**
→ Run `npm install`

**"ECONNREFUSED"**
→ MongoDB not running

**"EADDRINUSE"**
→ Port already in use

**"peer dep"**
→ Use `--legacy-peer-deps`

**"Cannot read property of undefined"**
→ Check data exists before accessing

**"CORS error"**
→ Backend not running or wrong URL

---

## 📞 Support Resources

### Documentation Files:
- `README.md` - Full documentation
- `QUICKSTART.md` - Quick start guide
- `PROJECT_SUMMARY.md` - Technical details
- `FEATURES_CHECKLIST.md` - Feature list

### Online Resources:
- MongoDB Docs: https://docs.mongodb.com
- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- Recharts Docs: https://recharts.org

---

## ✅ Quick Health Check

Run this checklist:
- [ ] MongoDB running (check Compass)
- [ ] Backend running (check http://localhost:5000)
- [ ] Frontend running (check http://localhost:5173)
- [ ] No console errors
- [ ] Can navigate between pages
- [ ] Can start/stop simulations
- [ ] Data saves to database
- [ ] Charts render properly

If all checked ✅ → System is healthy!

---

*Most issues can be resolved by restarting services and clearing cache.*
