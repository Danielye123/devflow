import { Button } from "@/components/ui/button";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Link from "next/link";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

const questions = [
  {
    _id: "1",
    title: "Title1",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "authorId1",
      name: "John",
      picture: "authorPictureURL1",
    },
    upvotes: 10,
    views: 100,
    answers: [
      {
        _id: "answer1-1",
        content: "This is a sample answer for question 1.",
        createdAt: new Date("2021-09-02T12:00:00.000Z"),
        author: {
          _id: "answerAuthor1",
          name: "Jane",
          picture: "answerAuthorPictureURL1",
        },
      },
      {
        _id: "answer1-2",
        content: "Another insightful answer for question 1.",
        createdAt: new Date("2021-09-03T12:00:00.000Z"),
        author: {
          _id: "answerAuthor2",
          name: "Doe",
          picture: "answerAuthorPictureURL2",
        },
      },
    ],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "how to center a div?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "authorId2",
      name: "John",
      picture: "authorPictureURL2",
    },
    upvotes: 10,
    views: 100,
    answers: [
      {
        _id: "answer2-1",
        content:
          "Use CSS flexbox for centering a div both vertically and horizontally.",
        createdAt: new Date("2021-09-02T12:00:00.000Z"),
        author: {
          _id: "answerAuthor3",
          name: "Alice",
          picture: "answerAuthorPictureURL3",
        },
      },
      {
        _id: "answer2-2",
        content:
          "Alternatively, CSS grid can also achieve the same effect efficiently.",
        createdAt: new Date("2021-09-03T12:00:00.000Z"),
        author: {
          _id: "answerAuthor4",
          name: "Bob",
          picture: "answerAuthorPictureURL4",
        },
      },
    ],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
];
export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
            discussion. our query could be the next big thing others learn from. Get
            involved! 💡"
            link="/ask-question"
            LinkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
