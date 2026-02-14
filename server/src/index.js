import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import serverRouter from './routes/server.routes.js';

app.use('/', serverRouter);
const PORT = process.env.PORT || 3000;


const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();