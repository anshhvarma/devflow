"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constant";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  isMobileNav?: boolean;
  userId?: string;
}

const NavLinks = ({ isMobileNav = false, userId }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        // Handle profile route
        let currentRoute = item.route;
        if (item.route === "/profile") {
          if (userId) {
            currentRoute = `${item.route}/${userId}`;
          } else {
            // Don't render profile link if user is not logged in
            return null;
          }
        }

        const LinkComponent = (
          <Link
            href={currentRoute}
            key={item.label}
            className={cn(
              "flex items-center justify-start gap-4 bg-transparent p-4 rounded-lg transition-all duration-200",
              isActive
                ? "primary-gradient text-light-900"
                : "text-dark300_light900 hover:bg-light-800 dark:hover:bg-dark-300"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
