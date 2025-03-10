
import "dotenv/config";
import nodemailer from "nodemailer";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function sendEmail() {
  // Open the SQLite database
  const db = await open({
    filename: "customers.db",
    driver: sqlite3.Database,
  });

  try {
    // Retrieve all customer emails
    const rows = await db.all("SELECT email FROM customers");

    if (rows.length === 0) {
      console.error("No customers found in the database.");
      return;
    }

    // Loop through the rows to send email to each customer
    for (let row of rows) {
      let recipientEmail = row.email;
      console.log("Sending email to:", recipientEmail);

      // Create the email transporter
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email options
      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail, // Retrieved from database
        subject: "WE SMOKED OUT",
        html: "<h1>We’ve got some delicious BBQ ready for you!</h1>", // Add HTML content here
      };

      // Send the email
      let info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await db.close(); // Close the database connection
  }
}

// Call the function
sendEmail();
