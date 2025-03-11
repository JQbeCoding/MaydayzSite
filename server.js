const express = require('express');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);
console.log(process.env.SUPABASE_URL);
console.log(process.env.SUPABASE_KEY);

const app = express();
const port = process.env.PORT || 3000; // Use environment PORT or 3000

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the project root directory

const corsOptions = {
    origin: [
      'https://superb-dango-5693f1.netlify.app',
      'https://maydayzsite.onrender.com',
      'http://localhost:3000' // Add your local development origin if needed
    ]
  };
  app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

console.log('Directory: ', path.join(__dirname, 'index.html'));

// Handle the /signup POST request
app.post('/signup', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('MaydayzCustomers') // Replace 'MaydayzCustomers' with your actual Supabase table name
            .insert([req.body]);
            console.log('Customer: ',  data);

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