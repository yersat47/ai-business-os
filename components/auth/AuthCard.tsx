"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { glass } from "@/lib/glass.styles";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  const tCommon = useTranslations("common");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-accent" />
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
        <div className="p-6 shadow-card" style={glass.card}>
          {children}
        </div>
        {footer && <div className="text-center mt-6 text-sm">{footer}</div>}
      </div>
    </div>
  );
}
