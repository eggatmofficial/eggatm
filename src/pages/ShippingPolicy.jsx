import { MdLocalShipping } from "react-icons/md";
import { FaCheckCircle, FaClock, FaMapMarkedAlt } from "react-icons/fa";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-14 text-center">
        <MdLocalShipping className="mx-auto text-5xl text-white mb-4" />
        <h1 className="text-4xl font-bold text-white">
          Shipping Policy
        </h1>
        <p className="text-white/90 mt-2">
          Delivery information and timelines
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-xl p-8 space-y-8">

          {/* Service Area */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaMapMarkedAlt className="text-yellow-500" />
              Service Area
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We deliver food orders within a limited serviceable area.
              Availability of delivery depends on your location and
              operational hours.
            </p>
          </section>

          {/* Delivery Time */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaClock className="text-yellow-500" />
              Delivery Time
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                Typical delivery time ranges between <strong>30–60 minutes</strong>.
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                Delivery time may vary due to traffic, weather, or order volume.
              </li>
            </ul>
          </section>

          {/* Delays & Exceptions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Delays & Exceptions
            </h2>
            <p className="text-gray-600 leading-relaxed">
              While we strive to deliver orders on time, unforeseen
              circumstances may cause delays. Customers will be informed
              in case of significant delays.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Need Help?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For any delivery-related questions, please contact our support
              team via the Contact page.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
