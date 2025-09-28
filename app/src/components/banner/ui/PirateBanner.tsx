import { Fragment } from "react";

export function PirateBanner() {
  return (
    <Fragment>
      <div
        className="fixed inset-0 flex items-start justify-center pt-20 bg-cover bg-right bg-no-repeat z-50"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundPosition: "75% center",
        }}
      >
        <div className="w-full max-w-md mx-auto px-4">
          <div className="relative bg-black/60 backdrop-blur-md p-6 frame-border">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-white uppercase mb-4">
                Sign in with World App
              </h1>
              <p className="text-sm text-gray-300 uppercase leading-relaxed">
                To continue, Sign in with your World App and dive into Clash of
                Coins a world of fictional characters, clever riddles, and
                thrilling conversations waiting to challenge your mind.
              </p>
            </div>
          </div>
        </div>
        <img
          src="/images/mascot.png"
          className="absolute -right-[50px] min-[1920px]:right-0 min-[1920px]:max-h-[65dvh] md:max-h-[43dvh] min-[1025px]:max-h-[73%] 2xl:max-h-full min-[2392px]:h-[70%] lg:max-w-full bottom-0 md:bottom-10 min-[2392px]:bottom-20 w-auto object-contain overflow-x-hidden lg:overflow-hidden z-50 min-[1025px]:z-auto max-h-[42dvh]"
          alt="mascot"
        />
      </div>
    </Fragment>
  );
}
