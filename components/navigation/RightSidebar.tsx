import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";
import { getHotQuestions } from "@/lib/actions/question.action";

import TagCard from "../cards/TagCard";
import DataRenderer from "../DataRenderer";

const popularTags = [
  {
    _id: "1",
    name: "js",
    questions: 125,
  },
  {
    _id: "2",
    name: "react",
    questions: 105,
  },
  {
    _id: "5",
    name: "nodejs",
    questions: 98,
  },
  {
    _id: "3",
    name: "next",
    questions: 75,
  },
  {
    _id: "4",
    name: "mongodb",
    questions: 32,
  },
];

const RightSidebar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <DataRenderer
          data={hotQuestions}
          empty={{
            title: "No Hot Questions",
            message: "There are no hot questions yet",
          }}
          success={success}
          error={error}
          render={(hotQuestions) => (
            <div className="mt-7 flex w-full flex-col gap-[30px]">
              {hotQuestions?.map((question) => (
                <Link
                  href={ROUTES.QUESTION(question._id)}
                  key={question._id}
                  className="flex cursor-pointer items-center justify-between gap-7"
                >
                  <p className="body-medium text-dark500_light700 line-clamp-2">
                    {question.title}
                  </p>

                  <Image
                    src="/icons/chevron-right.svg"
                    alt="Chevron right icon"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        />
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <TagCard
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              questions={tag.questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
