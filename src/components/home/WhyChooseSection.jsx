import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEgg, FaBolt, FaLeaf, FaSmile } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseEggATMSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 80,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-20 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="reveal text-3xl md:text-4xl font-bold text-gray-800">
          Why Choose <span className="text-orange-500">EGG! ATM?</span>
        </h2>

        <p className="reveal mt-4 text-gray-600 max-w-2xl mx-auto">
          We deliver fresh, hygienic, and perfectly cooked eggs anytime, anywhere.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <Feature
            icon={<FaEgg />}
            title="Fresh Eggs"
            text="Farm-fresh eggs cooked on demand."
          />
          <Feature
            icon={<FaBolt />}
            title="Fast Service"
            text="Hot eggs in under 60 seconds."
          />
          <Feature
            icon={<FaLeaf />}
            title="Hygienic"
            text="Zero-hand contact automated cooking."
          />
          <Feature
            icon={<FaSmile />}
            title="Franchise Opportunity"
            text="Start your own EGG! ATM with low investment & high returns."
            />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="reveal p-6 bg-gray-50 rounded-2xl shadow-sm">
      <div className="text-orange-500 text-3xl mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{text}</p>
    </div>
  );
}
