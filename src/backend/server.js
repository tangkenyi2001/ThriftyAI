import express from "express";
import cors from "cors";
import {OpenAI} from "openai";
import {config} from "dotenv";
import connectDB from "./database.js";
import Entry from "../models/entry.js";
import PDFDocument from 'pdfkit';

config();
const app=express();

connectDB();
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

        // Prepare the response data to send
        const replyMessage = responseData.choices[0].message;

        // Create a new database entry
        const entry = new Entry({
            request: request.body.text,
            response: replyMessage.content,
        });

        // Save to the database
        await entry.save();
        console.log('Entry saved to db', entry);

        // Send the response to the client
        response.json(replyMessage);
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        response.status(500).json({ error: error.message }); // Handle any errors
    }
    }
);
app.get('/generatepdf', async (req, res) => {
    try {
        const entries = await Entry.find();  // Fetch entries from the database

        // Create a new PDF Document
        const doc = new PDFDocument();

        // Pipe the document to a response to download the file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=entries.pdf');
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(25).text('Entries from Database', {
            align: 'center',
        });

        entries.forEach((entry, index) => {
            doc.fontSize(12).text(`Entry ${index + 1}:`);
            doc.fontSize(10).text(`Request: ${entry.request}`);
            doc.fontSize(10).text(`Response: ${entry.response}`);
            doc.moveDown();
        });

        // End and send the PDF
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating PDF');
    }
});

app.get('/loadhistory', async (request, response) => {
    try {
        const entries = await Entry.find().sort({createdAt:-1}); // Fetch all entries from the database
        response.json(entries); // Send the entries back as a JSON response
    } catch (error) {
        console.error('Error fetching history:', error);
        response.status(500).json({ error: 'Error fetching history' });
    }
});
app.delete('/resetdb', async (request, response) => {
    try {
        await Entry.deleteMany({}); // Delete all entries from the Entry collection
        response.json({ message: 'Database cleared successfully' }); // Send success message
    } catch (error) {
        console.error('Error clearing database:', error);
        response.status(500).json({ error: 'Error clearing database' }); // Handle any errors
    }
});


export default app; 