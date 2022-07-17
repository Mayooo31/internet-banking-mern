import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentError, setCurrentError] = useState({});
  const [balance, setBalance] = useState("");

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentError,
        setCurrentError,
        setBalance,
        balance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
