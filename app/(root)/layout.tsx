import { ReactNode } from "react";

import Navbar from "@/components/navigation/navbar";

async function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default Layout;
