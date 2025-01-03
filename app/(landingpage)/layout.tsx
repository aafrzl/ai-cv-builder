import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function LayoutLandingPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar/Header */}
      <Navbar />
      <main className="flex-grow">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LayoutLandingPage;
