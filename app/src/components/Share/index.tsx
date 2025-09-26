"use client";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";
import { useCallback, useState } from "react";

export const Share = () => {
  const { isInstalled } = useMiniKit();
  const [state, setState] = useState<
    "pending" | "success" | "failed" | undefined
  >();

  const onShare = useCallback(async () => {
    if (!isInstalled) {
      alert("Open in World App to use Share.");
      return;
    }
    setState("pending");
    try {
      await MiniKit.commandsAsync.share({
        title: "Invite Link",
        text: "Use this invite code to join my mini app",
        url: "https://worldcoin.org",
      });
      // No response guaranteed per docs; treat as success for UX
      setState("success");
      setTimeout(() => setState(undefined), 1500);
    } catch (error) {
      console.error("Share command error", error);
      setState("failed");
      setTimeout(() => setState(undefined), 2000);
    }
  }, [isInstalled]);

  return (
    <div className="grid w-full gap-3">
      <LiveFeedback
        label={{
          pending: "Opening share...",
          success: "Opened",
          failed: "Failed",
        }}
        state={state}
      >
        <div className="grid justify-items-center">
          <div className="w-[240px]">
            <Button size="lg" variant="primary" onClick={onShare}>
              Invite Friends
            </Button>
          </div>
        </div>
      </LiveFeedback>
    </div>
  );
};

export default Share;
