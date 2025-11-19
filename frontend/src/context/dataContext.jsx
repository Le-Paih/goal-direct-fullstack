import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [bootData, setBootData] = useState([]);
  const [kitData, setKitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState(true);
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bootsRes, kitsRes] = await Promise.all([
          axios.get(
            `https://goal-direct-fullstack-4.onrender.com/api/v1/boots`,
            {
              withCredentials: true,
            }
          ),
          axios.get(`${api}/kits`, {
            withCredentials: true,
          }),
        ]);

        const bootsData = await bootsRes.json();
        const kitsData = await kitsRes.json();

        setBootData(bootsData.data.boots);
        setKitData(kitsData.data.kits);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  return (
    <DataContext.Provider
      value={{
        bootData,
        kitData,
        loading,
        user,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
