import React, { useState } from "react";
import { FaPaperPlane, FaSpinner, FaCheck, FaInfoCircle } from "react-icons/fa";
import api from "../../api/axios";

export const PRIMARY_COLOR = "#faa807";
export const SECONDARY_COLOR = "#ffd13d";
export const PRIMARY_GRADIENT = `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`;

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // null, 'success', 'already_subscribed'
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubscriptionStatus(null);
    setError("");

    try {
      await api.post("/newsletter/subscribe", {
        email,
        source: "website",
      });

      setSubscriptionStatus('success');
      setEmail("");
      toast.success("Thanks for subscribing!");
      
    } catch (err) {
      // Handle already subscribed error (both from backend crash and proper 409)
      const errorMessage = err.response?.data?.message || err.message;
      
      if (err.response?.status === 409 || 
          errorMessage?.includes("already subscribed") ||
          errorMessage === "Email already subscribed" ||
          err.response?.status === 500) {
        
        setSubscriptionStatus('already_subscribed');
        toast.info(" You're already subscribed to our newsletter!", {
          icon: "ℹ️",
        });
        
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear status message after 5 seconds
  React.useEffect(() => {
    if (subscriptionStatus) {
      const timer = setTimeout(() => {
        setSubscriptionStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [subscriptionStatus]);

  const getButtonContent = () => {
    if (isSubmitting) {
      return <FaSpinner className="animate-spin text-lg" />;
    }
    
    if (subscriptionStatus === 'success') {
      return <FaCheck className="text-lg" />;
    }
    
    if (subscriptionStatus === 'already_subscribed') {
      return <FaInfoCircle className="text-lg" />;
    }
    
    return <FaPaperPlane className="text-lg" />;
  };

  const getButtonStyle = () => {
    if (subscriptionStatus === 'success') {
      return { background: "#10B981" }; // Green
    }
    
    if (subscriptionStatus === 'already_subscribed') {
      return { background: "#3B82F6" }; // Blue
    }
    
    return { background: PRIMARY_GRADIENT };
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Stay Updated 
          </h2>
          <p className="text-gray-600 mt-2">
            Get recipes, offers & spice tips straight to your inbox
          </p>
        </div>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            {/* Glow */}
            <div
              className="absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-40 transition"
              style={{ background: PRIMARY_GRADIENT }}
            />

            <div className="relative flex">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Clear status when user starts typing again
                  if (subscriptionStatus) setSubscriptionStatus(null);
                  if (error) setError("");
                }}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3 rounded-l-2xl border border-gray-300 
                           focus:outline-none focus:border-amber-500"
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting || subscriptionStatus === 'already_subscribed'}
                className={`px-6 py-3 rounded-r-2xl text-white font-semibold 
                           flex items-center justify-center transition-all duration-300
                           ${subscriptionStatus === 'already_subscribed' ? 'cursor-default' : ''}`}
                style={getButtonStyle()}
                title={subscriptionStatus === 'already_subscribed' ? "Already subscribed" : ""}
              >
                {getButtonContent()}
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {subscriptionStatus === 'success' && (
            <div className="text-green-600 text-sm text-center animate-pulse">
              🎉 Thanks for subscribing! Check your email for confirmation.
            </div>
          )}

          {subscriptionStatus === 'already_subscribed' && (
            <div className="text-blue-600 text-sm text-center flex items-center justify-center gap-2">
              <FaInfoCircle />
              <span>✅ You're already subscribed to our newsletter!</span>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center">
              ⚠️ {error}
            </div>
          )}

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;