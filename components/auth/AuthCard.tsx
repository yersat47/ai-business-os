"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  const tCommon = useTranslations("common");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">⬡</span>
            <span className="font-semibold" style={{ color: "#EDE8E0" }}>
              {tCommon("brand")}
            </span>
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: "#EDE8E0" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2" style={{ color: "rgba(240, 237, 232, 0.6)" }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="p-0 md:rounded-2xl md:border md:border-border md:bg-surface md:p-6 md:shadow-card">
          {children}
        </div>
        {footer && <div className="text-center mt-6 text-sm">{footer}</div>}
      </div>
    </div>
  );
}
