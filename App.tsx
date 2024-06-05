import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/theme/theme";
import { AuthContext, AuthContextProvider } from "@contexts/AuthContext";
import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {/* tudo que estiver aqui dentro vai ter as infos do context */}
        {fontsLoaded ? <Routes></Routes> : <Loading />}
      </AuthContextProvider>
      {/* <AuthContext.Provider
        value={{
          user: {
            id: "1",
            name: "Rodrigo",
            email: "rodrigo@email.com",
            avatar: "rodrigo.png",
          },
        }}
      >
        tudo que estiver aqui dentro vai ter as infos do context
        {fontsLoaded ? <Routes></Routes> : <Loading />}
      </AuthContext.Provider> */}
    </NativeBaseProvider>
  );
}

// http://localhost:3333/api-docs/
// 4 Contextos no React Native
// Buscando dados do usuário no back-enddo
