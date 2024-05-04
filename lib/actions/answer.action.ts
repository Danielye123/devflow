"use server";

import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();

    const { question, content, author, path } = params;
    const newAnswer = new Answer({ content, author, question });

    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: add interaction...Jerma Streams - GeoGuessr (Part 4) [with Ster
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//comment
export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
        .populate("author", "_id clerkId name picture")
        .sort({ createdAT: -1 })

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
