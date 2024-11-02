import Link from "next/link";

import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    _id: "1",
    title: "What is the best programming language?",
    tags: [
      {
        _id: "1",
        name: "Javascript",
      },

      {
        _id: "2",
        name: "Python",
      },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2024-10-25"),
  },

  {
    _id: "2",
    title: "What is the best programming language?",
    tags: [
      {
        _id: "1",
        name: "Javascript",
      },
      {
        _id: "2",
        name: "Python",
      },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2024-10-25"),
  },

  {
    _id: "3",
    title: "What is the best programming language?",
    tags: [
      {
        _id: "1",
        name: "Javascript",
      },
      {
        _id: "2",
        name: "Python",
      },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2024-10-25"),
  },
];

async function Home() {
  const session = await auth();
  console.log("SESSION", session);

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION} className="max-sm:w-full">
            Ask a Question
          </Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          iconPosition="left"
          otherClasses="flex-1"
        />
      </section>

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
}

export default Home;
