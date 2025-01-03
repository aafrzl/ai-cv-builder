import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-card">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Link
              href={"https://github.com/aafrzl/ai-cv-builder"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-colors text-primary hover:text-primary/50 hover:underline font-medium"
            >
              <Github className="size-5 mr-2" />
              <span>Open Source on Github</span>
            </Link>
          </div>
          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} CVForgeAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
