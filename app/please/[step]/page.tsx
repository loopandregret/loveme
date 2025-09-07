"use client";

import { Usable, use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const messages = [
  "Oh come on, please say yes 🥺",
  "Think about how cute we will be together 😍",
  "I promise to bring you food always 🍔",
  "Okay, if you insist... Press No. 😭",
];

export default function PleadPage({ params }: { params: { step: string } }) {
  const router = useRouter();
  const param = use(params as unknown as Usable<{ step: string }>);
  const step = parseInt(param.step);
  const message = messages[step - 1] || messages[messages.length - 1];
  const nextStep = step + 1;

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  useEffect(() => {
    let handler: ((event: MouseEvent | TouchEvent) => void) | null = null;

    if (step >= messages.length && btnRef.current && mainRef.current) {
      const btn = btnRef.current;
      const main = mainRef.current;

      handler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsMoving(true);

        const mainRect = main.getBoundingClientRect();

        const padding = 20;
        const maxX = mainRect.width - (btn.offsetWidth - padding);
        const maxY = mainRect.height - (btn.offsetHeight - padding);

        let x = Math.random() * (maxX + padding);
        let y = Math.random() * (maxY + padding);

        if (x < 120) {
          x = 120 + (Math.random() * (maxX - 120));
        }

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
      };

      btn.addEventListener("mouseover", handler);
      btn.addEventListener("touchstart", handler, { passive: false });
    }

    return () => {
      const btn = btnRef.current;

      if (btn && handler) {
        btn.removeEventListener("mouseover", handler);
        btn.removeEventListener("touchstart", handler);
      }
    }
  }, [step]);

  return (
    <main ref={mainRef} className="relative flex flex-col items-center justify-center h-screen bg-pink-300">
      <h2 className="text-2xl text-center font-regular mb-6">{message}</h2>

      <div className="flex gap-6">
        <button
          onClick={() => router.push('/yes')}
          type="button"
          className="bg-green-500 px-6 py-3 rounded-lg text-white hover:bg-green-600 hover:cursor-pointer"
        >
          Yes
        </button>

        {step < messages.length ? (
          <button
            onClick={() => router.push(`/please/${nextStep}`)}
            type="button"
            className="bg-red-500 px-6 py-3 rounded-lg text-white hover:bg-red-700 hover:cursor-pointer"
          >
            No
          </button>
        ) : (
          <button
            id="noBtn"
            ref={btnRef}
            type="button"
            className="bg-red-500 px-6 py-3 rounded-lg text-white hover:bg-red-700 hover:cursor-pointer"
            style={
              isMoving ? {
                position: "absolute",
                left: "60%",
                top: "60%",
                zIndex: 10,
                transition: "left 0.1s, top 0.1s"
              } : {}
            }
          >
            No
          </button>
        )}
      </div>

      {step === 1 && (
        <div className="mt-8 lg:flex gap-6">
          <img src="/gifs/despicable_me_please.gif" alt="Giphy Please" />
          <img src="/gifs/lilo_stitch_please.gif" alt="Lilo Stitch Please Giphy" />
        </div>
      )}

      {step === 2 && (
        <div className="mt-8">
          <img src="/gifs/in_love_hearts.gif" alt="Giphy Hearts Thoughts" />
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 lg:flex gap-6 items-center justify-center">
          <img src="/gifs/reaction_sad.gif" alt="Giphy Sad" />
        </div>
      )}

      {step === 4 && (
        <div className="mt-8 lg:flex gap-6">
          <img src="/gifs/sad_baby.gif" alt="Sad Baby Giphy" />
          <img src="/gifs/sad_cry.gif" alt="Giphy Desperate Sad" />
        </div>
      )}

      <p className="pt-10 text-center text-gray-200">Pet (truly a boring moment birthed this) project by Azara.</p>
    </main>
  )
}
