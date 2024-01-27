import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

export async function POST(req: Request, res: Response) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {

            return NextResponse.json({ error: "You must be logged in !!" }, { status: 401 });
        }

        const body = await req.json();
        const { topic, type, amount } = quizCreationSchema.parse(body);
        const game = await prisma.game.create({
            data: {
                gameType: type,
                timeStarted: new Date(),
                userId: session.user.id,
                topic
            },
        });

        const { data } = await axios.post(
            `${process.env.API_URL}/api/questions`,
            {
                amount,
                topic,
                type,
            }
        );
        console.log(data);
        // Parse the JSON string within the "questions" property
        const parsedQuestions = JSON.parse(data.questions);
        console.log(parsedQuestions)

        // Access the array of questions
        const questionsArray = parsedQuestions.questions;

        // Log the entire array
        console.log(questionsArray);

        if (type === "mcq") {

            type mcqQuestion = {
                question: string;
                answer: string;
                options: string[];
            }
            

            const manyData = questionsArray.map((question: mcqQuestion) => {

                return {
                    question: question.question,
                    answer: question.answer,
                    options: question.options,
                    gameId: game.id,
                    questionType: "mcq"
                }
            });

            await prisma.question.createMany({
                data: manyData,
            });
        } else if (type === "open_ended") {

            type openEndedQuestion = {
                question: string;
                answer: string;
            }
            const manyData = questionsArray.map((question: openEndedQuestion) => {

                return {
                    question: question.question,
                    answer: question.answer,
                    gameId: game.id,
                    questionType: "open_ended"
                }
            });

            await prisma.question.createMany({
                data: manyData,
            });

        }
        return NextResponse.json({ gameId: game.id, message: "Game created successfully !!" }, { status: 200 });

    } catch (error) {

        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        } else {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }

    }
}

