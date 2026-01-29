import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    // Initialize from sessionStorage for non-persistent admin sessions
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem("isAdmin") === "true";
  });
  const [loading, setLoading] = useState(false);

  const login = () => {
    sessionStorage.setItem("isAdmin", "true");
    setIsAdmin(true);
  };

  const logout = () => {
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("adminUsername");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
