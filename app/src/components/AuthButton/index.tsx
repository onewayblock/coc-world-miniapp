"use client";
import { useLoginWithSiwe, usePrivy } from "@privy-io/react-auth";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";
import { useCallback, useEffect, useState } from "react";

export const AuthButton = () => {
  const [isPending, setIsPending] = useState(false);
  const [jwt, setJwt] = useState<string | null>(null);
  const { isInstalled } = useMiniKit();
  const { generateSiweNonce, loginWithSiwe } = useLoginWithSiwe();
  const { getAccessToken } = usePrivy();

  useEffect(() => {
    const saved = localStorage.getItem("privy_jwt");
    if (saved) {
      setJwt(saved);
    }
  }, []);

  const signIn = async () => {
    const privyNonce = await generateSiweNonce();
    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
      nonce: privyNonce,
    });

    if (finalPayload.status === "error") {
      console.error("Wallet auth failed", finalPayload);
      return;
    }

    const { message, signature } = finalPayload;
    const user = await loginWithSiwe({ message, signature });

    // получаем JWT
    const token = await getAccessToken();
    if (token) {
      localStorage.setItem("privy_jwt", token);
      setJwt(token);
      console.log("Privy JWT saved:", token);
    }

    const userInfo = await MiniKit.getUserByAddress(user.wallet!.address);
    console.log("User info:", userInfo);
  };

  const onClick = useCallback(async () => {
    setIsPending(true);
    try {
      await signIn();
    } catch (error) {
      console.error("Wallet authentication button error", error);
    } finally {
      setIsPending(false);
    }
  }, [isInstalled, isPending]);

  return (
    <LiveFeedback
      label={{
        failed: "Failed to login",
        pending: "Logging in",
        success: "Logged in",
      }}
      state={isPending ? "pending" : undefined}
    >
      <Button
        onClick={onClick}
        disabled={isPending}
        size="lg"
        variant="primary"
      >
        {jwt ? "Connected ✅" : "Login with Wallet"}
      </Button>
    </LiveFeedback>
  );
};
