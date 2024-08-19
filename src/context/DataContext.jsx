import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import dayjs from "dayjs";
import useSWR from "swr";
export const DataContext = createContext({
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

const fetcher = async () => {
  const response = await axios.get("/cities");
  return response.data;
};

export const DataProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [input, setInput] = useState({
    from: "",
    to: "",
  });
  const [busView, setBusView] = useState(true);

  const { data: cities } = useSWR("/cities", fetcher);

  return (
    <DataContext.Provider
      value={{
        cities: cities || [],
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
