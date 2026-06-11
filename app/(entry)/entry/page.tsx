"use client";

import Link from "next/link";
import { Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EntryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Welcome to AI Business OS</h1>
          <p className="text-text-secondary text-lg">Let&apos;s get you set up.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-surface p-8 hover:border-accent transition-colors">
            <Building2 className="h-10 w-10 text-accent mb-4" />
            <h2 className="text-xl font-semibold mb-2">Create a new company account</h2>
            <p className="text-text-secondary text-sm mb-6">
              Set up AI Business OS for your business from scratch
            </p>
            <Button variant="bronze" asChild className="w-full">
              <Link href="/create-company">Create company</Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-8 hover:border-accent transition-colors">
            <Users className="h-10 w-10 text-accent mb-4" />
            <h2 className="text-xl font-semibold mb-2">Join an existing company</h2>
            <p className="text-text-secondary text-sm mb-6">
              Your team already uses AI Business OS? Enter your invite code.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link href="/join-company">Join with invite code</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
