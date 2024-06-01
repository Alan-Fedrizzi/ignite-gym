import { TouchableOpacity } from "react-native";
import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Image,
  Box,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBak() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} pt={12} pb={8} bg={"gray.600"}>
        <TouchableOpacity onPress={handleGoBak}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack justifyContent={"space-between"} mt={4} alignItems={"center"}>
          {/* flexShrink={1} faz o texto quebrar, sem empurrar o restante para a fora do container */}
          <Heading
            color={"gray.100"}
            fontSize={"lg"}
            flexShrink={1}
            fontFamily={"heading"}
          >
            Puxada frontal
          </Heading>

          <HStack alignContent={"center"}>
            <BodySvg />
            <Text color={"gray.200"} ml={1} textTransform={"capitalize"}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            source={{
              uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
            }}
            alt="Nome do exercício"
            w={"full"}
            h={80}
            mb={3}
            resizeMode="cover"
            rounded={"lg"}
          />

          <Box bg={"gray.600"} rounded={"md"} pb={4} px={4}>
            <HStack
              alignItems={"center"}
              justifyContent={"space-around"}
              mb={6}
              mt={5}
            >
              <HStack alignItems={"center"}>
                <SeriesSvg />
                <Text color={"gray.200"} ml={2}>
                  3 séries
                </Text>
              </HStack>

              <HStack alignItems={"center"}>
                <RepetitionsSvg />
                <Text color={"gray.200"} ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
