import "./../../global.css";
import {Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {OLink, OText} from "../../components/Overrides";
import { Footer, Navbar } from '../../components/Commons';
import RecipeSearch from '../../components/RecipeSearch';

export default function App() {
  const { chef } = useLocalSearchParams();
  const cleanId = (typeof chef === 'string' ? chef : '').replace(/^@/, '');

  const [user, setUser] = useState<{
    name: string;
    username: string;
    avatar: string;
  } | null>(null);

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
        if (data.status.code === "200 OK") {
          setUser(data.data);
        } else {
          window.location.href='/404';
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
      <Navbar/>
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
          <RecipeSearch user={cleanId} navigateToRecipe={true} />
        </View>

        <View className="grid gap-std">
          <Text className="h2 font-serif text-center">Collections</Text>

          {(collections && collections.length > 0) ? (
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
          ) : (
            <OText className={`text-center`}>This user has no collections.</OText>
          )}
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}