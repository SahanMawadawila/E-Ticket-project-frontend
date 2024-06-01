import SlideShow from "../ui/SlideShow";
import SearchBar from "./SearchBar";
import Footer from "../ui/Footer";
import React, { useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import Feed from "../ui/Feed";
import dayjs from "dayjs";

//context
import { createContext } from "react";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    setAuth({ admin: false, checker: false });
  }, []);

  const [searchResults, setSearchResults] = useState([]);
  const [noContent, setNoContent] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [input, setInput] = useState({
    from: "",
    to: "",
  });

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
      <div className="md:p-8 mx-auto shadow-2xl max-w-[100vw]">
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
