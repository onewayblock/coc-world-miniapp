import { Page } from "@/components/PageLayout";
import { PirateBanner } from "@/components/banner/ui/PirateBanner";
import PreloaderGate from "@/components/preloader/PreloaderGate";

export default function PiratePage() {
  return (
    <Page>
      <Page.Main className="flex min-h-screen items-center justify-center">
        <PreloaderGate>
          <PirateBanner />
        </PreloaderGate>
      </Page.Main>
    </Page>
  );
}
