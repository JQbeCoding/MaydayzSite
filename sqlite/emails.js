import "dotenv/config";
import nodemailer from "nodemailer";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

async function sendEmail() {
  const db = await open({
    filename: "customers.db",
    driver: sqlite3.Database,
  });

  try {
    const rows = await db.all("SELECT email FROM customers");

    if (rows.length === 0) {
      console.error("No customers found in the database.");
      return;
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (let row of rows) {
      let recipientEmail = row.email;
      if (!recipientEmail) {
        console.warn("Skipping empty email entry.");
        continue;
      }

      console.log("Sending email to:", recipientEmail);

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: "SMOKED MAIL",
        html: `
          <html>
          <body>
            <h1 style="text-align: center">MAYDAYZ FAMILY</h1>
            <h2 style="text-align: center">Welcome to the Smoked Out mail</h2>
            <p style="text-align: center">
              This email service will be the hub for menus,<br />
              updates, and even <strong>EXCLUSIVE</strong> deals.<br />
              We are going to have a lot of fun. As always.<br />
              <strong style="font-size: larger">WE SMOKED OUT!!!</strong>
            </p>
            <img
              src="cid:maydayzlogo"
              height="100px"
              width="100px"
              style="display: block; margin: 0 auto"
            />
          </body>
          </html>
        `,
        attachments: [
          {
            filename: "MaydayzLogo.png",
            path: path.resolve(
              "/src/css/assets/Images/Maydayz (64 x 64 px) (Logo).png"
            ),
            cid: "maydayzlogo",
          },
        ],
      };

      let info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await db.close();
  }
}

sendEmail();
