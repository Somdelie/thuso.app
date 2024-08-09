import { customAlphabet } from "nanoid";

export function generateSlug(title) {
  const slugify = (str) =>
    str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text

  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4); // Generates a 4-letter code

  const abbreviation = nanoid();

  return `${slugify(title)}-${abbreviation}`;
}
