import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
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
  return <DataContext.Provider value={cities}>{children}</DataContext.Provider>;
};
