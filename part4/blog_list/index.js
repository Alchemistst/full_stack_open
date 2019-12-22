const http = require('http');
const app = require('./app');
const config = require('./utils/config');

// App is inizialized
const server = http.createServer(app);

const { PORT } = config;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
