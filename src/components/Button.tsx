import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...otherProps }: Props) {
  return (
    // quando os attributos são SVGStringList, pode ser direto "" ou {""}
    <NativeBaseButton
      w={"full"}
      h={14}
      bg={"green.700"}
      rounded={"sm"}
      _pressed={{
        bg: "green.500",
      }}
      {...otherProps}
    >
      <Text color={"white"} fontFamily={"heading"} fontSize={"sm"}>
        {title}
      </Text>
    </NativeBaseButton>
  );
}
