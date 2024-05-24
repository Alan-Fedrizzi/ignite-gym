import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    // essa Box é só para não aparecer fundo branco na transição das telas
    <Box flex={1} bg={"gray.700"}>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
