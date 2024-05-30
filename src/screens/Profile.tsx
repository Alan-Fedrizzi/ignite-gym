import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileInfo } from "expo-file-system";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhotog] = useState(
    "https://github.com/Alan-Fedrizzi.png"
  );
  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      // para acessar o álbum de fotos do telefone do usuário
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // All, Videos
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        // base64: true,
      });

      // a uri é o path da foto no dispositivo
      // console.log(photoSelected);
      if (photoSelected.canceled) return;

      const photoUri = photoSelected.assets[0].uri;

      if (photoUri) {
        // definir tamanho máximo da imagem, par ausuário não carregar imagem mto pesadas, masi que 5Mb por exemplo...
        // vamos usar FileSystem do expo
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as FileInfo;
        console.log(photoInfo);

        const fileSize = photoInfo.size;
        // traz o tamanho em bites, converter para mega = fileSize / 1024 / 1024
        // if (fileSize && fileSize / 1024 / 1024 > 0.5) {
        if (fileSize && fileSize / 1024 / 1024 > 5) {
          // return Alert.alert(
          //   "Essa imagem é muito grande. Escolha uma de até 5MB."
          // );
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            // default é bottom
            placement: "top",
            bgColor: "red.500",
          });
        }

        setUserPhotog(photoUri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 56,
        }}
      >
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={"full"}
              startColor={"gray.500"}
              endColor={"gray.400"}
            />
          ) : (
            <UserPhoto
              // source={{ uri: "https://github.com/Alan-Fedrizzi.png" }}
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontSize={"md"}
              fontWeight={"bold"}
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg={"gray.600"} />
          <Input
            // value="rodrigo.goncalves@rocketseat.team"
            placeholder="E-mail"
            bg={"gray.600"}
            isDisabled
          />

          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            alignSelf="flex-start"
            mt={12}
          >
            Alterar senha
          </Heading>

          <Input placeholder="Senha antiga" secureTextEntry bg={"gray.600"} />
          <Input placeholder="Nova senha" secureTextEntry bg={"gray.600"} />
          <Input
            placeholder="Confirme a nova senha"
            secureTextEntry
            bg={"gray.600"}
          />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
