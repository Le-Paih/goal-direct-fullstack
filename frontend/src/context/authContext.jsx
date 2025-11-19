import axios from "axios";
import { useDispatch } from "react-redux";
import { createContext, useEffect, useState } from "react";
import { fetchCart } from "../slice/cartSlice";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (token, userInfo) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setIsLoggedIn(true);
    setUser(userInfo);

    dispatch(fetchCart());
  };

  const logout = async () => {
    try {
      await axios.get(`${api}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
