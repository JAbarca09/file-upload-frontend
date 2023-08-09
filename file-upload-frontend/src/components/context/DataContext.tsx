import React, { createContext, useContext, useState } from "react";

interface DataContextProps {
  children: React.ReactNode;
}

interface DataContextValue {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  jwtToken: string | null;
  setJwtToken: (token: string | null) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const value: DataContextValue = {
    isAuthenticated,
    setAuthenticated: setIsAuthenticated,
    jwtToken,
    setJwtToken,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
