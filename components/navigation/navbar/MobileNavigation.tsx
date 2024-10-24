"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const MobileNavigation = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Image
        src="/icons/hamburger.svg"
        width={36}
        height={36}
        alt="hamburger icon"
        className="invert-colors sm:hidden"
      />
    </SheetTrigger>

    <SheetContent
      side="left"
      className="background-light900_dark200 border-none"
    >
      <SheetTitle className="hidden">Navigation</SheetTitle>

      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="Dev Overflow Logo"
        />

        <p className="h2-bold text-dark100_light900 font-space-grotesk">
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>

      <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
        <SheetClose asChild>
          <NavContent />
        </SheetClose>

        <div className="flex flex-col gap-3">
          <SheetClose asChild>
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span className="primary-text-gradient">Log In</span>
              </Button>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/sign-up">
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                Sign up
              </Button>
            </Link>
          </SheetClose>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

const NavContent = () => {
  const pathname = usePathname();
  const userId = 12345;

  return (
    <section className=" flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === "/profile") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900",
                "flex items-center justify-start gap-4 bg-transparent p-4"
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={cn({ "invert-colors": !isActive })}
              />
              <p className={cn(isActive ? "base-bold" : "base-medium")}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

export default MobileNavigation;
