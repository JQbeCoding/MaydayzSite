import express from 'express';
import Database from 'better-sqlite3';
import { hash } from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'MaydayzSite' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..')));

const db = new Database('customers.db');

app.post('/signup', (req, res) => {
  const { name, phoneNumber, email } = req.body;

  try {
    const insertStmt = db.prepare(
      'INSERT INTO customers (name, phoneNumber, email) VALUES (?, ?, ?)'
    );
    insertStmt.run(name, phoneNumber, email);
    console.log('Name: ', name);
    console.log('Number: ', phoneNumber);
    console.log('Email', email);

    res.send('Signup successful!');
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(400).send('Phone number or email already in use.');
    } else {
      console.error(error);
      res.status(500).send('An error occurred.');
    }
  }
});

app.get('/', (req, res) => {
  const __filename = fileURLToPath(import.meta.url); 
  const __dirname = path.dirname(__filename); 
  res.sendFile(path.join(__dirname, '..', 'login.html')); 
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});