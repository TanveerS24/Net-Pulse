const homeController = (req, res) => {
  res.json({ 
    message: 'Welcome to Load Sphere API - Probabilistic Analysis System',
    version: '1.0.0',
    endpoints: {
      traffic: '/api/traffic',
      server: '/api/server'
    }
  });
};

module.exports = homeController;