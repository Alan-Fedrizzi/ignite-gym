import { Text, Pressable, IPressableProps } from "native-base";

type Props = IPressableProps & {
  name: string;
  isActive: boolean;
};

export function Group({ name, isActive, ...otherProps }: Props) {
  return (
    // Pressable qd clica nele não tem o efeito que tem o TouchableOpacity
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg={"gray.600"}
      rounded={"md"}
      justifyContent={"center"}
      alignItems={"center"}
      overflow={"hidden"}
      borderWidth={1}
      borderColor={"gray.600"}
      // para que o botão atio receba a estilização do pressed
      isPressed={isActive}
      _pressed={{
        borderColor: "green.500",
      }}
      {...otherProps}
    >
      <Text
        color={isActive ? "green.500" : "gray.200"}
        textTransform={"uppercase"}
        fontSize={"xs"}
        fontWeight={"bold"}
      >
        {name}
      </Text>
    </Pressable>
  );
}
