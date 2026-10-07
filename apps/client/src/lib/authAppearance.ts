export const authAppearance = {
  variables: {
    colorPrimary: "var(--brand)",
    colorBackground: "var(--surface)",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "w-full border-0 bg-transparent shadow-none",
    headerTitle: "font-semibold tracking-tight text-(--foreground)",
    headerSubtitle: "text-sm text-(--muted)",
    formFieldLabel: "font-medium text-(--foreground)",
    formFieldInput:
      "border-(--line) bg-(--surface) text-(--foreground) shadow-none transition-colors placeholder:text-(--muted) focus:border-(--brand) focus:ring-2 focus:ring-(--focus)",
    formButtonPrimary:
      "font-semibold shadow-none transition-colors hover:brightness-95",
    socialButtonsBlockButton:
      "border-(--line) shadow-none transition-colors hover:bg-(--surface-muted)",
    footerActionLink: "font-semibold",
    dividerLine: "bg-(--line)",
    dividerText: "text-(--muted)",
  },
};
