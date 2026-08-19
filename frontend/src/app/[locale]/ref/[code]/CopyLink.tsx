"use client";

import { useEffect, useState, type ReactNode } from "react";

interface CopyLinkProps {
  href: string;
  /** Used instead of href on Android. The chattr:// scheme belongs to the
   *  messenger there and has no /ref handler, so Android gets an intent:// URI
   *  that targets Chattr Connect and falls back to its Play listing. */
  androidHref?: string;
  /** Written to the clipboard on tap, so the code survives even if the deep link
   *  goes nowhere (app not installed) and the user ends up installing instead. */
  copyText: string;
  className?: string;
  children: ReactNode;
}

export function CopyLink({ href, androidHref, copyText, className, children }: CopyLinkProps) {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    setIsAndroid(/android/i.test(navigator.userAgent));
  }, []);

  return (
    <a
      href={isAndroid && androidHref ? androidHref : href}
      className={className}
      onClick={() => {
        navigator.clipboard?.writeText(copyText).catch(() => {});
      }}
    >
      {children}
    </a>
  );
}
