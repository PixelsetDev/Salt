import "./../../global.css";
import { Text, View, ScrollView } from 'react-native';
import Navbar from "../../components/Navbar";

export default function App() {
  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
            <Text className="h1 font-serif text-white">Recipe</Text>
        </View>
      </View>

      <View className="p-std grid gap-std">

      </View>
    </ScrollView>
  );
}