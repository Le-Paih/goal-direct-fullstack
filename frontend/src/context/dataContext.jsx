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
          fetch("http://127.0.0.1:3000/api/v1/boots", {
            credentials: "include",
          }),
          fetch("http://127.0.0.1:3000/api/v1/kits", {
            credentials: "include",
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
