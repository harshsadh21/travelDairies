import { createContext, useState } from "react";

export const DataContext = createContext();

const userContext = ({ children }) => {
  // const users = {
  //   name: "John Doe",
  //   email: "john@example.com",
  //   cnum: 6264967718,
  // };

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await fetch("http://localhost:5000/auth/get-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    setUser(data);
  };

  return (
    <div>
      <DataContext.Provider value={{ user, setUser, getUser }}>
        {children}
      </DataContext.Provider>
    </div>
  );
};

export default userContext;
