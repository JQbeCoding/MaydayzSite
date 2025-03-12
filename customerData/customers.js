//Code to check the database information within the terminal
import * as dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js'

//Creating a single superbase client
const supabase = createClient('https://iacgeepjpcpfwyewaeyo.supabase.co',process.env.SUPABASE_KEY);

//Fetching Data from database
let {data: Customers, error} = await supabase
.from('MaydayzCustomers')
.select('*')
if(error){
    console.log('error:' ,error);
}
else{
    console.log('Data: ', Customers)
}