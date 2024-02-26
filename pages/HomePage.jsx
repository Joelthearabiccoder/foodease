import React, { Fragment } from "react";
import Hero from "../components/hero/Hero";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  return (
    <Fragment>
      <Hero />
      <Menu />
      <Footer />
    </Fragment>
  );
};

export default HomePage;
