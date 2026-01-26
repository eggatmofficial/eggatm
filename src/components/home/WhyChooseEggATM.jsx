

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import crackSound from "../../assets/sounds/egg-crack.mp3";

import egg1 from "../../assets/whychoose/egg1.png";
import egg2 from "../../assets/whychoose/egg2.png";
import egg3 from "../../assets/whychoose/egg3.png";
import egg4 from "../../assets/whychoose/egg4.png";
import egg5 from "../../assets/whychoose/egg5.png";

import shellLeft from "../../assets/whychoose/egg6.png";
import shellRight from "../../assets/whychoose/egg7.png";
import yolk from "../../assets/whychoose/egg8.png";

const WhyChooseEggATM =()=> {
  const eggRef = useRef(null);
  const framesRef = useRef([]);
  const shellLeftRef = useRef(null);
  const shellRightRef = useRef(null);
  const yolkRef = useRef(null);
  const contentRef = useRef(null);

  const audioRef = useRef(null);
  const [cracked, setCracked] = useState(false);

  /* 🥚 tap egg */
  const handleCrack = () => {
    if (cracked) return;

    // 🔊 play sound (user gesture)
    const audio = new Audio(crackSound);
    audio.volume = 0.7;
    audioRef.current = audio;
    audio.play().catch(() => {});

    setCracked(true);
  };

  /* 🎬 animation */
  useLayoutEffect(() => {
    if (!cracked) return;

    const tl = gsap.timeline();

    tl.to(eggRef.current, {
      scale: 1.05,
      rotateZ: 4,
      duration: 0.25,
      yoyo: true,
      repeat: 2
    });

    framesRef.current.forEach((el, i) => {
      tl.to(el, { opacity: 0 }, i === 0 ? "<" : ">");
      if (framesRef.current[i + 1]) {
        tl.to(framesRef.current[i + 1], { opacity: 1 }, "<");
      }
    });

    tl.to(shellLeftRef.current, {
      y: 120,
      rotate: -300,
      x: -60,
      duration: 0.6
    });

    tl.to(
      shellRightRef.current,
      {
        y: 120,
        rotate: 300,
        x: 60,
        duration: 0.6
      },
      "<"
    );

    tl.fromTo(
      yolkRef.current,
      { scale: 0, y: 0 },
      { scale: 1, y: 90, duration: 0.6 }
    );

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    );
  }, [cracked]);

  return (
 <section
  className="
    bg-[#fff7ec]
    flex flex-col items-center
    px-4 pt-6 pb-16
    md:pb-24
    min-h-auto
    md:min-h-[100svh]
  "
>

      {/* 🥚 Egg (top on mobile) */}
      <div
        ref={eggRef}
        onClick={handleCrack}
        className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-[26rem] md:h-[26rem] cursor-pointer select-none"
      >
        {[egg1, egg2, egg3, egg4, egg5].map((img, i) => (
          <img
            key={i}
            ref={(el) => (framesRef.current[i] = el)}
            src={img}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ opacity: i === 0 ? 1 : 0 }}
            alt=""
          />
        ))}

        <img
          ref={shellLeftRef}
          src={shellLeft}
          className="absolute left-0 top-1/2 w-28 pointer-events-none"
          alt=""
        />
        <img
          ref={shellRightRef}
          src={shellRight}
          className="absolute right-0 top-1/2 w-28 pointer-events-none"
          alt=""
        />
        <img
          ref={yolkRef}
          src={yolk}
          className="absolute top-1/2 left-1/2 w-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          alt=""
        />
      </div>

      {!cracked && (
        <p className="mt-2 text-sm text-gray-500 animate-pulse">
          👆 Tap the egg
        </p>
      )}

      {/* 📦 Content */}
 <div
  ref={contentRef}
  className={`
    text-center px-2 opacity-0
    transition-all duration-300
    ${cracked ? "mt-[-90px] sm:mt-4 md:mt-20" : "mt-6 sm:mt-8 md:mt-20"}
  `}
>


        <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
          Quality Guaranteed
        </h2>
        <p className="text-base md:text-xl text-gray-600 max-w-xl mx-auto">
          Every egg is hand-inspected and cooked fresh on demand.
        </p>
      </div>
    </section>
  );
}



export default WhyChooseEggATM