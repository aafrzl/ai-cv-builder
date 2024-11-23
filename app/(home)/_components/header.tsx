"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { Fragment } from "react";
import Link from "next/link";

export default function Header() {
  const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();

  return (
    <nav className="shadow-sm w-full sticky top-0 bg-background z-[9]">
      <div className="w-full mx-auto max-w-7xl py-2 px-5 flex items-center justify-between">
        <div className="flex items-center flex-1 gap-10">
          <Link
            href="/"
            className="font-black text-lg text-primary"
          >
            CVForgeAI
          </Link>
          {isLoading && <Skeleton className="w-24 h-6 rounded-xl" />}
          {isAuthenticated && user && (
            <div className="flex items-center gap-2">
              <span className="font-normal text-muted-foreground">Hi,</span>
              <p className="font-semibold">
                {user.given_name} {user.family_name}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isLoading || error ? (
            <Skeleton className="w-14 h-10 rounded-xl" />
          ) : (
            <Fragment>
              <DropdownMenu>
                <DropdownMenuTrigger role="button">
                  <div className="flex items-center gap-2 p-2 border rounded-lg shadow-sm">
                    <Avatar>
                      <AvatarImage
                        src={user?.picture || ""}
                        alt={user?.given_name + "Picture Profile" || ""}
                      />
                      <AvatarFallback className="cursor-pointer">
                        {user?.given_name?.charAt(0).toUpperCase()}
                        {user?.family_name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="size-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="my-2">
                  <DropdownMenuItem
                    asChild
                    className="text-destructive cursor-pointer font-medium"
                  >
                    <LogoutLink>
                      <LogOut className="size-4 mr-2" />
                      Logout
                    </LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}
