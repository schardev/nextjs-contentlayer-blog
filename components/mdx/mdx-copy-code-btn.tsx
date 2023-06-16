"use client";

import { copyToClipboard } from "@/lib/utils";
import { Check, Copy } from "iconoir-react";
import { MouseEventHandler, useState } from "react";

const MarkdownCopyCodeButton = ({ className }: { className?: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const parent = e.currentTarget.parentElement;
    if (!parent) return;

    const copied = await copyToClipboard(parent.innerText);
    setIsCopied(copied);
    setTimeout(() => {
      setIsCopied(false);
    }, 3500);
  };

  return (
    <button className={className} onClick={handleClick} aria-label="Copy Code">
      {isCopied ? <Check /> : <Copy />}
    </button>
  );
};

export default MarkdownCopyCodeButton;
