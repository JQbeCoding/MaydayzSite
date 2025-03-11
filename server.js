const express = require('express');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

// Load environment variables from .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = process.env.PORT || 3000; // Use environment PORT or 3000

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for your Netlify domain
const corsOptions = {
  origin: 'https://superb-dango-5693f1.netlify.app/' // Replace with your actual Netlify domain
};
app.use(cors(corsOptions));

// Handle the /signup POST request
app.post('/signup', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Customers') // Replace 'Customers' with your actual Supabase table name
      .insert([req.body]);

    if (error) {
      console.error('Supabase error during signup:', error);
      return res.status(500).send(error.message);
    }

    console.log('Signup successful!', data);
    res.send('Signup successful!');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('An error occurred during signup.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});