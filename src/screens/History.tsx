import { useState } from "react";
import { Heading, VStack, SectionList, Text } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  const [exercises, setExercises] = useState(
    [
      {
        title: "26.08.22",
        data: ["Puxada frontal", "Remada unilateral"],
      },
      {
        title: "27.08.22",
        data: ["Puxada frontal"],
      },
    ]
    // [] // para testar com array vazio
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title={"Histórico de Exercícios"} />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            color={"gray.200"}
            fontSize={"md"}
            fontFamily={"heading"}
            mt={10}
            mb={3}
          >
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          !exercises.length && {
            flex: 1,
            justifyContent: "center",
          }
        }
        ListEmptyComponent={() => (
          <Text color={"gray.100"} fontSize={"md"} textAlign={"center"}>
            Não há exercícios registrados ainda.
            {/* para quebrar a linha */}
            {"\n"}
            Vamos fazer exercício hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        px={8}
      />
    </VStack>
  );
}
