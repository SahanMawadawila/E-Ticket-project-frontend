import SlideShow from "../ui/SlideShow";
import SearchBar from "./SearchBar";
import Footer from "../ui/Footer";
import React, { useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    setAuth({ admin: false, checker: false });
  }, []);

  const slides = [
    "images/background4.jpg",
    "images/background3.jpg",
    "images/background1.jpg",
    "images/background2.jpg",
  ];
  const slideStyle = "realative  w-full";
  const imageStyle = "w-full h-auto ";

  return (
    <div>
      <SlideShow
        slides={slides}
        slideStyle={slideStyle}
        imageStyle={imageStyle}
        baseURL=""
      />
      <SearchBar />
      <Footer />
    </div>
  );
};

export default Home;
