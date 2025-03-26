/**
 * Generates a URL-friendly ID from text
 *
 * @param text The text to generate an ID from
 * @returns A URL-friendly ID
 */
export const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};
