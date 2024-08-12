import express from 'npm:express@4.18.2';
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("User SIGNUP function is running");

const app = express();
app.use(express.json());
const port = 3000;


app.use(async (req, res) => {
  const {email, password} = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      return res.status(500).send({ error: error.message });
    }

    res.status(200).json({ message: `User with email ${email} signedIn successfully` });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

