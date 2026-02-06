

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiPhoneCall, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";

/* 🌐 FAQ CONTENT (EN / TA) */
const FAQ_DATA = {
  en: [
    { q: "🍳 What type of food does EGG! ATM serve?", a: "EGG! ATM serves 30+ varieties of egg-based snacks from classic street food to modern fusion recipes." },
    { q: "🥗 Do you serve vegetarian food?", a: "Yes. Selected pure vegetarian snacks like Veg Cutlet, Pani Puri, and Masala Puri are available." },
    { q: "🔥 What is your most popular dish?", a: "Egg Mixer, Egg Manchurian, Egg Lollipop, and Muttai Mittai are customer favorites." },
    { q: "☕ Do you have tea and coffee options?", a: "Tea, Coffee, Ginger Tea, Black Tea, Black Coffee, Milk, and Horlicks." },
    { q: "🍳 Are traditional egg dishes available?", a: "Half boil, full boil, kalakki, omelette, poriyal, and karandi omelette." },
    { q: "🌶️ Do you serve chaat items?", a: "Egg Chaat, Pani Puri, Masala Puri, Egg Masala Puri." },
    { q: "🍚 Is Egg Fried Rice available?", a: "Yes, Egg Fried Rice (Mini) is available." },
    { q: "💰 Are your prices affordable?", a: "Yes. Designed for high value and daily customers." },
    { q: "👨‍👩‍👧 Is EGG! ATM suitable for students and families?", a: "Perfect for students, families, and working professionals." },
    { q: "🚀 Do you offer franchise opportunities?", a: "Yes! Low investment, high demand, full setup, training, and support." }
  ],
  ta: [
    { q: "🍳 EGG! ATM எந்த வகையான உணவுகளை வழங்குகிறது?", a: "EGG! ATM 30+ வகையான முட்டை சார்ந்த உணவுகளை வழங்குகிறது." },
    { q: "🥗 சைவ உணவுகள் உள்ளதா?", a: "ஆம். வெஜ் கட்லெட், பானி பூரி, மசாலா பூரி கிடைக்கும்." },
    { q: "🔥 அதிகம் விற்கும் உணவு எது?", a: "எக் மிக்சர், எக் மஞ்சூரியன், எக் லாலிபாப், முட்டை மிட்டாய்." },
    { q: "☕ டீ & காபி உள்ளதா?", a: "டீ, காபி, ஜிஞ்சர் டீ, பிளாக் டீ, பால், ஹார்லிக்ஸ் உள்ளது." },
    { q: "🍳 பாரம்பரிய முட்டை உணவுகள் உள்ளதா?", a: "ஹாஃப் பாயில், புல் பாயில், கலக்கி, ஆம்லெட் கிடைக்கும்." },
    { q: "🌶️ சாட் ஐட்டம்கள் உள்ளதா?", a: "எக் சாட், பானி பூரி, மசாலா பூரி கிடைக்கும்." },
    { q: "🍚 எக் ஃப்ரைட் ரைஸ் உள்ளதா?", a: "ஆம், மினி எக் ஃப்ரைட் ரைஸ் உள்ளது." },
    { q: "💰 விலை குறைவாக உள்ளதா?", a: "ஆம். அனைவருக்கும் ஏற்ற விலையில் கிடைக்கும்." },
    { q: "👨‍👩‍👧 மாணவர்களுக்கு ஏற்றதா?", a: "மாணவர்கள் மற்றும் குடும்பங்களுக்கு மிகவும் ஏற்றது." },
    { q: "🚀 பிராஞ்சைஸ் வாய்ப்பு உள்ளதா?", a: "ஆம்! குறைந்த முதலீட்டில் பிராஞ்சைஸ் வாய்ப்பு உள்ளது." }
  ]
};

const Faq = () => {
  const crackRef = useRef(null);
  const steamRef = useRef([]);
  const answerRefs = useRef([]);
  const [active, setActive] = useState(null);
  const [lang, setLang] = useState("en");

  const faqs = FAQ_DATA[lang];

  /* 🎬 GSAP */
  useEffect(() => {
    gsap.fromTo(
      crackRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power4.out" }
    );

    steamRef.current.forEach((s, i) => {
      gsap.fromTo(
        s,
        { y: 120, opacity: 0.08 },
        { y: -160, opacity: 0.18, duration: 14 + i * 2, repeat: -1, ease: "sine.inOut" }
      );
    });
  }, []);

  const toggleFAQ = (index) => {
    if (active === index) {
      gsap.to(answerRefs.current[index], { height: 0, opacity: 0, duration: 0.3 });
      setActive(null);
      return;
    }

    if (active !== null) {
      gsap.to(answerRefs.current[active], { height: 0, opacity: 0, duration: 0.25 });
    }

    gsap.fromTo(
      answerRefs.current[index],
      { height: 0, opacity: 0 },
      { height: "auto", opacity: 1, duration: 0.4 }
    );

    setActive(index);
  };

  useEffect(() => {
  if (!window.whatsappBtn) return;

  const tl = gsap.timeline({ repeat: -1 });

  // breathing + float
  tl.to(window.whatsappBtn, {
    y: -6,
    duration: 2.5,
    ease: "sine.inOut"
  })
  .to(window.whatsappBtn, {
    y: 0,
    duration: 2.5,
    ease: "sine.inOut"
  });

  // glow pulse
  gsap.fromTo(
    window.whatsappBtn.querySelector("span"),
    { scale: 0.8, opacity: 0.4 },
    {
      scale: 1.4,
      opacity: 0,
      duration: 2.8,
      repeat: -1,
      ease: "sine.out"
    }
  );

  // hover micro-interaction
  window.whatsappBtn.addEventListener("mouseenter", () => {
    gsap.to(window.whatsappBtn, { scale: 1.15, duration: 0.25, ease: "power2.out" });
  });

  window.whatsappBtn.addEventListener("mouseleave", () => {
    gsap.to(window.whatsappBtn, { scale: 1, duration: 0.25, ease: "power2.out" });
  });

}, []);


  return (
    <section className="relative bg-black text-white py-32 px-4 overflow-hidden">

      {/* 🌫️ Steam */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (steamRef.current[i] = el)}
            className="absolute left-1/2 w-[120%] h-40 bg-gradient-to-t from-transparent via-amber-400/10 to-transparent blur-3xl"
            style={{ top: `${i * 18}%` }}
          />
        ))}
      </div>

      {/* 🥚 Glow */}
      <div
        ref={crackRef}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-[120px]
                   bg-gradient-to-br from-amber-400/40 to-orange-500/20"
      />

      {/* 🌐 Language Toggle */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        {["en", "ta"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-lg text-sm font-bold ${
              lang === l ? "bg-amber-500 text-black" : "bg-white/10"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20">
          EGG! ATM Franchise FAQs
        </h2>

        <div className="space-y-7">
          {faqs.map((item, index) => (
            <div key={index} className="bg-white/10 rounded-3xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-8 py-6"
              >
                <span className="text-lg font-semibold">{item.q}</span>
                <FiChevronDown className={`transition-transform ${active === index ? "rotate-180" : ""}`} />
              </button>

              <div
                ref={(el) => (answerRefs.current[index] = el)}
                className="px-8 text-gray-300 overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <p className="pb-6">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🚀 FRANCHISE CTA */}
        <div className="mt-28 text-center">
          <h3 className="text-3xl font-bold mb-3">
            Start Your EGG! ATM Franchise Journey
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Low investment • High footfall • Complete training & setup support
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/franchise"
              className="group flex items-center justify-center gap-3 py-4 px-8
                         rounded-2xl font-bold text-lg
                         bg-gradient-to-r from-amber-500 to-orange-500 text-white
                         hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Franchise Details <FiArrowRight />
            </a>

            <a
              href="tel:9629861885"
              className="flex items-center gap-2 text-amber-400 font-semibold hover:underline"
            >
              <FiPhoneCall /> Call for Franchise
            </a>
          </div>
        </div>
      </div>

      {/* 📱 STICKY WHATSAPP */}
<a
  href="https://wa.me/919629861885?text=Hi%20I%20am%20interested%20in%20Egg!%20ATM%20Franchise"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat on WhatsApp for Egg! ATM Franchise"
  className="fixed bottom-6 right-6 z-50
             flex items-center justify-center
             w-14 h-14 rounded-full
             bg-green-500 text-white shadow-xl
             transition-transform"
  ref={el => (window.whatsappBtn = el)}
>
  <FaWhatsapp className="text-2xl relative z-10" />

  {/* glow ring */}
  <span className="absolute inset-0 rounded-full bg-green-400/40 blur-xl" />
</a>


    </section>
  );
};

export default Faq;
