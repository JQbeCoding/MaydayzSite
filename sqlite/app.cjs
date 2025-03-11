const WebSocket = require("ws"); // WebSocket library
const express = require("express"); // Express framework

const app = express();
const port = 3000;

// WebSocket connection string for SQLite Cloud
const ws = new WebSocket("wss://cjqnosg2nz.g2.sqlite.cloud:4000");

// Handle WebSocket open connection
ws.on("open", () => {
  console.log("Connected to SQLite Cloud");
});

// Handle incoming messages from WebSocket (SQLite Cloud responses)
ws.on("message", (data) => {
  console.log("Received:", data);
});

// Middleware to handle JSON requests
app.use(express.json());

// Sample route for signing up
app.post("/signup", (req, res) => {
  const { name, email, phoneNumber } = req.body;

  // SQL query to insert user data
  const query = `INSERT INTO users (name, email, phoneNumber) VALUES ('${name}', '${email}', '${phoneNumber}')`;

  // Send query to SQLite Cloud via WebSocket
  ws.send(JSON.stringify({ action: "query", sql: query }));

  // Respond to the client
  ws.on("message", (response) => {
    const responseData = JSON.parse(response);
    if (responseData.error) {
      res.status(500).json({ error: responseData.error });
    } else {
      res.status(200).json({ message: "Signup successful!" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
