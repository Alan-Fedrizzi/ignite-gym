import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o email.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password"), ""], "A confirmação da senha está incorreta."),
});

export function SignUp() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");
  // ele não tipou aqui, pois usou o goBack
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });
  //  ({
  //   defaultValues: {
  //     name: "Rodrigo",
  //   },
  // });

  function handleGoBack() {
    // navigation.goBack();
    navigation.navigate("signIn");
  }

  /*
  // sem asyn await, usando then, com fetch
  function handleSignUp({
    name,
    email,
    password,
    password_confirm,
  }: FormDataProps) {
    // console.log({ name, email, password, passwordConfirm });
    // console.log({ name, email, password, password_confirm });
    // temos que colocar o IP address no fetch, pois estamos rodando localmente o banco de dados, no localhost
    // fetch("http://localhost:3333/users", {
    fetch("http://192.168.1.81:3333/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  // com async await, com fetch
  async function handleSignUp({
    name,
    email,
    password,
    password_confirm,
  }: FormDataProps) {
    const response = await fetch("http://192.168.1.81:3333/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log(data);
  }
  */

  async function handleSignUp({
    name,
    email,
    password,
    password_confirm,
  }: FormDataProps) {
    // api.post("/users", { name, email, password })
    // .then(() => {})
    // .catch((error) => {})
    try {
      // api.method, peimeiro parâmetro é a rota, o segundo o objeto do body (não precisa passar para string)
      const response = await api.post("/users", { name, email, password });
      // response já vem em json
      console.log(response.data);
    } catch (error) {
      // verifica se o erro vem do axios
      // if (axios.isAxiosError(error)) {
      //   Alert.alert(error.response?.data.message);
      // }
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
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
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center mb={"auto"}>
          <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={6}>
            Crie sua conta
          </Heading>

          {/* <Input placeholder="Nome" onChangeText={setName} /> */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
            // para validação usamos rules
            // se tem algum dos inputs que não segue a regra, o handleSubmit não envia os dados
            // usando o yup removo o rules...
            // rules={{
            //   // para o required, passamos a msg de erro
            //   required: "Informe o nome.",
            // }}
          />
          {/* <Text color={"white"}>{errors.name?.message}</Text> */}

          {/* <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />*/}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
            // rules={{
            //   required: "Informe o email.",
            //   pattern: {
            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //     message: "E-mail inválido",
            //   },
            // }}
          />
          {/* <Text color={"white"}>{errors.email?.message}</Text> */}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                // o send fica uma flechinha no botão OK do teclado
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            // o handleSubmit passa todo o conteúdo do form para o handleSignUp
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Center mt={12}>
          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}

// utilizando variantes....
