import Database from "better-sqlite3";
const db = new Database("customers.db");

const query = `
CREATE TABLE IF NOT EXISTS customers (
   id  INTEGER PRIMARY KEY, 
   name TEXT NOT NULL,
   phoneNumber INTEGER NOT NULL UNIQUE,
    email TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.exec(query);

const data = [
  {
    name: "JaQuis May",
    phoneNumber: 7049675408,
    email: "jaquismay2004@gmail.com",
  },
];

const insertData = db.prepare(
  "INSERT INTO customers(name, phoneNumber, email) VALUES(?, ?, ?)"
);

data.forEach((customer) => {
  insertData.run(customer.name, customer.phoneNumber, customer.email);
});

db.close();
