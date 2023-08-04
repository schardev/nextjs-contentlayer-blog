import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { slug } from "github-slugger";
import { Metadata } from "next";
import config from "../lib/siteConfig";

export const cn = (...classNames: ClassValue[]) => {
  return twMerge(clsx(classNames));
};

export const formatDate = (
  date: string | Date,
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"] = "medium",
) => {
  if (typeof date === "string") date = new Date(date);
  return Intl.DateTimeFormat("en-US", { dateStyle: dateStyle }).format(date);
};

export const isArrayNotEmpty = <T>(arr: T[] | undefined): arr is T[] => {
  if (Array.isArray(arr) && arr.length > 0) return true;
  return false;
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};

export const slugify = (str: string) => {
  return slug(str);
};

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const generateCommonMeta = (meta: {
  title: string;
  description: string;
  image?: string;
}): Metadata => {
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [meta.image || config.siteImage],
    },
  };
};
