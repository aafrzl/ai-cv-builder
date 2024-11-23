import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Header from "./_components/header";

async function HomeLayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/");

  return (
    <div className="w-full h-auto min-h-screen bg-[#f8f8f8]">
      <Header />
      {children}
    </div>
  );
}

export default HomeLayoutPage;
