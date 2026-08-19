"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";

interface CopyCodeProps {
  code: string;
  copyLabel: string;
  copiedLabel: string;
}

export function CopyCode({ code, copyLabel, copiedLabel }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — the code is selectable text.
    }
  };

  return (
    <div className={styles.codeBox}>
      <span className={styles.code}>{code}</span>
      <button type="button" onClick={handleCopy} className={styles.copyButton}>
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
