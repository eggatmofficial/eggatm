import { FaFileContract, FaCheckCircle } from "react-icons/fa";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 py-16 text-center">
        <div className="absolute inset-0 bg-black/10" />

        <FaFileContract className="relative mx-auto text-6xl text-white mb-4 drop-shadow-lg" />
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-white tracking-wide">
          Terms & Conditions
        </h1>
        <p className="relative text-white/90 mt-3 max-w-xl mx-auto">
          Please read these terms carefully before using our services
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-10">

          {/* Section */}
          <section className="group border-l-4 border-yellow-400 pl-6 transition-all hover:bg-yellow-50/40 rounded-lg py-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using this website, you agree to be bound by
              these Terms and Conditions. If you do not agree with any part
              of these terms, please do not use our services.
            </p>
          </section>

          {/* Section */}
          <section className="group border-l-4 border-yellow-400 pl-6 transition-all hover:bg-yellow-50/40 rounded-lg py-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Payments
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                <span>All payments are securely processed through Razorpay.</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                <span>We do not store or process card details on our servers.</span>
              </li>
            </ul>
          </section>

          {/* Section */}
          <section className="group border-l-4 border-yellow-400 pl-6 transition-all hover:bg-yellow-50/40 rounded-lg py-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. Orders & Cancellation
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Orders once placed cannot be cancelled after preparation.
              Please ensure all order details are correct before checkout.
            </p>
          </section>

          {/* Section */}
          <section className="group border-l-4 border-yellow-400 pl-6 transition-all hover:bg-yellow-50/40 rounded-lg py-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              4. Delivery & Service
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Delivery times may vary based on location, traffic, and order
              volume. We strive to deliver all orders as quickly as possible.
            </p>
          </section>

          {/* Section */}
          <section className="group border-l-4 border-yellow-400 pl-6 transition-all hover:bg-yellow-50/40 rounded-lg py-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              5. Changes to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to update or modify these Terms &
              Conditions at any time without prior notice. Continued use
              of the website constitutes acceptance of the updated terms.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;
