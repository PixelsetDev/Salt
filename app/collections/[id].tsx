import "./../../global.css";
import { Text, View, ScrollView, Image } from 'react-native';
import Navbar from "../../components/Navbar";
import { OLink, OText } from '../../components/Overrides';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { RecipeLink } from '../../components/RecipeLink';

export default function App() {
  const { id } = useLocalSearchParams();

  const [collection, setCollection] = useState<{
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
    fetch("https://api.ourcookbook.org/collections/" + id, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setCollection(data.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <ScrollView>
      <Navbar />
      <View className="header">
        <View className="grid gap-std">
          {collection ? (
            <Text className="h1 font-serif text-white">{collection.name}</Text>
          ) : (
            <Text className="h1 font-serif text-white">Loading...</Text>
          )}
        </View>
      </View>

      {collection ? (
        <View className="p-std grid gap-std">
          <OText className="text-center">{collection.description}</OText>
          <OLink
            href={"/@"+collection.author.username}
            className="btn-np btn-primary flex flex-row space-x-2"
          >
            <Image
              source={{ uri: collection.author.avatar }}
              className="h-full rounded-l-md w-20"
            />
            <View className="grid gap-2 px-4 py-2">
              <OText className="txt-xl text-white">This collection was curated by</OText>
              <Text className="font-serif txt-2xl text-white">{collection.author.name}</Text>
            </View>
          </OLink>
          <View className="grid-2-1 gap-std">
            {collection?.recipes?.map((recipe) => (
              <RecipeLink recipe={recipe} key={recipe.slug}>
                <OText className="italic text-white">&quot;{recipe.notes}&quot;</OText>
              </RecipeLink>
            ))}
          </View>
        </View>
      ) : (
        <View className="p-std grid gap-std">
          <OText className="text-center">Loading...</OText>
          <OLink
            href={"#"}
            className="btn-np btn-primary flex flex-row space-x-2"
          >
            <Image
              source={{}}
              className="h-full rounded-l-md w-20"
            />
            <View className="grid gap-2 px-4 py-2">
              <OText className="txt-xl text-white">This collection was curated by</OText>
              <Text className="font-serif txt-2xl text-white">Loading...</Text>
            </View>
          </OLink>
        </View>
      )}
    </ScrollView>
  );
}