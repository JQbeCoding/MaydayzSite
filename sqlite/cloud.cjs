const sqlite3 = require("sqlite3").verbose();

// Define the setupDatabase function to initialize the database
function setupDatabase() {
  const db = new sqlite3.Database("./customers.db", (err) => {
    if (err) {
      console.error("Failed to connect to the database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  });
  return db;
}

const db = setupDatabase();

// Example query to fetch data from the database
db.all("SELECT * FROM customers", (err, rows) => {
  if (err) {
    console.error("Error querying database:", err.message);
  } else {
    console.log("Fetched rows:", rows);
  }
});

// Example of inserting data into the database
const insertQuery = `INSERT INTO customers (name, phoneNumber, email)
                     VALUES (?, ?, ?)`;

// Insert some sample data
db.run(
  insertQuery,
  ["DaQuis May", "17049675407", "Daquismay2004@gmail.com"],
  function (err) {
    if (err) {
      console.error("Error inserting data:", err.message);
    } else {
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  }
);

// Example of closing the database after operations are complete
db.close((err) => {
  if (err) {
    console.error("Error closing the database:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});
