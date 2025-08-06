import "./../../global.css";
import { Text, View, ScrollView } from 'react-native';
import Navbar from "../../components/Navbar";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function App() {

  const { id } = useLocalSearchParams();

  const [user, setUser] = useState<{
    name: string;
    username: string;
    avatar: string;
  }[]>([]);

  useEffect(() => {
    fetch("https://api.ourcookbook.org/user/"+id, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
            {user.map((usr) => (
              <Text className="h1 font-serif text-white" key={usr.username+"-header"}>{usr.username}</Text>
            ))}
        </View>
      </View>

      <View className="p-std gap-std">Recipe</View>
    </ScrollView>
  );
}