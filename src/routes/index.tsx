import { useContext } from "react";
import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthContext } from "@contexts/AuthContext";
import { useAuth } from "@hooks/useAuth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";

export function Routes() {
  // const contextData = useContext(AuthContext);
  // exibe o que está sendo compartilhado no contexto
  // console.log("contextData", contextData);
  const { user, isLoadingUserStorageData } = useAuth();
  // console.log("USUÁRIO LOGADO =>", user);

  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    // essa Box é só para não aparecer fundo branco na transição das telas
    <Box flex={1} bg={"gray.700"}>
      <NavigationContainer theme={theme}>
        {/* se usuário está logado, entra no app se não fica no auth */}
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
