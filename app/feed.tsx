import "./../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar from "../components/Navbar";
import { useLogto } from '@logto/rn';
import NoAuth from '../components/NoAuth';

export default function App() {
  const { isAuthenticated } = useLogto();

  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Chef&apos;s Feed</Text>
        </View>
      </View>
      {isAuthenticated ? (
        <View>

          <View className="p-std grid gap-std">

          </View>
        </View>
      ) : (
        <NoAuth />
      )}
    </ScrollView>
  );
}
