import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  return (
    <HStack bg={"gray.600"} pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        // podemos colocar uma url como foto:
        source={{ uri: "https://github.com/Alan-Fedrizzi.png" }}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color={"gray.100"} fontSize={"md"}>
          Olá,
        </Text>
        <Heading color={"gray.100"} fontSize={"md"} fontFamily={"heading"}>
          Alan
        </Heading>
      </VStack>

      <TouchableOpacity>
        {/* o icon não entende as nossas cores e tamanhos */}
        {/* <MaterialIcons name="logout" color={"gray.200"} size={7} /> */}
        {/* para que ele entenda, podemos usar o Icon do native base */}
        <Icon as={MaterialIcons} name="logout" color={"gray.200"} size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
