import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">
          Stop guessing. Start knowing.
        </h2>
        <p className="text-text-secondary text-lg mb-10">
          Join 200+ SMB owners using AI Business OS to run smarter businesses.
        </p>
        <Button variant="bronze" size="lg" asChild>
          <Link href="/register">Create your free account</Link>
        </Button>
        <footer className="mt-20 pt-8 border-t border-border text-text-muted text-sm">
          © 2026 AI Business OS
        </footer>
      </div>
    </section>
  );
}
