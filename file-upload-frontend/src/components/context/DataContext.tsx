import React, { createContext, useContext, useState } from "react";

interface DataContextProps {
  children: React.ReactNode;
}

interface DataContextValue {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  jwtToken: string | null;
  setJwtToken: (token: string | null) => void;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  toastContent: string;
  setToastContent: React.Dispatch<React.SetStateAction<string>>;
}

export const DataContext = createContext<DataContextValue | undefined>(undefined);

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
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastContent, setToastContent] = useState<string>("");

  const value: DataContextValue = {
    isAuthenticated,
    setAuthenticated: setIsAuthenticated,
    jwtToken,
    setJwtToken,
    showToast,
    setShowToast,
    toastContent,
    setToastContent
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
