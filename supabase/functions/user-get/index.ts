import { createClient } from "jsr:@supabase/supabase-js@2";
import express from "npm:express@4.18.2";

console.log("user-data function is running");

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

  try {
    const { data, error } = await supabaseClient
      .from("first_table") // Replace 'first_table' with your actual table name
      .select();

    if (error) {
      return res.status(500).send({ error: error.message });
    }

    return res.status(200).json(data );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
