"use client";
import { useEffect, useState, useCallback } from "react";
import { MiniKit, Permission } from "@worldcoin/minikit-js";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";

export function NotificationPermission() {
  const [hasRequested, setHasRequested] = useState(false);
  const { isInstalled } = useMiniKit();

  useEffect(() => {
    if (isInstalled && !hasRequested) {
      const t = setTimeout(() => {
        requestNotificationPermission();
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [isInstalled, hasRequested]);

  const requestNotificationPermission = useCallback(async () => {
    if (!isInstalled) {
      alert("MiniKit is not installed. Please open this app in World App.");
      return;
    }

    try {
      const { finalPayload } = await MiniKit.commandsAsync.requestPermission({
        permission: Permission.Notifications,
      });

      if (finalPayload.status === "success") {
        console.log("Notification permission granted:", finalPayload);
      } else {
        // status === 'error'
        console.log("Notification permission denied:", finalPayload);
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    } finally {
      setHasRequested(true);
    }
  }, [isInstalled]);

  return null;
}
