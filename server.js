//SERVER SET UP

//import http
const http = require('http');

//import the app
const app = require('./app');

//set the port, if it didn't get port number from the evironment (server I deployed), set the port number 3000 as a default
const port = process.env.PORT || 3000;

//set server's listener
const server = http.createServer(app);
server.listen(port);