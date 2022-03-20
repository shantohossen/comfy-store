import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [isLogin, setIslogin] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ isLogin, loginWithRedirect, logout }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
