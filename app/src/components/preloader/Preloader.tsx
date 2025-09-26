import Lottie from "lottie-react";
import { FC, useEffect, useMemo, useState } from "react";

import { cn } from "@shared/lib";
import { Progress } from "@shared/ui/progress";

import loader from "./assets/loader.json";
import { useTranslation } from "react-i18next";

type PreloaderProps = {
  value: number;
};

export const Preloader: FC<PreloaderProps> = ({ value }) => {
  const { t, i18n } = useTranslation();
  const [, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const tips = useMemo(() => {
    const tipsObject = t("preloader.tips", { returnObjects: true });

    return Object.values(tipsObject);
  }, [i18n.language, t]);

  useEffect(() => {
    if (!tips.length) return;

    const cycleTips = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
        setIsVisible(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(cycleTips);
  }, [tips]);

  return (
    <div className="w-full h-full flex flex-col justify-end items-center fixed inset-0 z-30 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-preloader before:bg-contain before:bg-repeat bg-[#23263A]">
      <div
        className="absolute top-0 left-0 h-full w-full transition-all opacity-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(82, 97, 255, 0.00) 0%, rgba(82, 97, 255, 0.12) 30.11%, rgba(82, 97, 255, 0.46) 82.11%, #5261FF 100%)",
          transform: `translateX(-${100 - (Math.floor(value) || 0)}%)`,
        }}
      />

      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <Lottie animationData={loader} loop={true} className="size-52" />
      </div>

      <div className="flex flex-col gap-2 font-jura mb-32">
        <span className="text-2xl font-bold uppercase"></span>
        <span
          className={cn(
            "font-jura text-[#9DAFFE] text-center font-semibold leading-[1.2] transition-opacity duration-1000 w-80 lg:w-[500px] h-6",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        ></span>
      </div>

      <span className="font-jura text-2xl font-bold uppercase mb-5 z-50">
        {Math.floor(value)}%
      </span>

      <div className="w-full relative">
        <Progress value={Math.floor(value)} className="h-[9px]" />
      </div>
    </div>
  );
};

export const LottiePreloader = () => {
  return (
    <div className="w-full h-full flex flex-col justify-end items-center absolute inset-0 z-30 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-preloader before:bg-contain before:bg-repeat  bg-[#23263A]">
      <Lottie
        animationData={loader}
        loop={true}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-52"
      />
    </div>
  );
};

export const CrossmintPreloader = () => {
  return <Lottie animationData={loader} loop={true} />;
};
