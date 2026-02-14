require('dotenv').config();
const app = require('./app');
const serverRouter = require('./routes/server.routes');
const simulationRouter = require('./routes/simulation.routes');

// Routes
app.use('/', serverRouter);
app.use('/api', simulationRouter);

const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();