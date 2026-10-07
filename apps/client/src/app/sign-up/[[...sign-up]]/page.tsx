import { SignUp } from "@clerk/nextjs";
import { authAppearance } from "@/lib/authAppearance";

export default function Page() {
  return (
    <section className="auth-page" aria-label="Create a ChowUp account">
      <div className="auth-card">
        <SignUp appearance={authAppearance} />
      </div>
    </section>
  );
}
