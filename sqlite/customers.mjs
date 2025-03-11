import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.SUPABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function migrateData() {
  try {
    await client.connect();

    // Create the customers table
    await client.query(`
            CREATE TABLE IF NOT EXISTS customers (
                id SERIAL PRIMARY KEY, 
                name TEXT NOT NULL,
                phoneNumber TEXT NOT NULL UNIQUE,
                email TEXT, 
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    // Example data (replace with your actual data if needed)
    const data = [
      {
        name: "John Doe",
        phoneNumber: "+15551234567",
        email: "john.doe@example.com",
      },
      {
        name: "Jane Smith",
        phoneNumber: "+15559876543",
        email: "jane.smith@example.com",
      },
    ];

    // Insert data into the customers table
    for (const customer of data) {
      await client.query(
        "INSERT INTO customers(name, phoneNumber, email) VALUES($1, $2, $3) ON CONFLICT (phoneNumber) DO NOTHING",
        [customer.name, customer.phoneNumber, customer.email]
      );
    }

    // Retrieve and log all customers
    const result = await client.query("SELECT * FROM customers");
    console.log(result.rows);
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    await client.end();
  }
}

migrateData();
