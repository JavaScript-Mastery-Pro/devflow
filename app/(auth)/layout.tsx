import { ReactNode } from "react";

async function AuthLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}

export default AuthLayout;
