import React from "react";
import Footer from "../common/Footer";
import Tab from "../components/Tab/Tab";
import Banner from "../pages/Banner";
import Feature from "../pages/Feature";
import OurUser from "../pages/OurUser";
import WhyChoose from "../pages/WhyChoose";
import MainPage from "./MainPage";
const TheLayout = () => {
  return (
    <div className="mt-[-24px]">
      <Banner />
      <Tab />
      <Feature />
      <WhyChoose />
      <OurUser />
      <Footer />
    </div>
  );
};

export default TheLayout;
