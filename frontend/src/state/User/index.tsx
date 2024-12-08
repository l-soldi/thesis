import  { createContext, ReactNode, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children } : { children: ReactNode }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{userId, setUserId}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };