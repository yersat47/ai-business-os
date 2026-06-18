export interface BlurConfig {
  blur: string;
  overlay: string;
  isLanding: boolean;
  fullCoverImage?: boolean;
}

function normalizePath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1 && ["ru", "kk", "en"].includes(segments[0])) {
    return "/";
  }
  if (segments.length >= 2 && ["ru", "kk", "en"].includes(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export function getBlurConfig(pathname: string): BlurConfig {
  const path = normalizePath(pathname);

  if (path === "/") {
    return {
      blur: "blur(0px)",
      overlay: "rgba(6,6,14,0)",
      isLanding: true,
    };
  }

  if (
    path.includes("/login") ||
    path.includes("/register") ||
    path.includes("/join-company") ||
    path.includes("/entry")
  ) {
    return {
      blur: "blur(8px)",
      overlay: "rgba(6,6,14,0.55)",
      isLanding: false,
      fullCoverImage: path.includes("/login"),
    };
  }

  if (path.includes("/create-company") || path.includes("/onboarding")) {
    return {
      blur: "blur(12px)",
      overlay: "rgba(6,6,14,0.65)",
      isLanding: false,
      fullCoverImage: true,
    };
  }

  return {
    blur: "blur(20px)",
    overlay: "rgba(6,6,14,0.82)",
    isLanding: false,
  };
}
