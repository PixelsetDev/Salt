import "./../../global.css";
import { Text, View, ScrollView } from 'react-native';
import Navbar from "../../components/Navbar";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function App() {

  const { id } = useLocalSearchParams();
  const cleanId = (typeof id === 'string' ? id : '').replace(/^@/, '');

  const [user, setUser] = useState<{
    name: string;
    username: string;
    avatar: string;
  } | null>(null);

  const [recipes, setRecipes] = useState<{
    slug: string;
    title: string;
    author: object;
  } | null>(null);

  useEffect(() => {
    fetch("https://api.ourcookbook.org/users/"+cleanId, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.error(err));
    fetch("https://api.ourcookbook.org/recipes?user="+cleanId, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        {user ? (
          <View className="grid gap-std">
            <Text className="h1 font-serif text-white" key={"user-header-name"}>{user.name}</Text>
            <Text className="h3 text-white" key={"user-header-username"}>@{user.username}</Text>
          </View>
        ) : (
          <View className="grid gap-std">
            <Text className="h1 font-serif text-white">Loading...</Text>
            <Text className="h3 text-white">Loading...</Text>
          </View>
        )}
      </View>

      <View className="p-std grid gap-std">
          <Text className="h2 font-serif text-center">Recipes</Text>
      </View>
    </ScrollView>
  );
}