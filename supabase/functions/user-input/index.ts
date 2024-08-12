import { createClient } from "jsr:@supabase/supabase-js@2";
import express from "npm:express@4.18.2";

console.log("user-input function is running");

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
    const { username } = req.body;

    if (!username) {
      return res.status(400).send({ error: "username is required" });
    }

    const { data, error } = await supabaseClient
      .from("first_table")
      .insert({ username });

    if (error) {
      return res.status(500).send({ error: error.message });
    }

    res.status(200).send(`Hello ${username}!`);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});