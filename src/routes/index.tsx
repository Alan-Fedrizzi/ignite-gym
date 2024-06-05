import { useContext } from "react";
import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthContext } from "@contexts/AuthContext";
import { useAuth } from "@hooks/useAuth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  // const contextData = useContext(AuthContext);
  // exibe o que está sendo compartilhado no contexto
  // console.log("contextData", contextData);
  const { user } = useAuth();
  console.log("user", user);

  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    // essa Box é só para não aparecer fundo branco na transição das telas
    <Box flex={1} bg={"gray.700"}>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </Box>
  );
}
