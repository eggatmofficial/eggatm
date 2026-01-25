import { FaUserShield, FaLock, FaDatabase, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { useEffect, useRef } from "react";

const PrivacyPolicy = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-show");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      title: "Information We Collect",
      icon: <FaDatabase />,
      content: [
        "Personal details",
        "Delivery address & order details",
        "Payment info via secure gateway",
      ],
    },
    {
      title: "How We Use Your Data",
      icon: <FaCheckCircle />,
      content:
        "We use your data to process orders, provide support, improve services, and send important updates.",
    },
    {
      title: "Data Security",
      icon: <FaLock />,
      content:
        "We implement strict security measures to protect your personal data.",
    },
    {
      title: "Sharing of Information",
      icon: <FaUserShield />,
      content:
        "We never sell your data. Information is shared only with trusted partners.",
    },
    {
      title: "Your Rights",
      icon: <FaCheckCircle />,
      content:
        "You can access, update, or delete your data anytime by contacting support.",
    },
    {
      title: "Contact Us",
      icon: <FaEnvelope />,
      content:
        "For privacy-related questions, contact support@eggatm.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 overflow-x-hidden">

      {/* Header */}
      <div className="relative bg-gradient-to-r from-amber-500 to-yellow-500 py-20 text-center">
        <FaUserShield className="mx-auto text-6xl text-white mb-5 animate-float" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          Privacy Policy
        </h1>
        <p className="text-white/90 mt-3 max-w-xl mx-auto">
          Your privacy is important to us
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-8">
        {sections.map((sec, i) => (
          <section
            key={i}
            ref={(el) => (sectionsRef.current[i] = el)}
            className="
              opacity-0 translate-y-10
              bg-white/80 backdrop-blur
              rounded-xl shadow-lg
              border-l-4 border-yellow-400
              p-6 md:p-8
              transition-all duration-500
              hover:bg-yellow-50/40 hover:shadow-xl hover:translate-x-1
            "
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white flex items-center justify-center">
                {sec.icon}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {sec.title}
              </h2>
            </div>

            {Array.isArray(sec.content) ? (
              <ul className="space-y-3 text-gray-600">
                {sec.content.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 leading-relaxed">{sec.content}</p>
            )}
          </section>
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center pb-16 text-gray-600">
        <p>This policy may be updated periodically.</p>
      </div>

      {/* Inline Animations */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
