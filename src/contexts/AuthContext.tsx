import { ReactNode, createContext, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
  // setUser: (user: UserDTO) => void;
};

// passamos o initial value
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: "1",
    name: "Rodrigo",
    email: "rodrigo@email.com",
    avatar: "rodrigo.png",
  });

  function signIn(email: string, password: string) {
    setUser({
      id: "",
      name: "",
      email,
      avatar: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn }}
      // value={{ user, setUser }}
      // value={{ user: user }}
    >
      {/* {fontsLoaded ? <Routes></Routes> : <Loading />} */}
      {children}
    </AuthContext.Provider>
  );
}
