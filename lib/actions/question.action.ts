"use server"

import Question from "@/database/question.model";
import { connectToDatabase } from "./mongoose"
import Tag from "@/database/tags.model";

export async function createQuestion(params: any) {
    // eslint-disable-next-line no-empty
    try {
        connectToDatabase();

        const { title, content, tags, author, path } = params;

        // create the question
        const question = await Question.create({
            title,
            content,
            author,
        })

        const tagDocuments = [];

        // Create the tags or get them if they already exist
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i")}}, 
                { $setOnInsert: { name: tag }, $push: { question: question._id }},
                { upsert: true, new: true }
            )

            tagDocuments.push(existingTag._id);
        }

        // Update the question

        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments }}
        })

        // Create an interaction record for the user's ask_question action

        // Increment author's reputation by +5 points for creating a question
    } catch (error) {
        console.log(error)
    }
}