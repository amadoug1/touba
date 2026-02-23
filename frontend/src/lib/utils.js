import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function optimizeImageUrl(url, width = 1600) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("images.unsplash.com")) return url;

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}auto=format&fit=crop&w=${width}&q=80`;
}
