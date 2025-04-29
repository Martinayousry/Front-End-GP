import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;


  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
  
    try {
      const res = await axios.get("/api/Auth/getUserFromToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      localStorage.setItem("userId", res.data.id); 
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);

    setToken(token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null); 
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout,token,loading,isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
