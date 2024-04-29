"use server"

import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/tags.model";
import { CreateAnswerParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
    // eslint-disable-next-line no-empty
    try {
        connectToDatabase();

        const { question, content, author, path } = params;
        const newAnswer = new Answer({ content, author, question });

        // Add the answer to the question's answers array
        await Question.findByIdAndUpdate(question, {
            $push: { answers: newAnswer._id}
        })

        // TODO: add interaction...
        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error;
    }
}

