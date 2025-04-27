const {createClient} = require("@supabase/supabase-js")


const supabaseUrl= 'https://lnbxakeubsuohsdfmbuy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuYnhha2V1YnN1b2hzZGZtYnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDA3MDAsImV4cCI6MjA2MDgxNjcwMH0.ovnoRVrAzeMLPsTKLyhKOgClV0lq_rHcgKq9OQPoK3k';
const supabase= createClient(supabaseUrl , supabaseKey)

async function uploadBase64toImage(base64Data) {
  try {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}`;

    const buffer = Buffer.from(base64Data, "base64");

    const { data, error } = await supabase.storage
      .from("kalpanachitra")
      .upload(`public/${fileName}.png`, buffer, {
        contentType: "image/png",
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      throw error;
    }

    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${data.path}`; // use `path`, not `fullPath`

    return imageUrl;
  } catch (error) {
    console.error("Upload Error:", error.message);
    throw error;
  }
}

module.exports = {
    uploadBase64toImage
}
