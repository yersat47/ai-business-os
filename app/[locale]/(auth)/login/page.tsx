"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/lib/stores/auth.store";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const tValidations = useTranslations("validations");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const [remember, setRemember] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().email(tValidations("emailInvalid")),
        password: z.string().min(1, tValidations("passwordRequired")),
      }),
    [tValidations]
  );

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
    router.push("/entry");
  };

  return (
    <AuthCard
      title={t("title")}
      footer={
        <p className="text-text-secondary">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-accent hover:underline">
            {t("createLink")}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            placeholder={t("emailPlaceholder")}
            className="mt-1.5 min-h-[52px] text-base"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            type="password"
            className="mt-1.5 min-h-[52px] text-base"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-text-secondary">
            <Checkbox checked={remember} onCheckedChange={(c) => setRemember(!!c)} />
            {t("rememberMe")}
          </label>
          <button type="button" className="min-h-[44px] text-sm text-text-muted hover:text-accent">
            {t("forgotPassword")}
          </button>
        </div>
        <Button type="submit" variant="bronze" className="min-h-[52px] w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("submit")}
        </Button>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-surface px-2 text-text-muted">{tCommon("or")}</span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="min-h-[52px] w-full"
          onClick={() =>
            toast({
              title: t("toastComingSoon"),
              description: t("toastGoogleDesc"),
            })
          }
        >
          {t("continueGoogle")}
        </Button>
      </form>
    </AuthCard>
  );
}
