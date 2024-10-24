import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <div className="px-10 pt-[100px]">
      <form
        action={async () => {
          "use server";
          await signOut();

          redirect("/sign-in");
        }}
      >
        <Button type="submit">logout</Button>
      </form>
    </div>
  );
}

export default Home;
