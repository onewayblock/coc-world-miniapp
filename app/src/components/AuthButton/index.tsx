"use client";
import { useLoginWithSiwe } from "@privy-io/react-auth";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";
import { useCallback, useState } from "react";

/**
 * This component is an example of how to authenticate a user
 * We will use Next Auth for this example, but you can use any auth provider
 * Read More: https://docs.world.org/mini-apps/commands/wallet-auth
 */
export const AuthButton = () => {
  const [isPending, setIsPending] = useState(false);
  const { isInstalled } = useMiniKit();
  const { generateSiweNonce, loginWithSiwe } = useLoginWithSiwe();

  const signIn = async () => {
    const privyNonce = await generateSiweNonce();
    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
      nonce: privyNonce
    });

    if (finalPayload.status === "error") {
      //TODO: handle error
      return;
    }

    const { message, signature } = finalPayload;
    const user = await loginWithSiwe({ message, signature });
    const userInfo = await MiniKit.getUserByAddress(user.wallet!.address);

    console.log(userInfo);
  };

  const onClick = useCallback(async () => {
    // if (!isInstalled || isPending) {
    //   return;
    // }
    setIsPending(true);
    try {
      await signIn();
    } catch (error) {
      console.error("Wallet authentication button error", error);
      setIsPending(false);
      return;
    }

    setIsPending(false);
  }, [isInstalled, isPending]);

  return (
    <LiveFeedback
      label={{
        failed: "Failed to login",
        pending: "Logging in",
        success: "Logged in"
      }}
      state={isPending ? "pending" : undefined}
    >
      <Button onClick={onClick} disabled={isPending} size="lg" variant="primary">
        Login with Wallet
      </Button>
    </LiveFeedback>
  );
};
