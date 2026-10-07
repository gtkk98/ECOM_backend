import { SignIn } from "@clerk/nextjs";
import { authAppearance } from "@/lib/authAppearance";

export default function Page() {
  return (
    <section className="auth-page" aria-label="Sign in to ChowUp">
      <div className="auth-card">
        <SignIn appearance={authAppearance} />
      </div>
    </section>
  );
}
