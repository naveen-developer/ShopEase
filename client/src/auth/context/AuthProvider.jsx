import { createContext, useContext, useEffect, useState } from "react";
import rawApi from "../../shared/rawApi";

const AuthContext = createContext();

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  // user , setUser , accessToken , setAccessToken
  return context;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // console.log("user", user);
  // console.log("accessToken", accessToken);

  useEffect(() => {
    async function initAuth() {
      try {
        const res = await rawApi.post("/auth/refresh");
        // console.log("response from refresh", res);
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch (err) {
        //console.log("refresh failed:", err.response?.data || err.message);
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken, cart, setCart }}
    >
      {children}
    </AuthContext.Provider>
  );
}
