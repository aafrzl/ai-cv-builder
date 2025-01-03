"use client";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import Safari from "@/components/ui/safari";
import { features, howitworks } from "@/lib/constants";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowRight, ChevronRight, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero section */}
      <section className="hero-section w-full min-h-screen bg-gradient-to-b from-white to-gray-100">
        <div className="w-full flex flex-col items-center justify-center py-20 max-w-6xl mx-auto p-4 sm:px-6 lg:px-8">
          <div className="rounded-full flex items-center font-medium gap-1 text-sm h-auto p-2 px-4 bg-primary/10 text-primary mb-8 max-w-max">
            <div className="p-2 h-5 shrink-0 flex items-center text-xs justify-center text-white bg-primary rounded-full">
              New
            </div>
            Project from Coding with Afrizal
            <ChevronRight className="size-4" />
          </div>

          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4">
              <span>Get dream job with our</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-600 text-transparent bg-clip-text animate-pulse">
                AI-Powered
              </span>{" "}
              resume builder
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-medium text-muted-foreground max-w-3xl">
              Build a professional resume with our free builder, and share it
              with a shareable link. Stand out from the crowd and land your
              dream job.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-fit mb-4">
            <Button
              className="h-14 text-lg font-medium px-8 w-full sm:w-fit"
              asChild
            >
              <LoginLink>
                Get Started for free
                <ArrowRight className="size-6" />
              </LoginLink>
            </Button>
            <Button
              variant={"outline"}
              className="h-14 border-primary text-primary text-lg font-medium px-8 w-full sm:w-fit"
            >
              <Video className="size-6 mr-2" />
              Watch Demo
            </Button>
          </div>

          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
            <Safari
              imageSrc="/images/hero-img.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="features-section py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Features that you'll love
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <MagicCard
                className="cursor-pointer flex flex-col items-center justify-center whitespace-nowrap shadow-2xl h-[300px] w-full md:h-[250px] text-wrap p-4"
                gradientColor="#E5E5E5"
              >
                <h3 className="text-2xl font-bold text-center mb-4">
                  {feature.title}
                </h3>
                <p className="text-center  text-muted-foreground">
                  {feature.description}
                </p>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      {/* how-it-works section */}
      <section className="how-it-work-section py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How it works?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howitworks.map((feature) => (
              <div
                key={feature.step}
                className="flex flex-col items-center border p-6 rounded-xl shadow-sm bg-card"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary text-center">
                  <span className="text-2xl font-bold">{feature.step}</span>
                </div>
                <h3 className="text-xl font-bold mt-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-center text-muted-foreground mt-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta section */}
      <section className="cta-section py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to get started?
          </h2>
          <p className="text-xl">
            Join thousands of job seekers who have successfully landed their
            dream jobs with CVForgeAI.
          </p>
          <Button
            className="w-fit h-14 text-lg font-medium px-8 bg-white text-primary"
            asChild
          >
            <LoginLink>
              Get Started for free
              <ArrowRight className="size-6" />
            </LoginLink>
          </Button>
        </div>
      </section>
    </div>
  );
}
