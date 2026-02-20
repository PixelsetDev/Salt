import "./../../global.css";
import {Text, View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {OLink, OText} from "../../components/Overrides";
import Navbar, { Footer } from '../../components/Commons';
import { API_BASE } from '../../utils/settings';
import { usersType } from '../../utils/types';
import * as url from 'node:url';

export default function App() {
  const { username } = useLocalSearchParams();
  const cleanId = (typeof username === 'string' ? username : '').replace(/^@/, '');

  const [user, setUser] = useState<usersType>(null);

  useEffect(() => {
    fetch(API_BASE + '/v1/users/' + cleanId, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        window.location.href = '/404';
      });
  }, [cleanId]);

  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className="header grid-2">
        {user ? (
          <View className="flex-row gap-std">
            <Image source={{uri:`https://data.portalsso.com/avatar/${user.uuid}.webp`}} className={`lg:w-36 lg:h-36 md:w-28 md:h-28 w-20 h-20 rounded-full`}></Image>
            <View className="grid gap-std self-center">
              <Text className="h1 font-serif text-white" key={"user-header-name"}>{user.name}</Text>
              <Text className="h3 text-white" key={"user-header-username"}>@{user.username}</Text>
            </View>
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
          {(user?.recipes && user.recipes.length > 0) ? (
          <View className="grid-2-1 gap-std">
            {user.recipes.map((recipe) => (
              <OLink
                href={`/@${user.username}/${recipe.slug}`}
                key={recipe.slug}
                className="btn-np btn-primary flex flex-row space-x-2"
              >
                <View className="grid gap-2">
                  <View className="flex flex-row space-x-2">
                    <Image source={{uri:`https://api.ourcookbook.org/storage/recipes/@${user.username}/${recipe.slug}.webp`}} className={`lg:w-24 lg:h-24 w-16 h-16 rounded-l-md`}></Image>
                    <View className={`px-4 py-2`}>
                      <Text className="font-serif txt-2xl text-white">{recipe.name}</Text>
                      <OText className="txt-xl text-white">{recipe?.description}</OText>
                    </View>
                  </View>
                </View>
              </OLink>
            ))}
          </View>
          ) : (
            <OText className={`text-center`}>This user has no recipes.</OText>
          )}
        </View>

        <View className="grid gap-std">
          <Text className="h2 font-serif text-center">Collections</Text>

          {/*(collections && collections.length > 0) ? (
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
          ) : */(
            <OText className={`text-center`}>This user has no collections.</OText>
          )}
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}