import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {};

export function ExerciseCard({ ...otherProps }: Props) {
  return (
    <TouchableOpacity {...otherProps}>
      <HStack
        alignItems={"center"}
        bg={"gray.400"}
        p={2}
        pr={4}
        rounded={"md"}
        mb={3}
      >
        <Image
          source={{
            uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
          }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading fontSize={"lg"} color={"white"}>
            Remada Unilateral
          </Heading>
          <Text
            fontSize={"sm"}
            color={"gray.200"}
            mt={1}
            // para colocar o ellipsis
            numberOfLines={2}
          >
            3 séries x 12 repetições
          </Text>
        </VStack>

        {/* para ver o nome com autocomplete */}
        {/* <Entypo name='chevron-thin-right' /> */}
        <Icon as={Entypo} name="chevron-thin-right" color={"gray.300"} />
      </HStack>
    </TouchableOpacity>
  );
}
