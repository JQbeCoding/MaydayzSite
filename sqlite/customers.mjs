import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = "https://iacgeepjpcpfwyewaeyo.supabase.co";
const supabaseKey = process.env.SUBAEBASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchCustomers() {
  try {
    let { data: Customers, error } = await supabase
      .from("Customers")
      .select("name, email, phoneNumber");

    if (error) {
      console.error("Error fetching customers:", error);
      return;
    }

    if (Customers) {
      console.log("Customers:", Customers);
      // Process the Customers data here
      Customers.forEach((customer) => {
        console.log(customer.name, customer.email, customer.phoneNumber);
      });
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

fetchCustomers();
