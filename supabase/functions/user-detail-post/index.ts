import express from 'npm:express@4.18.2';
import { createClient,supabaseCli } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
// import { supabaseCli } from "./init.js";  // Adjust the import path as necessary


const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
const supabase = createClient(supabaseUrl, supabaseKey);


console.log("Edge function is running");

const app = express();
app.use(express.json());
const port = 3000;

app.use( async (req, res) => {
  try {
    const { name, age, city, pincode } = req.body;

    const { data, error } = await supabase
      .from('user_details')
      .insert({ "name":name, "age":age, "city":city, "pincode":pincode });

    if (error) {
      return res.status(500).send({ error: error.message });
    }

    res.status(200).send(`Hello ${name}! Your data has been inserted`);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
