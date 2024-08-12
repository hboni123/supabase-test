import { createClient } from "jsr:@supabase/supabase-js@2";
import express from "npm:express@4.18.2";


console.log("user-upd function is running");

const app = express();
app.use(express.json());
const port = 3000;


app.use(async (req, res) => {

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: {
          Authorization: req.headers["authorization"] || "", // Correct way to access headers
          //Authorization: req.headers.'Authorization')!
        },
      },
    },
  );

  const {id} = req.body;
  const updates = req.body;

  try {
    const { data, error } = await supabaseClient
      .from('first_table') 
      .update(updates)
      .eq('id', id); 

    if (error) {
      return res.status(500).send({ error: error.message });
    }
    res.status(200).json({ message: `User with usernamew ${id} updated successfully` });
  
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});