import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import dayjs from "dayjs";
export const DataContext = createContext({
  cities: [],
  searchResults: [],
  setDate: () => {},
  input: {
    from: "",
    to: "",
  },
  setInput: () => {},
  date: dayjs(),
  busView: true,
  setBusView: () => {},
});

export const DataProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [input, setInput] = useState({
    from: "",
    to: "",
  });
  const [busView, setBusView] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/cities");
        setCities(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <DataContext.Provider
      value={{
        cities,
        searchResults,
        setSearchResults,
        setDate,
        input,
        setInput,
        date,
        busView,
        setBusView,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
