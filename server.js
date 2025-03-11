const express = require('express');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
console.log('url: ', process.env.SUPABASE_URL);
console.log('key:', process.env.SUPABASE_KEY);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname)));


app.post('/signup', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('MaydayzCustomers')
      .insert([req.body]);
      console.log(data);

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