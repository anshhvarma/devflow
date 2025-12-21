import Link from "next/link";
import React from "react";

import LocalSearch from "@/components/search/local-search";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constant/route";
import HomeFilters from "@/components/filters/home-filter";
import QuestionCards from "@/components/cards/question-card";

const question = [
  {
    _id: "1",
    title: "What is the best way to learn React?",
    description: "What is the best way to learn React?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740&q=80",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("12/21/2025"),
    answer: 0,
  },
  {
    _id: "2",
    title: "What is javascript?",
    description: "What is the best way to learn React?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
      { _id: "3", name: "typescript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740&q=80",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
    answer: 0,
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const FilteredQuestion = question.filter((q) => {
    const matchesQuery = q.title.toLowerCase().includes(query?.toLowerCase());
    const matchesFilter =
      filter === "" || q.title.toLowerCase().includes(filter.toLowerCase());
    return matchesQuery && matchesFilter;
  });
  return (
    <>
      <section className="flex w-full flex-col-reverse gap-4 justify-between sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900"> All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 text-light-900!"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question ?</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Seach Questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-5">
        {FilteredQuestion.map((question) => (
          <QuestionCards key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
