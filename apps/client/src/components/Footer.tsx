import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-(--line) py-8">
      <div className="grid gap-8 sm:grid-cols-[1fr_auto_auto] sm:items-start">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo2.png" alt="" width={32} height={32} />
            <span className="font-semibold">ChowUp<span className="text-(--accent)">.</span></span>
          </Link>
          <p className="mt-3 text-sm text-(--muted)">Good food, made easy.</p>
          <p className="mt-1 text-xs text-(--muted)">© 2026 ChowUp. All rights reserved.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-(--muted)">
          <p className="mb-1 font-semibold text-foreground">Explore</p>
          <Link className="hover:text-(--brand)" href="/">Home</Link>
          <Link className="hover:text-(--brand)" href="/products">Full menu</Link>
          <Link className="hover:text-(--brand)" href="/cart">Your cart</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-(--muted)">
          <p className="mb-1 font-semibold text-foreground">Need a hand?</p>
          <Link className="hover:text-(--brand)" href="/cart">Review your cart</Link>
          <p>Freshly prepared, always.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
