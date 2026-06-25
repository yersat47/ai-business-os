"use client";

import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/formatters";

interface NumericInputProps {
  value?: number;
  onCommit: (value: number | undefined) => void;
  placeholder?: string;
  className?: string;
  inputMode?: "numeric" | "decimal";
}

function formatDisplay(value: number | undefined): string {
  if (value === undefined || value <= 0) return "";
  return formatCurrencyInput(value);
}

/** Uncontrolled while focused so parent re-renders never reset multi-digit typing. */
export function NumericInput({
  value,
  onCommit,
  placeholder,
  className,
  inputMode = "numeric",
}: NumericInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusedRef = useRef(false);

  useEffect(() => {
    if (focusedRef.current || !inputRef.current) return;
    inputRef.current.value = formatDisplay(value);
  }, [value]);

  const handleFocus = () => {
    focusedRef.current = true;
    const el = inputRef.current;
    if (!el) return;
    el.value = value !== undefined && value > 0 ? String(value) : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handleBlur = () => {
    focusedRef.current = false;
    const raw = inputRef.current?.value ?? "";
    const parsed = raw ? parseCurrencyInput(raw) : undefined;
    const next = parsed && parsed > 0 ? parsed : undefined;
    onCommit(next);
    if (inputRef.current) {
      inputRef.current.value = formatDisplay(next);
    }
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      inputMode={inputMode}
      defaultValue={formatDisplay(value)}
      placeholder={placeholder}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
    />
  );
}
