import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [groups, setGroups] = useState([
    "Costas",
    "Bíceps",
    "Tríceps",
    "Ombro",
  ]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);
  const [groupSelected, setGroupSelected] = useState("costas");
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            //  colocar só isActive é o mesmo que isActive={false}
            // para compara as strings independente do case
            isActive={
              // String(groupSelected).toLowerCase() === String(item).toLowerCase()
              groupSelected.toLowerCase() === item.toLowerCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        _contentContainerStyle={{
          px: 8,
          // para testar o height:
          // bg: "amber.400",
        }}
        my={10}
        // por padrão ela stretch e ocupada toda altura disponível da tela
        maxH={10}
        // minH={10} para mim não precisou colocar isso.. mto feio..
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Heading color={"gray.200"} fontSize={"md"}>
            Exercícios
          </Heading>
          <Text color={"gray.200"} fontSize={"sm"}>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
