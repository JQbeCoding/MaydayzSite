const fetch = require("node-fetch"); // For making API requests
const apiUrl = "https://cjqnosg2nz.g2.sqlite.cloud/customers.db/sql"; // SQLiteCloud endpoint
const apiKey = "xMdfW5sibP7SLHy2bvrdFJkjU3gI5iJnmMnqAa0tZUc;"; // Your SQLiteCloud API key
const databaseName = "customers.db"; // Your SQLiteCloud database name

// Create the 'customers' table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL, 
    phoneNumber TEXT NOT NULL UNIQUE, 
    email TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

async function createTable() {
  const url = `${apiUrl}/${databaseName}/sql`;
  console.log("Request URL:", url); // Debugging: Print the request URL

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql: createTableQuery }),
  });

  const data = await response.json();
  console.log("Create Table Response:", data); // Debugging: Log the response
  if (data.error) {
    console.error("Error creating table:", data.error);
  } else {
    console.log("Table created or already exists.");
  }
}

// Insert customer data into the 'customers' table
async function insertCustomer(name, phoneNumber, email) {
  const insertQuery = `
    INSERT INTO customers(name, phoneNumber, email) 
    VALUES('${name}', '${phoneNumber}', '${email}')
  `;

  const url = `${apiUrl}/${databaseName}/sql`;
  console.log("Request URL:", url); // Debugging: Print the request URL

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql: insertQuery }),
  });

  const data = await response.json();
  console.log("Insert Customer Response:", data); // Debugging: Log the response
  if (data.error) {
    console.error("Error inserting data:", data.error);
  } else {
    console.log("Customer added successfully!");
  }
}

// Retrieve customer data from the database
async function getCustomers() {
  const selectQuery = "SELECT * FROM customers";

  const url = `${apiUrl}/${databaseName}/sql`;
  console.log("Request URL:", url); // Debugging: Print the request URL

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql: selectQuery }),
  });

  const data = await response.json();
  console.log("Get Customers Response:", data); // Debugging: Log the response
  if (data.error) {
    console.error("Error retrieving data:", data.error);
  } else {
    console.log("Customers:", data.rows);
  }
}

// Create the table and insert some customer data
async function run() {
  await createTable();

  const customers = [
    { name: "John Doe", phoneNumber: "1234567890", email: "john@example.com" },
    {
      name: "Jane Smith",
      phoneNumber: "9876543210",
      email: "jane@example.com",
    },
  ];

  for (const customer of customers) {
    await insertCustomer(customer.name, customer.phoneNumber, customer.email);
  }

  await getCustomers();
}

run();
