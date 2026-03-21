import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, signIn, signOut, signUp } from "../appwriteAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setIsLoading(true);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  };

  const login = async (email, password) => {
    await signIn(email, password);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const register = async (name, email, password) => {
    await signUp(name, email, password);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
