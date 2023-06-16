import { cn } from "@/lib/utils";

const tagColors = [
  "dark:text-purple-50 dark:bg-purple-950 text-purple-950 bg-purple-100",
  "dark:text-amber-50 dark:bg-amber-950 text-amber-950 bg-amber-100",
  "dark:text-teal-50 dark:bg-teal-950 text-teal-950 bg-teal-100",
  "dark:text-lime-50 dark:bg-lime-950 text-lime-950 bg-lime-100",
  "dark:text-cyan-50 dark:bg-cyan-950 text-cyan-950 bg-cyan-100",
  "dark:text-violet-50 dark:bg-violet-950 text-violet-950 bg-violet-100",
  "dark:text-yellow-50 dark:bg-yellow-950 text-yellow-950 bg-yellow-100",
  "dark:text-pink-50 dark:bg-pink-950 text-pink-950 bg-pink-100",
  "dark:text-blue-50 dark:bg-blue-950 text-blue-950 bg-blue-100",
];
let currentIdx = 0;

const PostTag = ({ children }: { children: string }) => {
  const tagColor = tagColors[currentIdx++];
  currentIdx = currentIdx >= tagColors.length ? 0 : currentIdx;

  return (
    <p className={cn("tag", tagColor)}>
      <span>{children}</span>
    </p>
  );
};

export default PostTag;
