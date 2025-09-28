"use client";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";
import { useCallback, useState } from "react";

type PermissionState = Record<string, boolean>;

export const GetPermissions = () => {
  const { isInstalled } = useMiniKit();
  const [state, setState] = useState<
    "pending" | "success" | "failed" | undefined
  >();
  const [permissions, setPermissions] = useState<PermissionState | null>(null);

  const onGet = useCallback(async () => {
    if (!isInstalled) {
      alert("Open in World App to check permissions.");
      return;
    }
    setState("pending");
    try {
      const { finalPayload } = await MiniKit.commandsAsync.getPermissions();
      if (finalPayload.status === "success") {
        const normalized: PermissionState = finalPayload.permissions || {};
        setPermissions(normalized);
        setState("success");
      } else {
        console.error("getPermissions error", finalPayload);
        setState("failed");
      }
    } catch (error) {
      console.error("getPermissions threw", error);
      setState("failed");
    }
  }, [isInstalled]);

  return (
    <div className="grid w-full gap-3">
      <LiveFeedback
        label={{ pending: "Checking...", success: "Loaded", failed: "Failed" }}
        state={state}
      >
        <div className="grid justify-items-center gap-2">
          <div className="w-[240px]">
            <Button size="lg" variant="primary" onClick={onGet}>
              Get Permissions
            </Button>
          </div>
        </div>
      </LiveFeedback>

      {permissions && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3">
          <p className="mb-2 text-sm font-medium text-white">Permissions</p>
          <ul className="grid gap-2">
            {Object.entries(permissions).map(([key, value]) => (
              <li
                key={key}
                className="flex items-center justify-between rounded-lg border border-neutral-800/60 px-3 py-2"
              >
                <span className="text-sm text-white">{key}</span>
                <span className="text-xs text-neutral-400">
                  {value ? "granted" : "not granted"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetPermissions;
