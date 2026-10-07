import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import SearchBar from "./SearchBar";
import CartButton from "./CartButton";
import ThemeToggle from "./ThemeToggle";
import ProfileButton from "./ProfileButton";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 -mx-2 mb-6 border-b border-(--line) bg-(--background)/95 px-2 backdrop-blur sm:-mx-0 sm:px-0">
      <nav
        aria-label="Main navigation"
        className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 py-3"
      >
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label="ChowUp home"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/logo2.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-lg font-semibold text-foreground">
              ChowUp<span className="text-(--accent)">.</span>
            </span>
          </Link>
          <Link
            href="/products"
            className="hidden text-sm font-medium text-(--muted) transition-colors hover:text-(--brand) sm:inline-flex"
          >
            Menu
          </Link>
        </div>
        <SearchBar />
        <div className="ml-auto flex items-center gap-4 sm:ml-0">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton>
              <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <ProfileButton/>
          </Show>
          <ThemeToggle />
          <CartButton />
          <Link
            href="/products"
            className="hidden min-h-10 items-center rounded-md bg-(--brand) px-4 text-sm font-semibold text-(--on-brand) transition-colors hover:bg-(--brand-dark) sm:inline-flex"
          >
            Order now
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
