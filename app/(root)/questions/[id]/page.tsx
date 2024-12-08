import React from "react";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;

  return <div>Question Page: {id}</div>;
};

export default Page;
