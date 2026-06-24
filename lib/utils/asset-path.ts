const GITHUB_PAGES_BASE = "/ai-business-os";

export function getAssetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH ??
    (typeof process !== "undefined" && process.env.GITHUB_PAGES === "true"
      ? GITHUB_PAGES_BASE
      : "");

  if (!basePath) return normalized;
  return `${basePath}${normalized}`;
}
