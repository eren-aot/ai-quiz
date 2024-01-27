import { NextResponse } from "next/server";
import { getQuestionsSchema } from "@/schemas/questions";
import { ZodError } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {

    try {

        const body = await request.json();
        const { amount, topic, type } = getQuestionsSchema.parse(body);

        console.log(body)

        let questions: any;

        if (type === "open_ended") {
            questions = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                    content: "You are a helpful AI that is able to generate a pair of fill in the blank questions and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
                },
                { role: "user", content: `Provide ${amount} fill in the blank questions on topic of ${topic} with answer for each question` },
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: { type: "json_object" },
        });
        console.log(questions.choices[0].message.content);

        }else if(type === "mcq"){

            questions = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                    content: "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
                },
                { role: "user", content: `Provide ${amount} mcq questions on topic of ${topic} with answer and four option for each question ` },
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: { type: "json_object" },
        });
        console.log(questions.choices[0].message.content);
        }

        return NextResponse.json({ questions: questions.choices[0].message.content, message: "Questions generated successfully" }, { status: 200 });


    } catch (error) {

        console.log("ERROR GENERATION QUESTIONS", error);

        return NextResponse.json({ message: "Error generation questions" }, { status: 500 });
    }
}

export async function GET() {

    return NextResponse.json({ message: "Hello World" }, { status: 200 });
}