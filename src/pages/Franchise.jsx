import { useState } from 'react';
import { Container, Row, Col, Accordion, Table, Button } from 'react-bootstrap';
import { 
  FaPhone, FaRupeeSign, FaChartLine, FaClock, FaHandshake, 
  FaQuestionCircle, FaDownload, FaArrowRight, FaStar, 
  FaShieldAlt, FaUsers, FaRocket, FaChartPie, FaCheckCircle 
} from 'react-icons/fa';
import { GiEggPod } from 'react-icons/gi';
import logo from '../assets/imges/francise.jpg';

export const PRIMARY_COLOR = "#faa807";
export const SECONDARY_COLOR = "#ffd13d";
export const PRIMARY_GRADIENT =
  "linear-gradient(135deg, #faa807 0%, #ffd13d 100%)";

const Franchise = () => { 
  const [activeKey, setActiveKey] = useState('0');

  const mandatoryInvestments = [
    { item: 'Franchise Fee', cost: '₹69,000 (one-time)' },
    { item: 'Billing Software & Machine', cost: '₹25,000' },
    { item: 'Kitchen Equipment', cost: '₹80,000 - ₹1,00,000' },
    { item: 'Branding & Signage', cost: '₹70,000' },
    { item: 'Basic Furniture (2-3 tables)', cost: '₹30,000' },
    { item: 'Electrical & Gas Setup', cost: '₹10,000' }
  ];

  const optionalInvestments = [
    { item: 'Remote Control Car (attraction)', cost: '₹8,000' },
    { item: 'Gaming Products', cost: '₹5,000' },
    { item: 'Auto Dining Setup', cost: '₹15,000' },
    { item: 'Unjal Setup (Traditional Swing)', cost: '₹19,000' },
    { item: 'Chinese Table Setup', cost: '₹12,000' },
    { item: 'Soda Machine', cost: '₹1,75,000' },
    { item: 'Neon Board', cost: '₹6,000' },
    { item: 'CCTV System', cost: '₹20,000 - ₹30,000' },
    { item: 'UPS Power Backup', cost: '₹20,000 - ₹30,000' },
    { item: 'Additional Furniture & Decoratives', cost: '₹10,000 - ₹15,000' }
  ];

  const faqs = [
    {
      question: "What is the total investment?",
      answer: "₹69,000 + setup costs depending on your location and shop size."
    },
    {
      question: "Are there any royalty fees?",
      answer: "No – we charge zero royalty, forever."
    },
    {
      question: "Is there a renewal fee?",
      answer: "Yes, ₹3,000 every 1 year."
    },
    {
      question: "What support do I get?",
      answer: "Branding, menu, training, and full social media marketing."
    },
    {
      question: "What's the outlet size required?",
      answer: "150-250 sq. ft. & above."
    },
    {
      question: "How much can I earn monthly?",
      answer: "₹70,000-1,00,000 with 60-70% profit margins."
    },
    {
      question: "Do I get training?",
      answer: "Yes, a simple 3-day training is provided."
    },
    {
      question: "Who handles marketing?",
      answer: "EGG! ATM handles social media promotion for you."
    }
  ];

  const stats = [
    { value: "60-70%", label: "Profit Margin", icon: <FaChartPie className="text-2xl" /> },
    { value: "15-30", label: "Days Setup", icon: <FaRocket className="text-2xl" /> },
    { value: "₹0", label: "Royalty Fee", icon: <FaRupeeSign className="text-2xl" /> },
    { value: "500+", label: "Happy Customers", icon: <FaUsers className="text-2xl" /> }
  ];

  const features = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Zero Royalty",
      desc: "Lifetime royalty-free model",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "High ROI",
      desc: "60-70% profit margins",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Quick Launch",
      desc: "Operational in 15-30 days",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "360° Support",
      desc: "Training & marketing included",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: <GiEggPod className="text-3xl" />,
      title: "Unique Concept",
      desc: "India's 1st egg-focused brand",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Proven Success",
      desc: "Multiple successful outlets",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

const downloadBrochure = () => {
  // Method 1: Using a link in public folder
  const fileUrl = '/franchise.pdf'; // File in public folder
  
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = 'egg-atm-franchise-brochure.pdf'; // Name for downloaded file
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0" style={{ background: PRIMARY_GRADIENT, opacity: 0.1 }}></div>
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20" 
             style={{ backgroundColor: PRIMARY_COLOR }}></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20" 
             style={{ backgroundColor: SECONDARY_COLOR }}></div>
        
        <Container className="relative z-10">
          <div className="flex flex-col items-center justify-center text-center px-4">
            {/* Logo */}
            <div className="mb-8 animate-bounce">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="egg! atm Logo" 
                  className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain rounded-full bg-gradient-to-br from-white to-gray-50 p-4 shadow-2xl border-8 border-white"
                />
                <div className="absolute -top-2 -right-2 rounded-full p-2" 
                     style={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}>
                  <GiEggPod className="text-xl" />
                </div>
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight" 
                style={{ 
                  background: PRIMARY_GRADIENT, 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              EGG! ATM FRANCHISE
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
              Join India's Most Exciting <span className="font-bold" style={{ color: PRIMARY_COLOR }}>Egg Brand Revolution</span>
            </p>
            
            {/* Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-4xl">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div style={{ color: PRIMARY_COLOR }}>
                      {stat.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Button 
                href="/contact" 
                className="group px-8 py-4 md:px-10 md:py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl border-0 font-bold text-lg flex items-center justify-center gap-3"
                style={{ background: PRIMARY_GRADIENT }}
              >
                <div className="relative">
                  <FaPhone className="text-xl group-hover:scale-110 transition-transform" />
                </div>
                <span>Enquire Now</span>
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <Button 
                onClick={downloadBrochure}
                className="group px-8 py-4 md:px-10 md:py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl bg-white border-2 font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-50"
                style={{ color: PRIMARY_COLOR, borderColor: SECONDARY_COLOR }}
              >
                <FaDownload className="text-xl group-hover:scale-110 transition-transform" />
                <span>Download Brochure</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 lg:px-5">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              WHY CHOOSE <span style={{ color: PRIMARY_COLOR }}>EGG! ATM</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just a franchise, we're a movement revolutionizing the egg industry in India
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-20 lg:ml-[90px] ">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative"
              >
                {/* Background Effect */}
                <div className="absolute top-0 left-0 w-full h-1" style={{ background: PRIMARY_GRADIENT }}></div>
                
                {/* Icon */}
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
                
                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaArrowRight className="text-xl" style={{ color: PRIMARY_COLOR }} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Business Model - Card Style */}
      <section className="py-16 md:py-24 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              BUSINESS <span style={{ color: PRIMARY_COLOR }}>MODEL</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent, profitable, and designed for your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Model Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border" style={{ borderColor: SECONDARY_COLOR + '30' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b" style={{ borderColor: SECONDARY_COLOR + '30' }}>
                Franchise Overview
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Brand Name", value: "EGG! ATM - ANY TIME MUTTAI" },
                  { label: "Franchise Fee", value: "₹69,000 (one-time)", highlight: true },
                  { label: "Royalty", value: "₹0 (lifetime royalty-free)", highlight: true },
                  { label: "Renewal Fee", value: "₹3,000 (every 1 year)" },
                  { label: "Monthly Sales Estimate", value: "₹70,000 - ₹1,00,000" },
                  { label: "Profit Margin", value: "60% - 70%", highlight: true },
                  { label: "Outlet Size", value: "150-250 sq. ft. & above" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center p-4 rounded-xl transition-all duration-300 ${
                      item.highlight 
                        ? 'border-l-4' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={item.highlight ? { 
                      background: `linear-gradient(to right, ${PRIMARY_COLOR}10, ${SECONDARY_COLOR}10)`,
                      borderLeftColor: PRIMARY_COLOR 
                    } : {}}
                  >
                    <span className="font-semibold text-gray-700">{item.label}</span>
                    <span className={`font-bold ${item.highlight ? 'text-lg' : 'text-gray-900'}`}
                          style={item.highlight ? { color: PRIMARY_COLOR } : {}}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Investment Highlights */}
            <div className="space-y-8 ">
              <div className="rounded-3xl shadow-xl p-8 border " style={{ 
                background: `linear-gradient(to bottom right, ${PRIMARY_COLOR}10, ${SECONDARY_COLOR}10)`,
                borderColor: PRIMARY_COLOR + '30'
              }}>
                <div className="flex items-center gap-4 mb-6 ">
                  <div className="rounded-xl p-3" style={{ backgroundColor: PRIMARY_COLOR + '20', color: PRIMARY_COLOR }}>
                    <FaRupeeSign className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Investment Highlights</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Lowest franchise fee in the industry",
                    "Zero royalty for lifetime",
                    "Quick ROI within 8-12 months",
                    "Proven business model",
                    "Minimal operational costs",
                    "High repeat customer rate"
                  ].map((point, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <FaCheckCircle className="flex-shrink-0" style={{ color: PRIMARY_COLOR }} />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="rounded-3xl shadow-xl p-8 border" style={{ 
                background: `linear-gradient(to bottom right, ${SECONDARY_COLOR}10, ${PRIMARY_COLOR}10)`,
                borderColor: SECONDARY_COLOR + '30'
              }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-xl p-3" style={{ backgroundColor: SECONDARY_COLOR + '20', color: PRIMARY_COLOR }}>
                    <FaChartLine className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Growth Potential</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  With the growing demand for protein-rich food and unique dining experiences, egg! atm franchise offers tremendous growth opportunities.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>10x</div>
                    <div className="text-sm text-gray-600">Growth Potential</div>
                  </div>
                  <div className="bg-white/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>24/7</div>
                    <div className="text-sm text-gray-600">Business Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Investment Details - Modern Cards */}
      <section className="py-16 md:py-24 lg:px-15">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              INVESTMENT <span style={{ color: PRIMARY_COLOR }}>BREAKDOWN</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Clear and transparent cost structure with flexible options
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Mandatory Investment Card */}
            <div className="rounded-3xl shadow-2xl p-8 border" style={{ 
              background: `linear-gradient(to bottom right, ${PRIMARY_COLOR}10, ${SECONDARY_COLOR}10)`,
              borderColor: PRIMARY_COLOR + '30'
            }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Mandatory Investments</h3>
                  <p className="text-gray-600">Essential setup for operations</p>
                </div>
                <div className="px-4 py-2 rounded-full font-bold" style={{ 
                  backgroundColor: PRIMARY_COLOR + '20',
                  color: PRIMARY_COLOR
                }}>
                  REQUIRED
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                {mandatoryInvestments.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-white/50 rounded-xl hover:bg-white transition-colors">
                    <span className="text-gray-700">{item.item}</span>
                    <span className="font-bold text-gray-900">{item.cost}</span>
                  </div>
                ))}
              </div>
              
              <div className="rounded-2xl p-6 text-white" style={{ background: PRIMARY_GRADIENT }}>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Investment</span>
                  <span className="text-2xl font-black">₹2,84,000 - ₹3,04,000</span>
                </div>
                <p className="text-white/90 text-sm mt-2">Enough to start your business!</p>
              </div>
            </div>
            
            {/* Optional Investment Card */}
            <div className="rounded-3xl shadow-2xl p-8 border" style={{ 
              background: `linear-gradient(to bottom right, ${SECONDARY_COLOR}10, ${PRIMARY_COLOR}10)`,
              borderColor: SECONDARY_COLOR + '30'
            }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Optional Add-ons</h3>
                  <p className="text-gray-600">Enhance customer experience</p>
                </div>
                <div className="px-4 py-2 rounded-full font-bold" style={{ 
                  backgroundColor: SECONDARY_COLOR + '20',
                  color: PRIMARY_COLOR
                }}>
                  OPTIONAL
                </div>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {optionalInvestments.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-white/50 rounded-xl hover:bg-white transition-colors">
                    <span className="text-gray-700">{item.item}</span>
                    <span className="font-bold text-gray-900">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Note Card */}
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl p-8 border shadow-lg" style={{ 
              background: `linear-gradient(to right, ${PRIMARY_COLOR}10, ${SECONDARY_COLOR}10)`,
              borderColor: PRIMARY_COLOR + '30'
            }}>
              <div className="flex items-start gap-4">
                <div className="rounded-xl p-3" style={{ backgroundColor: PRIMARY_COLOR + '20', color: PRIMARY_COLOR }}>
                  <FaStar className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Important Note</h4>
                  <p className="text-gray-700">
                    The mandatory investment package includes everything you need to start operations successfully. 
                    Optional items are designed to enhance customer attraction and experience - add them as your business grows!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section - Modern Design */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              GOT <span style={{ color: PRIMARY_COLOR }}>QUESTIONS</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about egg! atm franchise
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
                    activeKey === index.toString() 
                      ? 'ring-2' 
                      : 'border-gray-100'
                  }`}
                  style={activeKey === index.toString() ? { 
                    borderColor: PRIMARY_COLOR + '50',
                    ringColor: PRIMARY_COLOR + '20'
                  } : {}}
                  onClick={() => setActiveKey(index.toString())}
                >
                  <div className={`p-6 cursor-pointer flex items-center justify-between ${
                    activeKey === index.toString() ? '' : 'hover:bg-gray-50'
                  }`}
                  style={activeKey === index.toString() ? { 
                    background: `linear-gradient(to right, ${PRIMARY_COLOR}10, ${SECONDARY_COLOR}10)`
                  } : {}}>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        activeKey === index.toString() 
                          ? 'text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      style={activeKey === index.toString() ? { background: PRIMARY_GRADIENT } : {}}>
                        <FaQuestionCircle className="text-xl" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">{faq.question}</h4>
                    </div>
                    <div className={`transform transition-transform duration-300 ${
                      activeKey === index.toString() ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    activeKey === index.toString() ? 'max-h-48' : 'max-h-0'
                  }`}>
                    <div className="p-6 pt-0">
                      <div className="pl-12 border-l-2" style={{ borderColor: PRIMARY_COLOR }}>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0" style={{ background: PRIMARY_GRADIENT }}></div>
        
        <Container className="relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="mb-10">
              <GiEggPod className="text-6xl md:text-8xl mx-auto mb-6 opacity-90 animate-bounce" />
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
                Ready to Crack Success?
              </h2>
              <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto">
                Join India's fastest growing egg franchise with proven success stories across multiple cities
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                href="/contact" 
                className="group px-10 py-5 md:px-12 md:py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl border-0 font-bold text-lg md:text-xl flex items-center justify-center gap-3 hover:scale-105"
                style={{ background: 'white', color: PRIMARY_COLOR }}
              >
                <span>Start Your Journey Today</span>
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <Button 
                onClick={downloadBrochure}
                className="px-10 py-5 md:px-12 md:py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl bg-transparent text-white border-2 border-white/50 font-bold text-lg md:text-xl hover:bg-white/10"
              >
                View Detailed Brochure
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/90">Support Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-white/90">Training Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">8-12</div>
                <div className="text-white/90">Months ROI</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Franchise;