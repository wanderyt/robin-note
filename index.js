const express = require('express');
const app = express();
const path = require('path');
const proxy = require('http-proxy-middleware');

// honor env configuration
const dotenv = require('dotenv');
dotenv.config();

const API_PORT = process.env.API_PORT || 5000;

// proxy setting
app.use(proxy('/api', {
  target: `http://localhost:${API_PORT}/`
}));

// static assets
app.use(express.static('build'));

// main route
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

// app start up
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
