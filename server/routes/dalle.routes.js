import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "my openai api key",
});

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E routes" });
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    // console.log(prompt);
    const image = await getImageFromPrompt(prompt);
    res.status(200).json({ image });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
  }
});

async function getImageFromPrompt(prompt) {
  const response = await openai.images.generate({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });
  const image = response.data.data[0].b64_json;
  return image;
}

export default router;
