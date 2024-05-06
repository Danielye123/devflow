import React from 'react'
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Image from "next/image";
import Link from "next/link";

interface Props {
    questionId: string;
    userId: string;
    totalAnswers: number;
    page?: number;
    filter?: number;
}

const AllAnswers = async ({ questionId, userId, totalAnswers, page, filter}: Props) => {
    const result = await getAnswers({
        questionId
    })
  return (
    <div className="mt-11">
        <div className="flex items-center justify-between">
            <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

            <Filter filters={AnswerFilters} />
        </div>
        <div>
            {result.answers.map((answer) => (
                <article key={answer._id} className="light-border border-b py-10">
                    <div className="flex items-center justify-between">
                        <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                            <Link href={`/profile/${answer.author.clerkId}`} className="flex flex-1 itesm-start gap-1 sm:items-center">
                                <Image 
                                    src={answer.author.picture}
                                    width={18}
                                    height={18}
                                    alt="profile"
                                    className="rounded-full object-cover max-sm:mt-0.5"
                                />
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <p>
                                        {answer.author.name}
                                    </p>
                                    
                                </div>
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    </div>
  )
}

export default AllAnswers