import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

// isInvalid é uma prop do input mesmo
export function Input({
  errorMessage = null,
  isInvalid,
  ...otherProps
}: Props) {
  // o !! trnasforma em um boolean
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "green.500",
        }}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        // otherProps tem que ser o último
        {...otherProps}
      />

      <FormControl.ErrorMessage
        _text={{
          color: "red.500",
        }}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
