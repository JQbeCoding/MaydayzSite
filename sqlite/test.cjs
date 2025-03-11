const WebSocket = require("ws");
const express = require("express");
const app = express();

// WebSocket connection URL (from SQLite Cloud)
const sqliteCloudUrl = "wss://cjqnosg2nz.g2.sqlite.cloud:4000";

// Create WebSocket client
const wsClient = new WebSocket(sqliteCloudUrl);

wsClient.on("open", function open() {
  console.log("Connected to SQLite Cloud Gateway");
});

wsClient.on("message", function incoming(data) {
  console.log("Received data:", data);
});

wsClient.on("error", function error(error) {
  console.error("WebSocket error:", error);
});

// Example API endpoint to handle form submission (signup)
app.post("/signup", express.json(), (req, res) => {
  const { name, email, phoneNumber } = req.body;

  // Construct your SQL query here
  const query = `INSERT INTO users (name, email, phoneNumber) VALUES ('${name}', '${email}', '${phoneNumber}')`;

  // Send SQL query to SQLite Cloud via WebSocket
  const queryMessage = {
    action: "query",
    sql: query,
  };

  // Send query to SQLite Cloud Gateway via WebSocket
  wsClient.send(JSON.stringify(queryMessage));

  // Listen for response from SQLite Cloud Gateway
  wsClient.on("message", (response) => {
    const responseData = JSON.parse(response);
    if (responseData.error) {
      res.status(500).json({ error: responseData.error });
    } else {
      res.status(200).json({ message: "Signup successful!" });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
