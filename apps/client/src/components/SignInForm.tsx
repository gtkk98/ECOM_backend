"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Sign-in is not connected yet. No credentials were sent or saved.");
  };

  const fieldClassName = "min-h-11 w-full rounded-md border border-(--line) bg-(--surface) px-3 text-sm text-foreground placeholder:text-(--muted) focus:border-(--brand) focus:outline-none focus:ring-2 focus:ring-(--focus)";

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="signin-email" className="text-sm font-medium text-foreground">Email address</label>
        <input
          id="signin-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          className={fieldClassName}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="signin-password" className="text-sm font-medium text-foreground">Password</label>
        <div className="relative">
          <input
            id="signin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className={`${fieldClassName} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-(--muted) hover:text-(--brand)"
          >
            {showPassword ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <button type="submit" className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-(--brand) px-5 text-sm font-semibold text-(--on-brand) transition-colors hover:bg-(--brand-dark)">
        Sign in
      </button>
      <p role="note" className="text-xs leading-5 text-(--muted)">Authentication is not configured for this demo. This form does not send or store your credentials.</p>
      {message && <p role="status" className="rounded-md border border-(--focus) bg-(--surface-tint) p-3 text-sm text-(--brand-dark)">{message}</p>}
    </form>
  );
};

export default SignInForm;