"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/api";

type Props = {
  loginLabel: string;
  loginClassName: string;
  profileClassName: string;
};

function ProfileGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function HeaderAuthLink({
  loginLabel,
  loginClassName,
  profileClassName,
}: Props) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(!!getToken());

    function onStorage(e: StorageEvent) {
      if (e.key === null || e.key === "chattr_auth_token") {
        setAuthed(!!getToken());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (authed === null) {
    return null;
  }

  if (authed) {
    return (
      <Link
        href="/account"
        className={profileClassName}
        aria-label="Аккаунт"
      >
        <ProfileGlyph />
      </Link>
    );
  }

  return (
    <Link href="/account/login" className={loginClassName}>
      {loginLabel}
    </Link>
  );
}
