import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// * Utility function to conditionally combine class names
// * - `clsx` handles conditional and dynamic class values
// * - `tailwind-merge` resolves Tailwind CSS class conflicts
// *
// * This is especially useful when composing component styles
// * with variants, conditional states, or overrides
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
