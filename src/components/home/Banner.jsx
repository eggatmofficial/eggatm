
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import banner1 from "../../assets/imges/banner1.jpg";
// import banner2 from "../../assets/imges/banner2.jpg";
// import banner3 from "../../assets/imges/banner3.jpg";
// import banner4 from "../../assets/imges/banner4.jpg";
// import banner5 from "../../assets/imges/banner5.jpg";

// const banners = [
//   { image: banner1, title: "Farm Fresh Eggs", subtitle: "Pure • Healthy • Protein Rich" },
//   { image: banner2, title: "Healthy Protein Everyday", subtitle: "Perfect for Home & Business" },
//   { image: banner3, title: "Premium Egg Collection", subtitle: "Brown • Organic • Quality Eggs" },
//   { image: banner4, title: "Fresh From Farm", subtitle: "Delivered Straight To You" },
//   { image: banner5, title: "EGG! ATM Quality Promise", subtitle: "Freshness Guaranteed • Every Order" },
// ];

// /* ---------------- TEXT ANIMATIONS ---------------- */

// // Slide 1 – Letter rise
// const LetterRise = ({ text }) => (
//   <div className="flex justify-center flex-wrap">
//     {text.split("").map((c, i) => (
//       <motion.span
//         key={i}
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: i * 0.04, type: "spring", stiffness: 120 }}
//         className="inline-block"
//       >
//         {c === " " ? "\u00A0" : c}
//       </motion.span>
//     ))}
//   </div>
// );

// // Slide 2 – Word slide
// const WordSlide = ({ text }) => (
//   <div className="flex flex-wrap justify-center gap-x-4">
//     {text.split(" ").map((w, i) => (
//       <motion.span
//         key={i}
//         initial={{ x: i % 2 === 0 ? -80 : 80, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: i * 0.15, duration: 0.6 }}
//         className="inline-block"
//       >
//         {w}
//       </motion.span>
//     ))}
//   </div>
// );

// // Slide 3 – Mask reveal
// const MaskReveal = ({ text }) => (
//   <motion.div
//     initial={{ clipPath: "inset(0 0 100% 0)" }}
//     animate={{ clipPath: "inset(0 0 0% 0)" }}
//     transition={{ duration: 0.8, ease: "easeOut" }}
//   >
//     {text}
//   </motion.div>
// );

// // Slide 4 – Glow pulse
// const GlowPulse = ({ text }) => (
//   <motion.div
//     animate={{
//       scale: [1, 1.06, 1],
//       textShadow: [
//         "0 0 10px rgba(251,191,36,0.4)",
//         "0 0 30px rgba(251,191,36,0.9)",
//         "0 0 10px rgba(251,191,36,0.4)",
//       ],
//     }}
//     transition={{ duration: 2.5, repeat: Infinity }}
//   >
//     {text}
//   </motion.div>
// );

// const renderTitle = (index, title) => {
//   switch (index) {
//     case 0:
//       return <LetterRise text={title} />;
//     case 1:
//       return <WordSlide text={title} />;
//     case 2:
//       return <MaskReveal text={title} />;
//     case 3:
//       return <GlowPulse text={title} />;
//     default:
//       return title;
//   }
// };

// /* ---------------- COMPONENT ---------------- */

// const Banner = () => {
//   const [index, setIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((p) => (p + 1) % banners.length);
//     }, 4500);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="relative h-[35vh] sm:h-[55vh] md:h-[70vh] lg:h-[90vh] overflow-hidden bg-black">
//       <AnimatePresence>
//         <motion.div
//           key={index}
//           className="absolute inset-0"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Background */}
//           <motion.img
//             src={banners[index].image}
//             alt="Banner"
//             className="absolute inset-0 w-full h-full object-cover"
//             animate={{ scale: [1, 1.05, 1] }}
//             transition={{ duration: 14, repeat: Infinity }}
//           />

//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black/40" />

//           {/* Content */}
//           <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
//             <div className="text-white max-w-4xl">
//               <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 leading-tight">
//                 {renderTitle(index, banners[index].title)}
//               </h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="text-base sm:text-lg md:text-2xl mb-6 md:mb-10"
//               >
//                 {banners[index].subtitle}
//               </motion.p>

//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/products")}
//                 className="px-10 md:px-14 py-3 md:py-4 bg-amber-500 rounded-full font-bold"
//               >
//                 Shop Now
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </AnimatePresence>
//     </section>
//   );
// };

// export default Banner;




import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import banner1 from "../../assets/imges/banner1.jpg";
import banner2 from "../../assets/imges/banner2.jpg";
import banner3 from "../../assets/imges/banner3.jpg";
import banner4 from "../../assets/imges/banner4.jpg";
import banner5 from "../../assets/imges/banner5.jpg";

/* ---------------- BANNER CONTENT ---------------- */

const banners = [
  {
    image: banner1,
    title: "Fresh Eggs Everyday",
    subtitle: "Collected Daily • 100% Natural • No Chemicals",
  },
  {
    image: banner2,
    title: "Protein You Can Trust",
    subtitle: "Fuel Your Family • Fitness • Food Business",
  },
  {
    image: banner3,
    title: "Premium Egg Collection",
    subtitle: "Brown • Organic • Omega-3 Rich Eggs",
  },
  {
    image: banner4,
    title: "From Farm to Doorstep",
    subtitle: "Cold Stored • Hygienic • Fast Delivery",
  },
  {
    image: banner5,
    title: "EGG! ATM Quality Promise",
    subtitle: "Freshness Guaranteed • Every Order",
  },
];

/* ---------------- TEXT ANIMATIONS ---------------- */

const LetterRise = ({ text }) => (
  <div className="flex justify-center flex-wrap">
    {text.split("").map((c, i) => (
      <motion.span
        key={i}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: i * 0.04, type: "spring", stiffness: 120 }}
        className="inline-block"
      >
        {c === " " ? "\u00A0" : c}
      </motion.span>
    ))}
  </div>
);

const WordSlide = ({ text }) => (
  <div className="flex flex-wrap justify-center gap-x-4">
    {text.split(" ").map((w, i) => (
      <motion.span
        key={i}
        initial={{ x: i % 2 === 0 ? -80 : 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: i * 0.15, duration: 0.6 }}
      >
        {w}
      </motion.span>
    ))}
  </div>
);

const MaskReveal = ({ text }) => (
  <motion.div
    initial={{ clipPath: "inset(0 0 100% 0)" }}
    animate={{ clipPath: "inset(0 0 0% 0)" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {text}
  </motion.div>
);

const GlowPulse = ({ text }) => (
  <motion.div
    animate={{
      scale: [1, 1.06, 1],
      textShadow: [
        "0 0 10px rgba(251,191,36,0.4)",
        "0 0 30px rgba(251,191,36,0.9)",
        "0 0 10px rgba(251,191,36,0.4)",
      ],
    }}
    transition={{ duration: 2.5, repeat: Infinity }}
  >
    {text}
  </motion.div>
);

const renderTitle = (index, title) => {
  switch (index) {
    case 0:
      return <LetterRise text={title} />;
    case 1:
      return <WordSlide text={title} />;
    case 2:
      return <MaskReveal text={title} />;
    case 3:
      return <GlowPulse text={title} />;
    default:
      return title;
  }
};

/* ---------------- COMPONENT ---------------- */

const Banner = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((p) => (p + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[35vh] sm:h-[55vh] md:h-[70vh] lg:h-[90vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background */}
          <motion.img
            src={banners[index].image}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 14, repeat: Infinity }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Floating particles */}
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                }}
                animate={{ y: ["0%", "-120%"] }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </motion.div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
            <div className="text-white max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 leading-tight">
                {renderTitle(index, banners[index].title)}
              </h1>

              {/* Subtitle wave */}
              <motion.p
                className="text-base sm:text-lg md:text-2xl mb-6 md:mb-10 flex justify-center flex-wrap gap-x-2"
              >
                {banners[index].subtitle.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(251,191,36,0.4)",
                    "0 0 40px rgba(251,191,36,0.9)",
                    "0 0 0 rgba(251,191,36,0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => navigate("/products")}
                className="px-10 md:px-14 py-3 md:py-4 bg-amber-500 rounded-full font-bold text-black"
              >
                Explore Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Banner;
