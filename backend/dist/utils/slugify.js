import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 5);
export const generateSlug = (title) => {
    const baseSlug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return `${baseSlug}-${nanoid()}`;
};
