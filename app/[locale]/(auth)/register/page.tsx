"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth.store";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tValidations = useTranslations("validations");
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);

  const schema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(2, tValidations("nameRequired")),
          email: z.string().email(tValidations("emailInvalid")),
          password: z.string().min(6, tValidations("passwordTooShort")),
          confirmPassword: z.string(),
        })
        .refine((d) => d.password === d.confirmPassword, {
          message: tValidations("passwordMismatch"),
          path: ["confirmPassword"],
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
          {t("hasAccount")}{" "}
          <Link href="/login" className="text-accent hover:underline">
            {t("signInLink")}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">{t("fullName")}</Label>
          <Input id="name" className="mt-1.5 min-h-[52px] text-base" {...register("name")} />
          {errors.name && (
            <p className="text-danger text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" inputMode="email" className="mt-1.5 min-h-[52px] text-base" {...register("email")} />
          {errors.email && (
            <p className="text-danger text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">{t("password")}</Label>
          <Input id="password" type="password" className="mt-1.5 min-h-[52px] text-base" {...register("password")} />
          {errors.password && (
            <p className="text-danger text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
          <Input
            id="confirmPassword"
            type="password"
            className="mt-1.5 min-h-[52px] text-base"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-danger text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" variant="bronze" className="min-h-[52px] w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("submit")
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
