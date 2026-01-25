// import { MdLocalShipping } from "react-icons/md";
// import { FaCheckCircle, FaClock, FaMapMarkedAlt } from "react-icons/fa";

// const ShippingPolicy = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-14 text-center">
//         <MdLocalShipping className="mx-auto text-5xl text-white mb-4" />
//         <h1 className="text-4xl font-bold text-white">
//           Shipping Policy
//         </h1>
//         <p className="text-white/90 mt-2">
//           Delivery information and timelines
//         </p>
//       </div>

//       {/* Content */}
//       <div className="max-w-4xl mx-auto px-4 py-12">
//         <div className="bg-white shadow-lg rounded-xl p-8 space-y-8">

//           {/* Service Area */}
//           <section>
//             <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
//               <FaMapMarkedAlt className="text-yellow-500" />
//               Service Area
//             </h2>
//             <p className="text-gray-600 leading-relaxed">
//               We deliver food orders within a limited serviceable area.
//               Availability of delivery depends on your location and
//               operational hours.
//             </p>
//           </section>

//           {/* Delivery Time */}
//           <section>
//             <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
//               <FaClock className="text-yellow-500" />
//               Delivery Time
//             </h2>
//             <ul className="space-y-2 text-gray-600">
//               <li className="flex items-start gap-2">
//                 <FaCheckCircle className="text-green-500 mt-1" />
//                 Typical delivery time ranges between <strong>30–60 minutes</strong>.
//               </li>
//               <li className="flex items-start gap-2">
//                 <FaCheckCircle className="text-green-500 mt-1" />
//                 Delivery time may vary due to traffic, weather, or order volume.
//               </li>
//             </ul>
//           </section>

//           {/* Delays & Exceptions */}
//           <section>
//             <h2 className="text-xl font-semibold text-gray-800 mb-3">
//               Delays & Exceptions
//             </h2>
//             <p className="text-gray-600 leading-relaxed">
//               While we strive to deliver orders on time, unforeseen
//               circumstances may cause delays. Customers will be informed
//               in case of significant delays.
//             </p>
//           </section>

//           {/* Contact */}
//           <section>
//             <h2 className="text-xl font-semibold text-gray-800 mb-3">
//               Need Help?
//             </h2>
//             <p className="text-gray-600 leading-relaxed">
//               For any delivery-related questions, please contact our support
//               team via the Contact page.
//             </p>
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShippingPolicy;



import { MdLocalShipping } from "react-icons/md";
import { FaCheckCircle, FaClock, FaMapMarkedAlt } from "react-icons/fa";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Inline animation CSS */}
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-up {
            animation: fadeUp 0.8s ease-out both;
          }

          .animate-fade-down {
            animation: fadeDown 0.8s ease-out both;
          }

          .card-hover {
            transition: all 0.3s ease;
          }

          .card-hover:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          }
        `}
      </style>

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 py-16 text-center animate-fade-down">
        <MdLocalShipping className="mx-auto text-5xl text-white mb-4" />
        <h1 className="text-4xl font-bold text-white">Shipping Policy</h1>
        <p className="text-white/90 mt-2">Delivery information and timelines</p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">

        {/* Service Area */}
        <div className="bg-white rounded-2xl p-6 shadow-lg card-hover border-l-4 border-yellow-400">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <FaMapMarkedAlt className="text-yellow-600 text-xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Service Area
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We deliver food orders within a limited serviceable area. Delivery
            availability depends on your location and operational hours.
          </p>
        </div>

        {/* Delivery Time */}
        <div className="bg-white rounded-2xl p-6 shadow-lg card-hover border-l-4 border-yellow-400">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FaClock className="text-blue-600 text-xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Delivery Time
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              Typical delivery time is <strong>30–60 minutes</strong>.
            </li>
            <li className="flex gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              May vary due to traffic, weather, or order volume.
            </li>
          </ul>
        </div>

        {/* Delays & Exceptions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg card-hover border-l-4 border-yellow-400">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <MdLocalShipping className="text-red-600 text-xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Delays & Exceptions
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Unforeseen circumstances such as weather or high demand may cause
            delays. Customers will be notified in case of major delays.
          </p>
        </div>

      </div>

      {/* Help Section */}
      <div className="text-center pb-12 animate-fade-up">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Need Help?</h3>
        <p className="text-gray-600">
          For delivery-related questions, contact our support team via the
          Contact page.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
