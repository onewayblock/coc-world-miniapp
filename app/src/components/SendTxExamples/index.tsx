"use client";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";
import { useState } from "react";
import TestContract from "@/abi/TestContract.json";

// Minimal ABI for Forward.sol payable helper
const ForwardABI = [
  {
    name: "pay",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "to", type: "address" }],
    outputs: [],
  },
];

export const SendTxExamples = () => {
  const { isInstalled } = useMiniKit();
  const [state, setState] = useState<
    "pending" | "success" | "failed" | undefined
  >();

  const onSimpleContractCall = async () => {
    if (!isInstalled) return alert("Open in World App to send transactions.");
    setState("pending");
    try {
      const contractAddress = process.env
        .NEXT_PUBLIC_TESTCONTRACT_ADDRESS as `0x${string}`;
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: contractAddress,
            abi: TestContract as unknown as readonly unknown[],
            functionName: "mintToken",
            args: [],
          },
        ],
      });
      setState(finalPayload.status === "success" ? "success" : "failed");
    } catch (e) {
      console.error("sendTransaction simple error", e);
      setState("failed");
    }
  };

  const onSendEth = async () => {
    if (!isInstalled) return alert("Open in World App to send transactions.");
    setState("pending");
    try {
      const forwardAddress = process.env
        .NEXT_PUBLIC_FORWARD_ADDRESS as `0x${string}`;
      const to = process.env.NEXT_PUBLIC_ETH_RECIPIENT as `0x${string}`;
      const valueHex = process.env.NEXT_PUBLIC_ETH_VALUE_HEX || "0x9184E72A000"; // 0.00001 ETH
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: forwardAddress,
            abi: ForwardABI as unknown as readonly unknown[],
            functionName: "pay",
            args: [to],
            value: valueHex,
          },
        ],
      });
      setState(finalPayload.status === "success" ? "success" : "failed");
    } catch (e) {
      console.error("sendTransaction eth error", e);
      setState("failed");
    }
  };

  const onPermit2Transfer = async () => {
    if (!isInstalled) return alert("Open in World App to send transactions.");
    setState("pending");
    try {
      const token = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`;
      const spender = process.env.NEXT_PUBLIC_PERMIT2_SPENDER as `0x${string}`; // contract that will pull tokens
      const to = process.env.NEXT_PUBLIC_PERMIT2_TO as `0x${string}`;
      const requestedAmount =
        process.env.NEXT_PUBLIC_PERMIT2_AMOUNT_WEI ||
        (0.5 * 10 ** 18).toString();

      const permitTransfer = {
        permitted: { token, amount: requestedAmount },
        nonce: Date.now().toString(),
        deadline: Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString(),
        spender,
      } as const;

      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: spender,
            abi: TestContract as unknown as readonly unknown[],
            functionName: "signatureTransfer",
            args: [
              [
                [
                  permitTransfer.permitted.token,
                  permitTransfer.permitted.amount,
                ],
                permitTransfer.nonce,
                permitTransfer.deadline,
              ],
              [to, requestedAmount],
              "PERMIT2_SIGNATURE_PLACEHOLDER_0",
            ],
          },
        ],
        permit2: [
          {
            permitted: permitTransfer.permitted,
            spender: permitTransfer.spender,
            nonce: permitTransfer.nonce,
            deadline: permitTransfer.deadline,
          },
        ],
      });
      setState(finalPayload.status === "success" ? "success" : "failed");
    } catch (e) {
      console.error("sendTransaction permit2 error", e);
      setState("failed");
    }
  };

  return (
    <div className="grid w-full gap-3">
      <LiveFeedback
        label={{ pending: "Sending...", success: "Success", failed: "Failed" }}
        state={state}
      >
        <div className="grid justify-items-center gap-2">
          <div className="w-[240px]">
            <Button size="lg" variant="primary" onClick={onSimpleContractCall}>
              Call Contract (mintToken)
            </Button>
          </div>
          <div className="w-[240px]">
            <Button size="lg" variant="primary" onClick={onSendEth}>
              Send ETH (payable)
            </Button>
          </div>
          <div className="w-[240px]">
            <Button size="lg" variant="primary" onClick={onPermit2Transfer}>
              Permit2 Transfer
            </Button>
          </div>
        </div>
      </LiveFeedback>
    </div>
  );
};

export default SendTxExamples;
