"use client";

import { Github, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Navbar() {
  return (
    <nav className="shadow-sm w-full sticky top-0 bg-white z-50">
      <div className="w-full flex items-center justify-center h-auto bg-gradient-to-r from-primary to-blue-500">
        <div className="max-w-7xl w-full mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <p className="text-white text-sm text-center">
            This project is {""}
            <b>Open Source</b> on{" "}
            <a
              href="#"
              className="inline-flex items-center gap-1 font-bold underline hover:text-blue-200"
            >
              <span className="shrink-0">Github</span>
              <Github className="size-4" />
            </a>
          </p>
        </div>
      </div>
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href={"/"}
              className="flex-shrink-0"
            >
              <h1 className="font-black text-xl sm:text-2xl text-primary">
                CVForgeAI
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              size={"sm"}
              asChild
            >
              <LoginLink>
                <LogIn className="size-4" />
                Sign in
              </LoginLink>
            </Button>
            <Button
              size={"sm"}
              asChild
              variant={"secondary"}
            >
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
