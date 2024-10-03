import SlideShow from "../ui/SlideShow";
import SearchBar from "./SearchBar";
import Footer from "../ui/Footer";
import React, { useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import Feed from "../ui/Feed";
import { DataContext } from "../../context/DataContext";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const { searchResults, setSearchResults, input, setInput, date, setDate } =
    useContext(DataContext);
  useEffect(() => {
    setAuth({ admin: false, checker: false });
  }, []);

  useEffect(() => {
    setSearchResults([]);
  }, [input, date]);

  const [noContent, setNoContent] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState([]);

  const slides = [
    "images/background4.webp",
    "images/background3.webp",
    "images/background1_1.webp",
    "images/background2_1.webp",
  ];
  const slideStyle = "realative  w-full";
  const imageStyle = "w-full h-auto ";

  return (
    <div className="md:w-full w-[96%] mx-auto text-xs md:text-base">
      <SlideShow
        slides={slides}
        slideStyle={slideStyle}
        imageStyle={imageStyle}
        baseURL=""
      />

      <SearchBar
        setSearchResults={setSearchResults}
        setNoContent={setNoContent}
        setSearching={setSearching}
        input={input}
        setInput={setInput}
        setDate={setDate}
        date={date}
        setError={setError}
        error={error}
      />

      <div className="md:p-8 mx-auto shadow-2xl max-w-[100vw] ">
        {!error && searching && (
          <div className="flex justify-center items-center h-96">
            Searching....
          </div>
        )}
        {!error && !searching && (
          <Feed
            buses={searchResults}
            noContent={noContent}
            input={input}
            date={date}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
