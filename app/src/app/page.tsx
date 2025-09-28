import { Page } from "@/components/PageLayout";

import PreloaderGate from "@/components/preloader/PreloaderGate";
import { Navigation } from "@/components/Navigation";
import { UserProfile } from "@/components/UserProfile";
import { RewardsSection } from "@/components/RewardsSection";

import { NotificationPermission } from "@/components/NotificationPermission";
import { HowItWorksModal } from "@/components/HowItWorksModal";
import { AuthButton } from "@/components/AuthButton";

export default function Home() {
  return (
    <Page>
      <Page.Main className="relative flex flex-col justify-start px-4 sm:px-6 pt-10 min-h-full pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(82, 97, 255, 0.00) 0%, rgba(82, 97, 255, 0.12) 30.11%, rgba(82, 97, 255, 0.46) 82.11%, #5261FF 100%)",
            backgroundPosition: "75% center",
          }}
        />
        <PreloaderGate>
          <div className="w-full">
            <div className="space-y-4">
              <div className="mt-2 flex flex-col gap-4">
                <div className="w-full">
                  <UserProfile />
                </div>
                <div className="w-full flex justify-start">
                  <AuthButton />
                </div>

                <div className="w-full">
                  <RewardsSection />
                  <HowItWorksModal />
                </div>
              </div>
            </div>
          </div>
        </PreloaderGate>
        <NotificationPermission />
        <Navigation />
      </Page.Main>
    </Page>
  );
}
