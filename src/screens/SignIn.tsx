import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import { useAuth } from "@hooks/useAuth";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  function handleSignIn({ email, password }: FormData) {
    console.log(email, password);
    signIn(email, password);
    // poderíamos fazer assim, mas não é a melhor forma, é melhro deixar a atualização do state para o AuthContext, onde ele vive
    // setUser({
    //   id: "",
    //   name: "",
    //   email,
    //   avatar: "",
    // });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          // defaultSource carrega mais rápido
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          position={"absolute"}
          // resizeMode="contain"
          resizeMode="cover"
        />

        {/* margin vertical de 96px, é o 24 */}
        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center mb={"auto"}>
          <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={6}>
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Informe o e-mail",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Deve ser inserido um e-mail válido",
              },
            }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Informe a senha",
              minLength: {
                value: 6,
                message: "A senha deve possuir, no mínimo, 6 caracteres",
              },
            }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
                // o send fica uma flechinha no botão OK do teclado
                returnKeyType="send"
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily={"body"}>
            Ainda não tem acesso
          </Text>
          {/* o button do native base tem a prop de variant */}
          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}

//
