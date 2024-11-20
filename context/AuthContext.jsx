import { createContext, useState } from "react";
import { login } from "../services/memes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = async (username, password) => {
    const [creds, error] = await login(username, password);
    if (error) {
      console.error(error);
      setIsAuthenticated(false);
    } else {
      setCredentials(creds);
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{ credentials, isAuthenticated, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
