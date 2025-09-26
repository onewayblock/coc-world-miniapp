"use client";
import { useEffect, useState } from "react";
import { Preloader } from "./Preloader";

export const PreloaderGate = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 10 + 5);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 400);
        }
        return next;
      });
    }, 300);
    return () => clearInterval(timer);
  }, []);

  if (!done) {
    return <Preloader value={progress} />;
  }
  return <>{children}</>;
};

export default PreloaderGate;
