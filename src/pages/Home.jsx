import React from 'react'
import Banner from '../components/home/Banner'
import Categories from '../components/home/Categories'
import WhyChooseEggATM from '../components/home/WhyChooseEggATM'
import NewsletterSection from '../components/home/NewsletterSection'
import ServicesSection from '../components/home/ServicesSection'
import WhyChooseSection from '../components/home/WhyChooseSection'

const Home = () => {
  return (
    <>
      <Banner />
      {/* <Categories /> */}
      <WhyChooseEggATM />
      <WhyChooseSection />
      <ServicesSection />
      <NewsletterSection />
    </>
  )
}

export default Home
