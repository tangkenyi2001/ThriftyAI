import express from "express";
import cors from "cors";
import { OpenAI} from "openai";
import {config} from "dotenv";

config();
const app=express();


const PORT = process.env.PORT || 5000;
//uses urlencoding
app.use(express.urlencoded({ extended: false}));
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server Listening on PORT: ${PORT}`);
});

const openai = new OpenAI();

app.post('/chatgpt', async (request, response) => { // Mark the callback as async
    const text = request.body.text;
    try {
        const responseData = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: text }],
        });
        response.set("Content-Type", "application/json");
        response.json(responseData.choices[0].message);
    } catch (error) {
        response.status(500).json({ error: error.message }); // Handle any errors
    }
});


export default app; 