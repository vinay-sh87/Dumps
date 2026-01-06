import { createContext, useContext, useEffect, useState } from "react";
import authService from "../appwrite/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.log("No active session" + err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      await authService.createAccount(userData);
      await checkUserStatus();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      await authService.login(credentials);
      await checkUserStatus();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.log("Logout failed..." + err);
      setUser(null);
    }
  };

  // value to share with the components
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkUserStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useUser() {
  return useContext(AuthContext);
  
}
