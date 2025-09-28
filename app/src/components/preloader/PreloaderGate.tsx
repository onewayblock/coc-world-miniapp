"use client";
import { useEffect, useState } from "react";
import { Preloader } from "./Preloader";
import { PirateBanner } from "@/components/banner/ui/PirateBanner";

export const PreloaderGate = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 10 + 5);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setDone(true);
            setShowBanner(true);
          }, 400);
        }
        return next;
      });
    }, 300);
    return () => clearInterval(timer);
  }, []);

  // Автоматически скрыть баннер через 5 секунд
  useEffect(() => {
    if (showBanner) {
      const bannerTimer = setTimeout(() => {
        setShowBanner(false);
      }, 5000);
      return () => clearTimeout(bannerTimer);
    }
  }, [showBanner]);

  if (!done) {
    return <Preloader value={progress} />;
  }

  if (showBanner) {
    return <PirateBanner />;
  }

  return <>{children}</>;
};

export default PreloaderGate;
