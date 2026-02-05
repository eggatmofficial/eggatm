// import React from 'react'
// import Banner from '../components/home/Banner'
// import Categories from '../components/home/Categories'
// import WhyChooseEggATM from '../components/home/WhyChooseEggATM'
// import NewsletterSection from '../components/home/NewsletterSection'
// import ServicesSection from '../components/home/ServicesSection'
// import WhyChooseSection from '../components/home/WhyChooseSection'

// const Home = () => {
//   return (
//     <>
//       <Banner />
//       {/* <Categories /> */}
//       <WhyChooseEggATM />
//       <WhyChooseSection />
//       <ServicesSection />
//       <NewsletterSection />
//     </>
//   )
// }

// export default Home





import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WelcomePopup from "../components/common/WelcomePopup";
import Banner from "../components/home/Banner";
// import Categories from '../components/home/Categories'
import WhyChooseEggATM from '../components/home/WhyChooseEggATM'
import NewsletterSection from '../components/home/NewsletterSection'
import ServicesSection from '../components/home/ServicesSection'
import WhyChooseSection from '../components/home/WhyChooseSection'

const Home = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isAuthenticated) return;

    const lastShown = localStorage.getItem("welcomePopupDate");
    const today = new Date().toDateString();

    if (lastShown !== today) {
      setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("welcomePopupDate", today);
      }, 2000);
    }
  }, [isAuthenticated]);

  return (
    <>
      {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}

      <Banner />
      <WhyChooseEggATM />
      <WhyChooseSection />
      <ServicesSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
