//Sends emails to the users within the database using node mailer
import "dotenv/config";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import path from "path";

//Creating a client for the superbase database
const supabase = createClient('https://iacgeepjpcpfwyewaeyo.supabase.co',process.env.SUPABASE_KEY);

/**
 * Sends an email to all the non-null email customers in the database.
 * @returns an info response detailing if the email was sent or not.
 */
async function sendEmail() {
  //Sends a request to the supabase database
  try {
    const { data: customers, error } = await supabase
      .from("MaydayzCustomers")
      .select("email");

    //Sends an error via terminal and terminates the program.
    if (error) {
      console.error("Supabase error fetching customers:", error);
      return;
    }

    //If database is empty then the message is sent within the terminal 
    if (customers.length === 0) {
      console.error("No customers found in the database.");
      return;
    }

    //Creating an email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        //Reads the .env file for the email and password for security
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //Iterates through every customer within the database of customers and 
    //sends all of them the smoked out message.
    for (let customer of customers) {
      let recipientEmail = customer.email;
      //If the user doesn't have an email, we skip them.
      if (!recipientEmail) {
        console.warn("Skipping empty email entry.");
        continue;
      }

      //Sends a message to the terminal 
      console.log("Sending email to:", recipientEmail);

      //Retreives the email from .env and sends the content of the email
      //out to the Maydayz Family.
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
              "Maydayz (64 x 64 px) (Logo).png"
            ),
            cid: "maydayzlogo",
          },
        ],
      };
      //Retreieves confrimation and displays it within the terminal.
      let info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    }
  } 
  //Catches the error and displays it in the terminal
  catch (error) {
    console.error("Error:", error);
  }
}

sendEmail();