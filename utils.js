import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Format area with unit */
export function formatArea(value, unit = "sqm") {
  if (!value) return "";
  return `${value.toLocaleString()} ${unit}`;
}

/** Truncate text */
export function truncate(str, length = 120) {
  if (!str) return "";
  return str.length > length ? str.slice(0, length) + "…" : str;
}

/** Capitalize first letter */
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Format category label */
export function formatCategory(cat) {
  const map = {
    residential: "Residential",
    commercial: "Commercial",
    interior: "Interior",
    landscape: "Landscape",
    "mixed-use": "Mixed-Use",
    cultural: "Cultural",
  };
  return map[cat] || capitalize(cat);
}

/** Build Cloudinary thumbnail URL */
export function cloudinaryThumb(url, width = 600, height = 400) {
  if (!url || !url.includes("cloudinary")) return url;
  return url.replace("/upload/", `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`);
}

/** Stagger animation delay */
export function staggerDelay(index, base = 0.1) {
  return index * base;
                                }
