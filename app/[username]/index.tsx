import "./../../global.css";
import {Text, View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {OLink, OText} from "../../components/Overrides";
import Navbar, { Footer } from '../../components/Commons';
import { API_BASE } from '../../utils/settings';
import { usersType } from '../../utils/types';
import { ErrorBox } from '../../components/Boxes.tsx';
import { FontAwesome } from '@expo/vector-icons';
import { RecipeLink } from '../../components/RecipeLink.tsx';
import { useApiCall } from '../../utils/api.ts';

export default function App() {
  const { username } = useLocalSearchParams();
  const cleanId = (typeof username === 'string' ? username : '').replace(/^@/, '');

  const [error, setError] = useState<string|null>(null);
  const [user, setUser] = useState<usersType>(null);

  const apiCall = useApiCall();

  useEffect(() => {
    const call = async () => {
      try {
        const res = await apiCall(API_BASE + '/v1/users/' + cleanId, false, { method: 'GET' });
        if (res.status === 404) {
          globalThis.location.href = '/404';
          setError('404: Page not found');
        } else {
          const data = await res.json();
          setUser(data.data);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    call();
  }, [cleanId, apiCall]);

  // noinspection PointlessBooleanExpressionJS
  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        {user ? (
          <View className="gap-std flex-row">
            <Image
              source={{ uri: `https://data.portalsso.com/avatar/${user.uuid}.webp` }}
              className={`h-20 w-20 rounded-full md:h-28 md:w-28 lg:h-36 lg:w-36`}></Image>
            <View className="gap-std grid self-center">
              <Text className="h1 font-serif text-white" key={'user-header-name'}>
                {user.name}
              </Text>
              <Text className="h3 text-white" key={'user-header-username'}>
                @{user.username}
              </Text>
            </View>
          </View>
        ) : (
          <View className="gap-std grid">
            <Text className="h1 font-serif text-white">Loading...</Text>
            <Text className="h3 text-white">Loading...</Text>
          </View>
        )}
      </View>

      <View className="p-std gap-xl grid">
        {error && <ErrorBox message={error} />}

        <View className="gap-std grid">
          <Text className="h2 text-center font-serif">Recipes</Text>
          {user?.recipes && user.recipes.length > 0 ? (
            <View className="grid-5 gap-std">
              {user.recipes.map((recipe) => (
                <RecipeLink recipe={{ slug: recipe.slug, name: recipe.name, author: {username: user.username, name: user.name} }} key={recipe.slug}/>
              ))}
            </View>
          ) : (
            <OText className={`text-center`}>This user has no recipes.</OText>
          )}
        </View>

        <View className="gap-std grid">
          <Text className="h2 text-center font-serif">Collections</Text>

          {user?.collections && user.collections.length > 0 ? (
            <View className={`gap-std grid`}>
              <View className={`grid-3 gap-std`}>
                {user.collections.map(
                  (collection) =>
                    !!collection.featured && (
                      <OLink
                        href={`/collections/${collection.slug}`}
                        className={`btn btn-primary relative grid gap-2 px-4 py-2`}
                        key={collection.slug}>
                        <Text className={`txt-2xl font-serif`}>{collection.name}</Text>
                        <OText>{collection.description}</OText>
                        <OText
                          className={`absolute top-0 right-0 rounded-tr-md rounded-bl-md bg-yellow-500 px-2 text-yellow-900`}>
                          <FontAwesome name={`star`} size={16} />
                          &nbsp; Featured
                        </OText>
                      </OLink>
                    )
                )}
                {user.collections.map(
                  (collection) =>
                    !collection.featured && (
                      <OLink
                        href={`/collections/${collection.slug}`}
                        className={`btn btn-primary grid gap-2 px-4 py-2`}
                        key={collection.slug}>
                        <Text className={`txt-2xl font-serif`}>{collection.name}</Text>
                        <OText>{collection.description}</OText>
                      </OLink>
                    )
                )}
              </View>
            </View>
          ) : (
            <OText className={`text-center`}>This user has no collections.</OText>
          )}
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}