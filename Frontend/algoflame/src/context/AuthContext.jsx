import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.post("/auth/v1/auth-verify");
        setUser(data);
        setIsAuth(false);
        setLoading(false);
      } catch (err) {
        setUser(null);
        setIsAuth(false);
        setLoading(false);
      }
    })();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuth,
    }),
    [user, loading, isAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
