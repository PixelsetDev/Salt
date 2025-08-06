import "./../../global.css";
import {Text, View, ScrollView, Image} from 'react-native';
import Navbar from "../../components/Navbar";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {OLink, OText} from "../../components/Overrides";

export default function App() {

  const { chef } = useLocalSearchParams();
  const cleanId = (typeof chef === 'string' ? chef : '').replace(/^@/, '');

  const [user, setUser] = useState<{
    name: string;
    username: string;
    avatar: string;
  } | null>(null);

  const [recipes, setRecipes] = useState<{
    slug: string;
    title: string;
    author: {
        name: string;
        username: string;
    }
  }[]>([]);

  const [collections, setCollections] = useState<{
    slug: string;
    name: string;
    description: string;
    featured: boolean;
  }[]>([]);

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
          if (Array.isArray(data.data)) {
              setRecipes(data.data);
          } else {
              setRecipes([]);
              console.warn("No recipes found:", data.status?.message || "Unknown issue");
          }
      })
      .catch((err) => console.error(err));

    fetch("https://api.ourcookbook.org/collections?user="+cleanId, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
          if (Array.isArray(data.data)) {
              setCollections(data.data);
          } else {
              setCollections([]);
              console.warn("No collections found:", data.status?.message || "Unknown issue");
          }
      })
      .catch((err) => console.error(err));
  }, [cleanId]);

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

      <View className="p-std grid gap-xl">
          <View className="grid gap-std">
              <Text className="h2 font-serif text-center">Recipes</Text>

              <View className="grid-2 gap-std">
                  {recipes.map((recipe) => (
                      <OLink
                          href={"/@"+cleanId+"/"+recipe.slug}
                          key={recipe.slug}
                          className="btn-np btn-primary flex flex-row space-x-2"
                      >
                          <Image
                              source={{ uri: "https://api.ourcookbook.org/storage/recipes/@"+cleanId+"/"+recipe.slug+".webp" }}
                              className="h-full rounded-l-md w-20"
                          />
                          <View className="grid gap-2 px-4 py-2">
                              <Text className="font-serif txt-2xl text-white">{recipe.title}</Text>
                              <OText className="txt-xl text-white">By {recipe.author.name}</OText>
                          </View>
                      </OLink>
                  ))}
              </View>
          </View>
          <View className="grid gap-std">
              <Text className="h2 font-serif text-center">Collections</Text>

              <View className="grid-2 gap-std">
                  {collections.map((collection) => (
                      <OLink
                          href={"/collections/"+collection.slug}
                          key={collection.slug}
                          className="btn-np btn-primary flex flex-row space-x-2"
                      >
                          <View className="grid gap-2 px-4 py-2">
                              <View className="flex flex-row space-x-2">
                                  <Text className="font-serif txt-2xl text-white">{collection.name}</Text>
                                  <View className="flex-grow"></View>
                                  {collection.featured && (
                                      <OText className="txt-xl text-white">Featured</OText>
                                  )}
                              </View>
                              <OText className="txt-xl text-white">{collection.description}</OText>
                          </View>
                      </OLink>
                  ))}
              </View>
          </View>
      </View>
    </ScrollView>
  );
}