import "./../global.css";
import { Text, View, ScrollView } from 'react-native';
import Navbar from "../components/Navbar";
import { SearchBar } from 'react-native-screens';

export default function App() {
  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Recipes</Text>
        </View>
      </View>

      <SearchBar/>
    </ScrollView>
  );
}
