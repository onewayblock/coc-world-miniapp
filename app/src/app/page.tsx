import { Page } from "@/components/PageLayout";
import { AuthButton } from "../components/AuthButton";
import OnePay from "@/components/OnePay";
import AddMoney from "@/components/AddMoney";
import { UserInfo } from "@/components/UserInfo";
import SendTxExamples from "@/components/SendTxExamples";
import ShareContacts from "@/components/ShareContacts";
import GetPermissions from "@/components/GetPermissions";
import SendHaptics from "@/components/SendHaptics";
import Share from "@/components/Share";
import PreloaderGate from "@/components/preloader/PreloaderGate";

export default function Home() {
  return (
    <Page>
      <Page.Main className="flex min-h-[60vh] items-center justify-center p-4">
        <PreloaderGate>
          <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 shadow-lg backdrop-blur">
            <div className="space-y-4 text-center">
              <div className="mt-2 grid justify-items-center gap-3">
                <div className="w-full">
                  <UserInfo />
                </div>
                <div className="w-[240px]">
                  <AuthButton />
                </div>
                <div className="w-[240px]">
                  <OnePay
                    appId={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
                    recipient={
                      process.env.NEXT_PUBLIC_MERCHANT_ADDRESS as `0x${string}`
                    }
                    amountUSDC={
                      process.env.NEXT_PUBLIC_ONEPAY_AMOUNT_USDC || "1"
                    }
                  />
                </div>
                <div className="w-[240px]">
                  <AddMoney
                    appId={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
                    toAddress={
                      process.env.NEXT_PUBLIC_ADD_MONEY_TO as `0x${string}`
                    }
                    toToken={
                      process.env.NEXT_PUBLIC_ADD_MONEY_TOKEN as `0x${string}`
                    }
                    amountUsd={
                      process.env.NEXT_PUBLIC_ADD_MONEY_AMOUNT_USD || "100"
                    }
                    sourceAppId={
                      process.env.NEXT_PUBLIC_APP_ID as `app_${string}`
                    }
                    sourceAppName={
                      process.env.NEXT_PUBLIC_SOURCE_APP_NAME || "My App"
                    }
                    sourceDeeplinkPath={"/"}
                  />
                </div>
                <div className="w-full pt-2">
                  <SendTxExamples />
                </div>
                <div className="w-full pt-2">
                  <ShareContacts />
                </div>
                <div className="w-full pt-2">
                  <GetPermissions />
                </div>
                <div className="w-full pt-2">
                  <SendHaptics />
                </div>
                <div className="w-full pt-2">
                  <Share />
                </div>
              </div>
            </div>
          </div>
        </PreloaderGate>
      </Page.Main>
    </Page>
  );
}
