"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCompanyStore } from "@/lib/stores/company.store";

export default function JoinCompanyPage() {
  const router = useRouter();
  const completeSetup = useCompanyStore((s) => s.completeSetup);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const next = [...code];
    next[index] = value.toUpperCase();
    setCode(next);
    setError("");
    if (value && index < 5) {
      const el = document.getElementById(`code-${index + 1}`);
      el?.focus();
    }
  };

  const handleJoin = async () => {
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      setError("Enter the full 6-character code");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (fullCode === "URBAN1") {
      setSuccess(true);
      completeSetup();
      if (typeof document !== "undefined") {
        document.cookie = "ai-bos-setup=true; path=/; max-age=604800";
      }
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      setError("Invite code not found. Check with your administrator.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <Link
          href="/entry"
          className="text-sm text-text-secondary hover:text-accent mb-8 inline-block"
        >
          ← Back to setup options
        </Link>
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h1 className="text-2xl font-bold mb-2">Join your company</h1>
          <p className="text-text-secondary text-sm mb-8">
            Enter the 6-character invite code from your administrator.
          </p>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center py-8"
              >
                <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-success" />
                </div>
                <p className="font-semibold">Welcome to Urban Mode!</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex gap-2 justify-center mb-6">
                  {code.map((char, i) => (
                    <Input
                      key={i}
                      id={`code-${i}`}
                      value={char}
                      onChange={(e) => handleChange(i, e.target.value)}
                      className="w-12 h-14 text-center text-lg font-mono uppercase"
                      maxLength={1}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-danger text-sm text-center mb-4">{error}</p>
                )}
                <Button
                  variant="bronze"
                  className="w-full"
                  onClick={handleJoin}
                  disabled={loading}
                >
                  {loading ? "Joining..." : "Join"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
