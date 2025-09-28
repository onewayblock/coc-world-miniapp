"use client";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

interface OnePayProps {
  appId: `app_${string}`;
  recipient: `0x${string}`;
  amountUSDC: string; // in whole token units as string, e.g. "1.25"
  paymentId?: string; // optional unique id; generated if omitted
}

function buildOnePayUrl(params: {
  appId: `app_${string}`;
  recipient: `0x${string}`;
  amountUSDC: string;
  paymentId: string;
}) {
  const base = "https://worldcoin.org/mini-app";
  const url = new URL(base);
  url.searchParams.set("app_id", params.appId);
  url.searchParams.set("path", "/pay");

  // OnePay may support additional query params in the future. For now we
  // ensure our unique ID is embedded so the merchant can reconcile.
  url.searchParams.set("paymentId", params.paymentId);
  url.searchParams.set("recipient", params.recipient);
  url.searchParams.set("amount", params.amountUSDC);
  return url.toString();
}

export const OnePay = ({
  appId,
  recipient,
  amountUSDC,
  paymentId,
}: OnePayProps) => {
  const handleClick = async () => {
    // Optionally request a server-generated payment id for reconciliation
    let id = paymentId;
    if (!id) {
      try {
        const res = await fetch("/api/initiate-payment", { method: "POST" });
        const data = await res.json();
        id = data.id as string;
      } catch {
        // Fallback to client UUID if server is unavailable
        id = crypto.randomUUID().replace(/-/g, "");
      }
    }

    const href = buildOnePayUrl({
      appId,
      recipient,
      amountUSDC,
      paymentId: id!,
    });
    // In World App WebView, navigating to this URL opens the OnePay screen
    window.location.href = href;
  };

  return (
    <Button onClick={handleClick} size="lg" variant="primary">
      Pay with OnePay
    </Button>
  );
};

export default OnePay;
