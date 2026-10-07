import Image from "next/image";
import Link from "next/link";
import SignInForm from "@/components/SignInForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your ChowUp account to make ordering your favorites easier.",
  robots: { index: false, follow: true },
};

const LoginPage = () => (
  <main className="mx-auto grid max-w-5xl overflow-hidden rounded-xl border border-(--line) bg-(--surface) shadow-[0_16px_50px_rgb(25_42_38/8%)] md:grid-cols-2">
    <section className="relative min-h-52 bg-[#18372f] md:min-h-[600px]" aria-label="ChowUp kitchen">
      <Image
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200"
        alt="Freshly baked pizza topped with basil"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#102b25]/90 via-[#102b25]/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd6a9]">Good food, made easy</p>
        <h1 className="mt-2 max-w-sm text-3xl font-semibold leading-tight">Your favorites are waiting.</h1>
        <p className="mt-2 text-sm text-white/85">Sign in to make your next order feel like second nature.</p>
      </div>
    </section>

    <section className="flex flex-col justify-center px-6 py-9 sm:px-10 md:px-12">
      <Link href="/" className="mb-8 text-sm font-medium text-(--brand) hover:text-(--brand-dark)">← Back to ChowUp</Link>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--brand)">Welcome back</p>
      <h2 className="mt-2 text-3xl font-semibold text-foreground">Sign in</h2>
      <p className="mt-2 text-sm text-(--muted)">Enter your account details to continue.</p>
      <SignInForm />
      <div className="mt-6 flex items-center gap-3 text-xs text-(--muted)">
        <span className="h-px flex-1 bg-(--line)" />
        <span>NEW TO CHOWUP?</span>
        <span className="h-px flex-1 bg-(--line)" />
      </div>
      <Link href="/products" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-(--line) text-sm font-semibold text-(--brand-dark) transition-colors hover:bg-(--surface-tint)">
        Explore the menu
      </Link>
    </section>
  </main>
);

export default LoginPage;