"use client";
import { createContext, useState, useContext } from 'react';

const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <ResultsContext.Provider value={{ results, setResults,user,setUser }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error("useResults must be used within a ResultsProvider");
  }
  return context;
};
