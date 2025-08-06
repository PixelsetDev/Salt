import "./../../global.css";
import { Text, View, ScrollView } from 'react-native';
import Navbar from "../../components/Navbar";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function App() {
  const { id } = useLocalSearchParams();

  const [recipe, setRecipe] = useState<{
    name: string;
    description: string;
    slug: string;
    recipes: {
      title: string;
      slug: string;
      notes: string;
      author: {
        name: string;
        username: string
      }
    },
    author: {
      name: string;
      username: string
    }
  } | null>(null);

  useEffect(() => {
    fetch("https://api.ourcookbook.org/recipes/" + user + '/' + chicken-curry, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          {recipe ? (
            <Text className="h1 font-serif text-white">{recipe.name}</Text>
          ) : (
            <Text className="h1 font-serif text-white">Loading...</Text>
          )}
        </View>
      </View>

      <View className="p-std grid gap-std">

      </View>
    </ScrollView>
  );
}