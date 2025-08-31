import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constant/route";

import NavLinks from "./nav-links";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 p-5 w-80"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <Link href="/" className="flex items-center gap-1 mb-8">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevFlow Logo"
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-120px)] flex-col justify-between overflow-y-auto">
          <section className="flex h-full flex-col gap-2 pt-4">
            <NavLinks isMobileNav userId={userId} />
          </section>

          <div className="flex flex-col gap-3 pt-4 border-t border-light-800 dark:border-dark-300">
            {userId ? (
              <SheetClose asChild>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button
                    type="submit"
                    className="base-medium w-full !bg-transparent px-4 py-3 hover:bg-light-800 dark:hover:bg-dark-300 transition-colors"
                  >
                    <LogOut className="size-5 text-black dark:text-white mr-2" />
                    <span className="text-dark300_light900">Logout</span>
                  </Button>
                </form>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN} className="w-full">
                    <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none border-none">
                      <span className="primary-text-gradient">Log In</span>
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP} className="w-full">
                    <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
