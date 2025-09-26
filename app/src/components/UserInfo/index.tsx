"use client";
import { CircularIcon, Marble } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";
import { CheckCircleSolid } from "iconoir-react";

/**
 * Minikit is only available on client side. Thus user info needs to be rendered on client side.
 * UserInfo component displays user information including profile picture, username, and verification status.
 * It uses the Marble component from the mini-apps-ui-kit-react library to display the profile picture.
 * The component is client-side rendered.
 */
export const UserInfo = () => {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3">
      <Marble src={MiniKit.user?.profilePictureUrl} className="w-12" />
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold capitalize text-white">
          {MiniKit.user?.username || "Guest"}
        </span>
        {MiniKit.user?.profilePictureUrl && (
          <CircularIcon size="sm" className="ml-0">
            <CheckCircleSolid className="text-blue-500" />
          </CircularIcon>
        )}
      </div>
    </div>
  );
};
