const fs = require("fs");
const https = require("https");
const http = require("http");
const express = require("express");
const path = require("path");
require("dotenv").config();

const routers = require("./routers");
const { getWss, wssOn } = require("./socket");

// 1. Read SSL certificate and key.
const SSL_KEY_PATH = path.join(__dirname, "certs", "server.key");
const SSL_CERT_PATH = path.join(__dirname, "certs", "server.crt");

let privateKey, certificate, ca;
try {
  privateKey = fs.readFileSync(SSL_KEY_PATH, "utf8");
  certificate = fs.readFileSync(SSL_CERT_PATH, "utf8");
  
  // If you have a CA chain file, include it
  // ca = fs.readFileSync(path.join(__dirname, "certs", "chain.pem"), "utf8");
} catch (err) {
  console.error("Error reading SSL certificate files:", err);
  process.exit(1);
}

const credentials = {
  key: privateKey,
  cert: certificate,
  // ca: ca, // Uncomment if you have a CA chain file
};

// 2. Create the Express app
const app = express();
const httpsPort = process.env.HTTPS_PORT;
const httpPort = process.env.HTTP_PORT;

// 3. Middleware
app.use(express.json());
app.use(express.static("public"));

// 4. Routes
app.use(routers);

// 5. Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// 6. Start HTTPS server
httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server running at https://localhost:${httpsPort}`);
});

// 7. Setup WebSocket on the HTTPS server
const wss = getWss(httpsServer);
wss.on("connection", (ws, request) => {
  if (request.url === "/ws") {
    console.log("WebSocket connection established at /ws");
    wssOn(ws);
  } else {
    console.log(`Invalid WebSocket request URL: ${request.url}`);
    ws.close();
  }
});

// 8. Create and start HTTP server for redirection
const httpApp = express();
httpApp.use("*", (req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});

http.createServer(httpApp).listen(httpPort, () => {
  console.log(`HTTP Server running on port ${httpPort}, redirecting to HTTPS`);
});
