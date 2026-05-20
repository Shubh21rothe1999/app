import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "./Chatbot";
import { Toaster } from "./ui/sonner";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 antialiased">
      <Navbar />
      <main className="max-w-7xl mx-auto px-5 md:px-8">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <Toaster position="top-right" richColors />
    </div>
  );
}
