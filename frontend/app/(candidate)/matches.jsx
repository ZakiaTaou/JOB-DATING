import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useCandidateMatches } from "../../hooks/useMatches";

export default function CandidateMatchesScreen() {
  const { data, isLoading } = useCandidateMatches();
  console.log(data);
  if (isLoading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="p-4 border-b">
          <Text className="font-bold">
            {item.JobOffer.title}
          </Text>

          <Text className="text-gray-500">
            {item.JobOffer.Recruiter.companyName}
          </Text>

          <TouchableOpacity className="mt-2 bg-black p-2 rounded">
            <Text className="text-white text-center">Message</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
