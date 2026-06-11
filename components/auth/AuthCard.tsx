"use client";

import Link from "next/link";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-semibold">AI Business OS</span>
          </Link>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-text-secondary mt-2">{subtitle}</p>
          )}
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          {children}
        </div>
        {footer && <div className="text-center mt-6 text-sm">{footer}</div>}
      </div>
    </div>
  );
}
