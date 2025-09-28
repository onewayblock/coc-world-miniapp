"use client";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";

export const SendHaptics = () => {
  const { isInstalled } = useMiniKit();

  const send = (payload: {
    hapticsType: "impact" | "notification" | "selectionChanged";
    style?: "light" | "medium" | "heavy" | "success" | "warning" | "error";
  }) => {
    if (!isInstalled) {
      alert("Open in World App to experience haptics.");
      return;
    }
    // No response expected from this command per docs
    // https://docs.world.org/mini-apps/commands/send-haptic-feedback
    // @ts-expect-error lib typing accepts union shapes
    MiniKit.commands.sendHapticFeedback(payload);
  };

  return (
    <div className="grid w-full gap-2">
      <div className="grid grid-cols-3 gap-2">
        <Button
          size="lg"
          variant="secondary"
          className="text-white"
          onClick={() => send({ hapticsType: "impact", style: "light" })}
        >
          Impact Light
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="text-white"
          onClick={() => send({ hapticsType: "impact", style: "medium" })}
        >
          Impact Medium
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="text-white"
          onClick={() => send({ hapticsType: "impact", style: "heavy" })}
        >
          Impact Heavy
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Button
          size="lg"
          variant="secondary"
          className="text-white"
          onClick={() =>
            send({ hapticsType: "notification", style: "success" })
          }
        >
          Success
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="text-white"
          onClick={() =>
            send({ hapticsType: "notification", style: "warning" })
          }
        >
          Warning
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="text-white"
          onClick={() => send({ hapticsType: "notification", style: "error" })}
        >
          Error
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Button
          size="lg"
          variant="secondary"
          className="text-white"
          onClick={() => send({ hapticsType: "selectionChanged" })}
        >
          Selection Changed
        </Button>
      </div>
    </div>
  );
};

export default SendHaptics;
