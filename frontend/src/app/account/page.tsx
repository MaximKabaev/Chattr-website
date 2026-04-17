"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { apiFetch, ApiError, clearToken, getToken } from "@/lib/api";
import styles from "./account.module.css";

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

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatPlan(planId: string): string {
  const map: Record<string, string> = {
    monthly: "1 месяц",
    yearly: "1 год",
    grant: "Бонусный период",
  };
  return map[planId] ?? planId;
}

export default function AccountPage() {
  const router = useRouter();
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
        router.replace("/account/login");
        return;
      }
      setError(
        err instanceof Error ? err.message : "Не удалось загрузить данные"
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/account/login");
      return;
    }
    load();
  }, [router, load]);

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
      setError(err instanceof Error ? err.message : "Операция не удалась");
    } finally {
      setBusy(false);
      setConfirm(null);
    }
  }

  function handleLogout() {
    clearToken();
    router.replace("/account/login");
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.subtitle}>Загрузка…</p>
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
      setError("YooKassa не вернул ссылку на оплату");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Операция не удалась");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          &larr; На главную
        </Link>

        <h1 className={styles.title}>Управление подпиской</h1>
        <p className={styles.subtitle}>
          Управляйте подпиской Chattr Pro и привязанной картой.
        </p>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Подписка</h2>
          {sub ? (
            <>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Статус</span>
                <span
                  className={`${styles.rowValue} ${
                    isActive ? styles.statusActive : styles.statusInactive
                  }`}
                >
                  {isActive ? "Активна" : "Истекла"}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>План</span>
                <span className={styles.rowValue}>
                  {formatPlan(sub.plan_id)}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>
                  {sub.auto_renew && isActive
                    ? "Следующий платёж"
                    : "Действует до"}
                </span>
                <span className={styles.rowValue}>
                  {formatDate(sub.expires_at)}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Автопродление</span>
                <span className={styles.rowValue}>
                  {sub.auto_renew ? "Включено" : "Отключено"}
                </span>
              </div>
            </>
          ) : (
            <p className={styles.empty}>У вас нет активной подписки.</p>
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
                      "Автопродление включено."
                    )
                  }
                  disabled={busy}
                >
                  Включить автопродление
                </button>
              )}
              {canCancelRecurring && (
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  onClick={() => setConfirm("cancel-sub")}
                  disabled={busy}
                >
                  Отменить подписку (остановить автопродление)
                </button>
              )}
            </div>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Карта</h2>
          {pm ? (
            <div className={styles.row}>
              <span className={styles.rowLabel}>Привязанная карта</span>
              <span className={styles.rowValue}>
                {pm.card_type ? `${pm.card_type} ` : ""}
                •••• {pm.card_last4 ?? "····"}
              </span>
            </div>
          ) : (
            <p className={styles.empty}>Карта не привязана.</p>
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
                  {pm ? "Сменить карту" : "Привязать карту"}
                </button>
              )}
              {canDeleteCard && (
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonDanger}`}
                  onClick={() => setConfirm("delete-card")}
                  disabled={busy}
                >
                  Удалить карту
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
            Выйти
          </button>
        </div>
      </main>

      {confirm && (
        <ConfirmDialog
          kind={confirm}
          busy={busy}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            if (confirm === "cancel-sub") {
              runAction(
                "/api/vpn/subscription/cancel-auto-renew",
                "POST",
                "Автопродление отключено. Доступ сохранится до конца оплаченного периода."
              );
            } else {
              runAction(
                "/api/vpn/payment-method",
                "DELETE",
                "Карта удалена. Автопродление отключено."
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
  onCancel,
  onConfirm,
}: {
  kind: ConfirmKind;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const title =
    kind === "cancel-sub" ? "Отменить подписку?" : "Удалить карту?";
  const text =
    kind === "cancel-sub"
      ? "Автопродление будет отключено. Подписка останется активной до конца оплаченного периода, после чего не продлится."
      : "Мы отключим привязанную карту и автопродление. Новый платёж можно будет оформить заново через приложение.";

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
            Отмена
          </button>
          <button
            type="button"
            className={`${styles.button} ${
              kind === "delete-card" ? styles.buttonDanger : ""
            }`}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "…" : "Подтвердить"}
          </button>
        </div>
      </div>
    </div>
  );
}
