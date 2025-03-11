const express = require('express');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

dotenv.config();
const supabase = createClient('https://iacgeepjpcpfwyewaeyo.supabase.co',process.env.SUPABASE_KEY);
console.log('Key: ', process.env.SUPABASE_KEY);

const app = express();
const port = process.env.PORT || 3000; // Use environment PORT or 3000

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' folder

app.post('/signup', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Customers')
      .insert([req.body]);

    if (error) {
      console.error('Supabase error during signup:', error);
      return res.status(500).send(error.message);
    }

    res.send('Signup successful!');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('An error occurred during signup.');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});