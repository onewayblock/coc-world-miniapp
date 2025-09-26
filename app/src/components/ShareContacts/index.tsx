"use client";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";

import { useCallback, useState } from "react";

type Contact = {
  username: string;
  walletAddress: string;
  profilePictureUrl: string | null;
};

export const ShareContacts = () => {

  const [state, setState] = useState<
    "pending" | "success" | "failed" | undefined
  >();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const onShare = useCallback(async () => {
    setState("pending");
    try {
      const { finalPayload } = await MiniKit.commandsAsync.shareContacts({
        isMultiSelectEnabled: true,
        inviteMessage: "Join me in this mini app!",
      });

      if (finalPayload.status === "success") {
        setContacts(finalPayload.contacts ?? []);
        setState("success");
      } else {
        console.error("Share contacts error", finalPayload);
        setState("failed");
      }
    } catch (error) {
      console.error("Share contacts threw", error);
      setState("failed");
    }
  }, []);

  return (
    <div className="grid w-full gap-3">
      <LiveFeedback
        label={{
          pending: "Requesting...",
          success: "Received",
          failed: "Failed",
        }}
        state={state}
      >
        <div className="grid justify-items-center gap-2">
          <div className="w-[240px]">
            <Button size="lg" variant="primary" onClick={onShare}>
              Share Contacts
            </Button>
          </div>
        </div>
      </LiveFeedback>

      {contacts.length > 0 && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3">
          <p className="mb-2 text-sm font-medium text-white">
            Selected Contacts
          </p>
          <ul className="grid gap-2">
            {contacts.map((c) => (
              <li
                key={`${c.username}-${c.walletAddress}`}
                className="flex items-center justify-between rounded-lg border border-neutral-800/60 px-3 py-2"
              >
                <span className="text-sm text-white">{c.username}</span>
                <span className="truncate text-xs text-neutral-400">
                  {c.walletAddress}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareContacts;
