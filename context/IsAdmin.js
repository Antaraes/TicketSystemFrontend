import { createContext, useContext, useState, ReactNode } from "react";

const IsAdminContext = createContext();

export const useIsAdminContext = () => {
  return useContext(IsAdminContext);
};

export const IsAdminContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <IsAdminContext.Provider value={[isAdmin, setIsAdmin]}>{children}</IsAdminContext.Provider>
  );
};
