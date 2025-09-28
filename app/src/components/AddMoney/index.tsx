"use client";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";

interface AddMoneyProps {
  appId: `app_${string}`;
  toAddress: `0x${string}`;
  toToken: `0x${string}`; // USDC or WLD address
  amountUsd?: string; // e.g. '100'
  sourceAppId?: `app_${string}`;
  sourceAppName?: string;
  sourceDeeplinkPath?: string; // e.g. '/dashboard'
}

function buildAddMoneyUrl(
  params: Required<Pick<AddMoneyProps, "appId" | "toAddress" | "toToken">> &
    Partial<
      Pick<
        AddMoneyProps,
        "amountUsd" | "sourceAppId" | "sourceAppName" | "sourceDeeplinkPath"
      >
    >
) {
  const base = "https://worldcoin.org/mini-app";
  const url = new URL(base);
  url.searchParams.set("app_id", params.appId);
  url.searchParams.set("path", "/bridge");
  url.searchParams.set("toAddress", params.toAddress);
  url.searchParams.set("toToken", params.toToken);
  if (params.amountUsd) url.searchParams.set("amountUsd", params.amountUsd);
  if (params.sourceAppId)
    url.searchParams.set("sourceAppId", params.sourceAppId);
  if (params.sourceAppName)
    url.searchParams.set("sourceAppName", params.sourceAppName);
  if (params.sourceDeeplinkPath)
    url.searchParams.set("sourceDeeplinkPath", params.sourceDeeplinkPath);
  return url.toString();
}

export const AddMoney = ({
  appId,
  toAddress,
  toToken,
  amountUsd,
  sourceAppId,
  sourceAppName,
  sourceDeeplinkPath,
}: AddMoneyProps) => {
  const { isInstalled } = useMiniKit();

  const onClick = () => {
    if (!isInstalled) {
      alert("Open this mini app inside World App to use Add Money.");
      return;
    }
    const href = buildAddMoneyUrl({
      appId,
      toAddress,
      toToken,
      amountUsd,
      sourceAppId,
      sourceAppName,
      sourceDeeplinkPath,
    });
    window.location.href = href;
  };

  return (
    <Button onClick={onClick} size="lg" variant="primary">
      Add Money
    </Button>
  );
};

export default AddMoney;
