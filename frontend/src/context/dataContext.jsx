import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [bootData, setBootData] = useState([]);
  const [kitData, setKitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState(true);

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
          axios.get(
            `https://goal-direct-fullstack-4.onrender.com/api/v1/kits`,
            {
              withCredentials: true,
            }
          ),
        ]);

        // const bootsData = await bootsRes.json();
        const bootsData = bootsRes.data;
        // const kitsData = await kitsRes.json();
        const kitsData = kitsRes.data;

        setBootData(bootsData.data.boots);
        setKitData(kitsData.data.kits);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
