import { nanoid } from "nanoid";

export const generateShortUrl = (url: string) => {
  return nanoid(8);
};
