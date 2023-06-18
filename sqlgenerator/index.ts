import express, {Application, Request, Response} from 'express';
import cors from "cors";
import {Configuration, OpenAIApi} from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT: number = 8000;

const configuration = new Configuration({
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(configuration);

app.post("/completions", async (req: Request, res: Response) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: "Create a SQL request to" + req.body.message
                }]
        });
        // const completion = {
        //     "id": "chatcmpl-6viHI5cWjA8QWbeeRtZFBnYMl1EKV",
        //     "object": "chat.completion",
        //     "created": 1679212920,
        //     "model": "gpt-4-0314",
        //     "usage": {
        //         "prompt_tokens": 21,
        //         "completion_tokens": 5,
        //         "total_tokens": 26
        //     },
        //     "choices": [
        //         {
        //             "message": {
        //                 "role": "assistant",
        //                 "content": "GPT-4 response returned here"
        //             },
        //             "finish_reason": "stop",
        //             "index": 0
        //         }
        //     ]
        // }

        res.send(completion.data.choices[0].message)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));