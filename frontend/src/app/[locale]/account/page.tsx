"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { apiFetch, ApiError, clearToken, getToken } from "@/lib/api";
import styles from "./account.module.css";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, localizedPath, type Locale } from "@/i18n/config";

type Subscription = {
  id: string;
  plan_id: string;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  auto_renew: boolean;
  source: string;
};

type PaymentMethod = {
  card_last4: string | null;
  card_type: string | null;
};

type SubscriptionResponse = {
  status: "active" | "expired" | "none";
  subscription: Subscription | null;
  payment_method: PaymentMethod | null;
};

type ConfirmKind = "cancel-sub" | "delete-card";

type AccountStrings = Dictionary["account"];

function formatDate(iso: string, intlLocale: string): string {
  try {
    return new Date(iso).toLocaleDateString(intlLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatPlan(planId: string, t: AccountStrings): string {
  const map: Record<string, string> = {
    monthly: t.planMonthly,
    yearly: t.planYearly,
    grant: t.planGrant,
  };
  return map[planId] ?? planId;
}

export default function AccountPage() {
  const router = useRouter();
  const params = useParams();
  const rawLocale = typeof params.locale === "string" ? params.locale : defaultLocale;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.account;
  const intlLocale = locale === "en" ? "en-US" : "ru-RU";
  const loginPath = localizedPath(locale, "/account/login");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SubscriptionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmKind | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<SubscriptionResponse>(
        "/api/vpn/subscription"
      );
      setData(res);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
        router.replace(loginPath);
        return;
      }
      setError(err instanceof Error ? err.message : t.loadError);
    } finally {
      setLoading(false);
    }
  }, [router, loginPath, t.loadError]);

  useEffect(() => {
    if (!getToken()) {
      router.replace(loginPath);
      return;
    }
    load();
  }, [router, load, loginPath]);

  async function runAction(
    path: string,
    method: "POST" | "DELETE",
    successMsg: string
  ) {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await apiFetch(path, { method });
      setNotice(successMsg);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.opFailed);
    } finally {
      setBusy(false);
      setConfirm(null);
    }
  }

  function handleLogout() {
    clearToken();
    router.replace(loginPath);
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.subtitle}>{t.loading}</p>
        </main>
      </div>
    );
  }

  const sub = data?.subscription ?? null;
  const pm = data?.payment_method ?? null;
  const isActive = data?.status === "active";
  const canCancelRecurring = !!sub && sub.auto_renew && isActive;
  const canResumeRecurring = !!sub && !sub.auto_renew && isActive && !!pm;
  const canChangeCard = !!sub && isActive;
  const canDeleteCard = !!pm;

  async function handleChangeCard() {
    if (!sub) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await apiFetch<{ confirmation_url: string }>(
        "/api/vpn/subscription/checkout",
        {
          method: "POST",
          body: { planId: sub.plan_id, cardChange: true },
        }
      );
      if (res.confirmation_url) {
        window.location.href = res.confirmation_url;
        return;
      }
      setError(t.yookassaNoUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.opFailed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={localizedPath(locale, "/")} className={styles.backLink}>
          &larr; {t.backLink}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>{t.subCardTitle}</h2>
          {sub ? (
            <>
              <div className={styles.row}>
                <span className={styles.rowLabel}>{t.statusLabel}</span>
                <span
                  className={`${styles.rowValue} ${
                    isActive ? styles.statusActive : styles.statusInactive
                  }`}
                >
                  {isActive ? t.statusActive : t.statusExpired}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>{t.planLabel}</span>
                <span className={styles.rowValue}>
                  {formatPlan(sub.plan_id, t)}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>
                  {sub.auto_renew && isActive ? t.nextPayment : t.validUntil}
                </span>
                <span className={styles.rowValue}>
                  {formatDate(sub.expires_at, intlLocale)}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>{t.autoRenewLabel}</span>
                <span className={styles.rowValue}>
                  {sub.auto_renew ? t.autoRenewOn : t.autoRenewOff}
                </span>
              </div>
            </>
          ) : (
            <p className={styles.empty}>{t.noSubscription}</p>
          )}

          {(canCancelRecurring || canResumeRecurring) && (
            <div className={styles.actions}>
              {canResumeRecurring && (
                <button
                  type="button"
                  className={styles.button}
                  onClick={() =>
                    runAction(
                      "/api/vpn/subscription/resume-auto-renew",
                      "POST",
                      t.autoRenewEnabledNotice
                    )
                  }
                  disabled={busy}
                >
                  {t.enableAutoRenew}
                </button>
              )}
              {canCancelRecurring && (
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  onClick={() => setConfirm("cancel-sub")}
                  disabled={busy}
                >
                  {t.cancelSubscription}
                </button>
              )}
            </div>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>{t.cardCardTitle}</h2>
          {pm ? (
            <div className={styles.row}>
              <span className={styles.rowLabel}>{t.linkedCardLabel}</span>
              <span className={styles.rowValue}>
                {pm.card_type ? `${pm.card_type} ` : ""}
                •••• {pm.card_last4 ?? "····"}
              </span>
            </div>
          ) : (
            <p className={styles.empty}>{t.noCard}</p>
          )}

          {(canChangeCard || canDeleteCard) && (
            <div className={styles.actions}>
              {canChangeCard && (
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  onClick={handleChangeCard}
                  disabled={busy}
                >
                  {pm ? t.changeCard : t.linkCard}
                </button>
              )}
              {canDeleteCard && (
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonDanger}`}
                  onClick={() => setConfirm("delete-card")}
                  disabled={busy}
                >
                  {t.deleteCard}
                </button>
              )}
            </div>
          )}
        </section>

        {error && <p className={styles.error}>{error}</p>}
        {notice && <p className={styles.success}>{notice}</p>}

        <div className={styles.meta}>
          <button
            type="button"
            className={styles.metaLink}
            onClick={handleLogout}
          >
            {t.logout}
          </button>
        </div>
      </main>

      {confirm && (
        <ConfirmDialog
          kind={confirm}
          busy={busy}
          t={t}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            if (confirm === "cancel-sub") {
              runAction(
                "/api/vpn/subscription/cancel-auto-renew",
                "POST",
                t.autoRenewDisabledNotice
              );
            } else {
              runAction(
                "/api/vpn/payment-method",
                "DELETE",
                t.cardDeletedNotice
              );
            }
          }}
        />
      )}
    </div>
  );
}

function ConfirmDialog({
  kind,
  busy,
  t,
  onCancel,
  onConfirm,
}: {
  kind: ConfirmKind;
  busy: boolean;
  t: AccountStrings;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const title =
    kind === "cancel-sub" ? t.confirmCancelTitle : t.confirmDeleteCardTitle;
  const text =
    kind === "cancel-sub" ? t.confirmCancelText : t.confirmDeleteCardText;

  return (
    <div className={styles.dialog} onClick={onCancel}>
      <div
        className={styles.dialogInner}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.dialogTitle}>{title}</h3>
        <p className={styles.dialogText}>{text}</p>
        <div className={styles.dialogActions}>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={onCancel}
            disabled={busy}
          >
            {t.dialogCancel}
          </button>
          <button
            type="button"
            className={`${styles.button} ${
              kind === "delete-card" ? styles.buttonDanger : ""
            }`}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "…" : t.dialogConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}
