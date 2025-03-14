import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  Settings,
  User,
  FileText,
  Upload,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { DoodleBackground } from "@/components/ui/doodle-background";

export default function LandingPage() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black relative">
      <DoodleBackground />
      {/* Apple-style navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[980px] mx-auto flex h-12 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl">
              Summerizer
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 hover:cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border-none shadow-lg"
                  >
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-light hover:text-gray-500"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-full bg-black text-white hover:bg-gray-800 text-sm px-4">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-12">
        {/* Hero section */}
        <section className="py-20 text-center">
          <h2 className="text-5xl font-doodle tracking-tight mb-1">
            Summerizer
          </h2>
          <h3 className="text-2xl font-comic text-gray-500 mb-4">
            Extract key insights from your documents with AI
          </h3>
          <div className="flex justify-center space-x-6 text-xl text-blue-600">
            <Link
              to="/pdf-summarizer"
              className="flex items-center hover:underline"
            >
              Try it now <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="/signup" className="flex items-center hover:underline">
              Create account <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1200&q=80"
                  alt="PDF Summarizer in action"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-[#f5f5f7] text-center">
          <h2 className="text-4xl font-doodle tracking-tight mb-1">
            How It Works
          </h2>
          <h3 className="text-xl font-comic text-gray-500 mb-8">
            Simple, fast, and accurate document summarization
          </h3>

          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-doodle mb-2">Upload Your PDF</h4>
              <p className="text-gray-500">
                Simply drag and drop your PDF document or select it from your
                files.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-doodle mb-2">AI Processing</h4>
              <p className="text-gray-500">
                Our advanced AI analyzes your document and extracts the most
                important information.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-xl font-doodle mb-2">Get Your Summary</h4>
              <p className="text-gray-500">
                Review the generated summary, customize it with prompts, and
                download or share it.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link to="/pdf-summarizer">
              <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 text-base px-6 py-6 h-auto">
                Try Summerizer Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Benefits section */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-doodle tracking-tight mb-1">
            Why Use Our Summerizer
          </h2>
          <h3 className="text-xl font-comic text-gray-500 mb-12">
            Save time and extract valuable insights
          </h3>

          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm text-left border border-blue-100">
              <h4 className="text-2xl font-doodle mb-4 text-blue-800">
                Time-Saving
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Extract key points from lengthy documents in seconds
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Focus on what matters most without reading every page
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Process multiple documents efficiently
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-sm text-left border border-green-100">
              <h4 className="text-2xl font-doodle mb-4 text-green-800">
                Customizable
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Add custom prompts to focus on specific aspects
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Choose between quick summary and detailed view
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Download or share your summaries easily
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-doodle mb-4">
              Ready to save time and extract key insights?
            </h2>
            <p className="text-xl mb-8 text-blue-100 font-comic">
              Try our Summerizer today and transform how you process documents.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/pdf-summarizer">
                <Button className="rounded-full bg-white text-blue-600 hover:bg-blue-50 text-base px-6 py-6 h-auto w-full sm:w-auto">
                  Try It Now
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="rounded-full bg-transparent text-white border-white hover:bg-blue-700 text-base px-6 py-6 h-auto w-full sm:w-auto"
                >
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] py-12 text-xs text-gray-500">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="border-b border-gray-300 pb-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-doodle text-sm text-gray-900 mb-4">
                Summerizer
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-doodle text-sm text-gray-900 mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-doodle text-sm text-gray-900 mb-4">
                Community
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-doodle text-sm text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4">
            <p>Copyright © 2023 Summerizer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
