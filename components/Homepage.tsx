import { Button, ImageBackground, ScrollView, Text, View } from 'react-native';
import Navbar, { Footer } from './Commons';
import { Desktop } from './Exclusions';
import { OLink, OText } from './Overrides';
import RecipeSearch from './RecipeSearch';
import { useEffect, useState } from 'react';
import { collectionType } from '../utils/types.ts';
import { API_BASE } from '../utils/settings.ts';
import { ErrorBox } from './Boxes.tsx';

export const Homepage = () => {
  const [collections, setCollections] = useState<collectionType[]>([]);
  const [popularRecipes, setPopularRecipes] = useState<collectionType[]>([]);

  useEffect(() => { getData(); },[]);

  async function getData() {
    fetch(API_BASE + '/v1/collections/', { method: 'GET' })
      .then((response) => response.json())
      .then((body) => {
        setCollections(body.data);
      });
    fetch(API_BASE + '/v1/collections/1', { method: 'GET' })
      .then((response) => response.json())
      .then((body) => {
        setPopularRecipes(body.data);
      });
  }

  // noinspection PointlessBooleanExpressionJS
  return (
    <ScrollView className={`body`}>
      <Navbar/>

      <Desktop className={`nomobile`}>
        <View className={`header grid gap-std`}>
          <View className={`grid`}>
            <View className={`grid`}>
              <Text className={`h1 font-serif text-white`}>Let&#39;s cook</Text>
              <Text className={`h1 font-serif text-white`}>with OurCookbook</Text>
            </View>
            <OText className={`h3 text-white`}>
              Cook with recipes submitted by your friends and people around the world on
              OurCookbook.
            </OText>
          </View>
        </View>
      </Desktop>

      <View className={`p-std grid gap-std`}>
        <ImageBackground source={{ uri: 'https://api.ourcookbook.org/storage/recipes/no-image.webp' }} resizeMode={`cover`} className={`span-2 p-sm`}>
          <View className={`bg-white/25 p-sm grid gap-std`}>
            <Text className={`h2 font-serif text-white`}>
              Spice up ya life!
            </Text>
            <OText className={`text-white`}>
              Welcome to Salt, the new OurCookbook UI. Powered by our revolutionary new Pepper server
              (see what we did there), this latest update brings a whole host of new features.
            </OText>
            <OText className={`text-white`}>
              From categories, to overhauled collections, dietary and allergen information, a new
              recommendations algorithm, and over 500 ingredients in a new open-source API.
              We&apos;ve got everything a chef needs covered.
            </OText>
            <OLink href={`/news/2026-03-07-spice-up-ya-life`} className={`btn btn-primary`}>
              Learn more
            </OLink>
          </View>
        </ImageBackground>
      </View>

      <View className={`px-std grid gap-std`}>
        <Text className={`h2 text-center font-serif`}>Popular recipes</Text>
        {(popularRecipes && popularRecipes.length > 0) ? (
          <View className={`grid gap-std`}>
            <View className={`grid-3 gap-std`}>
              {popularRecipes.map((recipe) => (
                <OLink href={`/collections/${recipe.slug}`} className={`grid gap-2 px-4 py-2 btn btn-primary relative`} key={recipe.id}>
                  <Text className={`txt-2xl font-serif`}>{recipe.name}</Text>
                  <OText className={`text-white`}>By {recipe.author.name}</OText>
                </OLink>
              ))}
            </View>
          </View>
        ) : (
          <ErrorBox message={`We're having trouble loading collections right now, please try again later...`}/>
        )}
      </View>

      <View className={`p-std grid gap-std`}>
        <Text className={`h2 text-center font-serif`}>Featured Collections</Text>
        {(collections && collections.length > 0) ? (
          <View className={`grid gap-std`}>
            <View className={`grid-4 gap-std`}>
              {collections.map((collection) => (!!collection?.featured && (
                <OLink href={`/collections/${collection.slug}`} className={`grid gap-2 px-4 py-2 btn btn-secondary relative group`} key={collection.id}>
                  <Text className={`txt-4xl font-serif group-hover:text-white`}>{collection.name}</Text>
                  <OText className={`group-hover:text-white`}>{collection.description}</OText>
                  <OText className={`txt-subtle group-hover:text-white`}>By {collection.author.name}</OText>
                </OLink>
              )))}
            </View>
          </View>
        ) : (
          <ErrorBox message={`We're having trouble loading collections right now, please try again later...`}/>
        )}
      </View>

      <View className={`px-std grid gap-std`}>
        <Text className={`h2 text-center font-serif`}>What do you fancy?</Text>
        <RecipeSearch/>
      </View>

      <View className={`p-std grid gap-std`}>
        <Text className={`h2 text-center font-serif`}>Join our community</Text>

        <OLink
          href="/join"
          className="btn btn-primary text-center grid gap-2"
        >
          <Text className="font-serif txt-2xl text-white">Join OurCookbook</Text>
          <OText className="text-white">
            Join OurCookbook today and become one of our chefs. It&#39;s free and takes only a minute, and
            you&#39;ll get access to loads of exclusive member-only features!
          </OText>
        </OLink>
      </View>
      <Footer/>
    </ScrollView>
  );
};

export const WelcomeScreen = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <ScrollView>
      <View className={`gap-xl p-std grid`}>
        <View className={`grid`}>
          <Text className={`h2 text-center font-serif`}>Welcome to the</Text>
          <Text className={`h1 text-center font-serif`}>OurCookbook App</Text>
        </View>

        <View className={`gap-std`}>
          <OText className={`h3 text-center`}>
            This app is under active development and may not work as expected at this time.
          </OText>
          <OText className={`h3 text-center`}>
            If you find any issues, please report them to ocb-app-issues@pixelset.dev
          </OText>
          <OText className={`h3 text-center`}>
            You can always use our existing website at ourcookbook.org
          </OText>
        </View>

        <Button title={`Continue`} onPress={onContinue} />
      </View>
    </ScrollView>
  );
};