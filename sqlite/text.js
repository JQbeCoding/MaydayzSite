const twilio = require("twilio");
const Database = require("better-sqlite3");

const sid = XXx;
const atoken = XXX;
const number = +19804998399;

const client = twilio(sid, atoken);
const db = new Database("customers.db");

const customers = db.prepare("SELECT phoneNumber FROM customers").all();

customers.forEach((customer) => {
  const phoneNumber = customer.phoneNumber;

  client.messages
    .create({
      body: "TESTING MAYDAYZ SMOKED OUT",
      from: number,
      to: phoneNumber,
      mediaUrl: "",
    })
    .then((message) =>
      console.log(`Message sent to ${phoneNumber}, SID: ${message.sid}`)
    )
    .catch((error) =>
      console.error(`Failed to send message to ${phoneNumber}:`, error)
    );
});

db.close();
