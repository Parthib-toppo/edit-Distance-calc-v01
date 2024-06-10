const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Set up OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Make sure to set your API key in the environment variable
});

app.post('/rewrite', async (req, res) => {
    const inputText = req.body.text;

    try {
        // Call OpenAI to rewrite the text
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-0125',
            prompt: `Rewrite the following text: "${inputText}"`,
            max_tokens: 150
        });

        const rewrittenText = response.data.choices[0].text.trim();
        const distance = levenshtein.get(inputText, rewrittenText);

        res.json({ rewrittenText, distance });
    } catch (error) {
        console.error('Error interacting with OpenAI API:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
