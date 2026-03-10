import {
  ActivityIndicator,
  Button,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Navbar, { Footer } from './Commons';
import { Desktop } from './Exclusions';
import { OLink, OPressable, OText } from './Overrides';
import RecipeSearch from './RecipeSearch';
import { useEffect, useState } from 'react';
import { collectionType, feedType, recipeType } from '../utils/types.ts';
import { API_BASE } from '../utils/settings.ts';
import { ErrorBox } from './Boxes.tsx';
import { RecipeLink } from './RecipeLink.tsx';
import { useUser } from './auth/UserProvider.tsx';
import { FontAwesome } from '@expo/vector-icons';
import { useApiCall } from '../utils/api.ts';
import { useToast } from './ToastProvider.tsx';
import { router } from 'expo-router';
import { TextInput } from './Forms.tsx';

export const UnauthedHomepage = () => {
  const [collections, setCollections] = useState<collectionType[]>([]);
  const [popularRecipes, setPopularRecipes] = useState<{recipes: recipeType[]}>();

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
        console.log(body.data);
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
        {(popularRecipes && popularRecipes.recipes.length > 0) ? (
          <View className={`grid gap-std`}>
            <View className={`grid-5 gap-std`}>
              {popularRecipes?.recipes.slice(0, 5).map((recipe) => (
                recipe && (
                  <RecipeLink recipe={recipe} key={recipe.slug}/>
                )
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
            <View className={`grid-4 gap-std items-stretch`}>
              {collections.map((collection) => (!!collection?.featured && (
                <OLink href={`/collections/${collection.slug}`} className={`grid gap-2 px-4 py-2 btn btn-secondary relative group`} passthroughClassName="h-full" key={collection.id}>
                  <Text className={`txt-4xl font-serif group-hover:text-white`}>{collection.name}</Text>
                  <OText className={`group-hover:text-white`}>{collection.description}</OText>
                  <OText className={`txt-subtle group-hover:text-white`}>By {(collection.author.name === 'SYSTEM') ? 'OurCookbook' : collection.author.name}</OText>
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

export const AuthedHomepage = () => {
  const { user } = useUser();
  const apiCall = useApiCall();
  const toast = useToast();

  const [feed, setFeed] = useState<feedType>(null);

  useEffect(() => {
    apiCall(`${API_BASE}/v1/feed/`, false)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          toast.showToast({type: 'error', message: 'Unable to load feed - error '+res.status});
        }
      })
      .then(json => {
        setFeed(json.data);
      })
      .catch((err) => {
        toast.showToast({type: 'error', message: err.message});
      })
  }, [user]);

  return (
    <ScrollView className={`body`}>
      <Navbar />

      <View className={`header gap-std grid`}>
        <View className={`grid`}>
          <View className={`grid`}>
            <Text className={`h1 font-serif text-white`}>Welcome back {user?.name}.</Text>
          </View>
        </View>
      </View>

      <View className="p-std gap-xl grid">
        <View className="bg-secondary p-xs grid-3 gap-std">
          <Text className="h2 span-3 font-serif">Quick links.</Text>
          <OLink className="btn btn-primary" href="/search">
            Recipes
          </OLink>
          <OLink className="btn btn-primary" href="/collections/top-10">
            Popular Recipes
          </OLink>
          <OLink className="btn btn-primary" href="/collections">
            Collections
          </OLink>
          <OLink className="btn btn-primary" href="/new">
            New Post
          </OLink>
          <OLink className="btn btn-primary" href={`/@${user?.username}`}>
            Your Profile
          </OLink>
          <OLink className="btn btn-primary" href="/account">
            Manage Account
          </OLink>
        </View>

        <View className="gap-std grid">
          <Text className="h2 font-serif">Your feed.</Text>
          { feed ? (
          <View className="gap-std grid lg:grid-cols-3">
            <View className="gap-std grid lg:col-span-2">
              {/*<View className="gap-sm bg-secondary p-xs grid md:grow">
                <Text className="h3 font-serif">Post to the feed!</Text>
                <View className="flex-row gap-sm">
                  <TextInput className="input grow"/>
                  <OPressable onPress={()=>{return;}} className="btn btn-primary">Post</OPressable>
                </View>
              </View>*/}

              { feed.feed.length > 0 ? (
                feed.feed.map(item => {
                  return (
                    <View className="gap-sm bg-secondary p-xs grid md:grow">
                      <View className="gap-sm flex-row">
                        <Image
                          source={{ uri: `https://data.portalsso.com/avatar/${item.author.uuid}.webp` }}
                          className="h-12 w-12 rounded-full" />
                        <View className="grid">
                          <Text className="h3">{item.author.name}</Text>
                          <OText className="txt-xs txt-subtle">@{item.author.username}</OText>
                        </View>
                      </View>
                      <OText className="font-bold">Posted a new {item.type.toLowerCase()}: {item.name}</OText>
                      <OText>{item.description}</OText>
                      <Text className="txt-xs txt-subtle">{new Date(item.created).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</Text>
                    </View>
                  );
                })
              ) : (
                <View className="gap-sm bg-secondary p-xs grid md:grow">
                  <OText className="font-bold">Hello?</OText>
                  <OText>There&apos;s nothing in your feed right now, maybe check back again later!</OText>
                </View>
              )}
            </View>
            <View className="gap-std grid">
              <View className="gap-std bg-secondary p-xs grid">
                <Text className="h2 font-serif">What&apos;s new?</Text>
                <OText className="te">
                  Welcome to the new OurCookbook digital experience - &quot;Salt &amp; Pepper&quot;!
                  We&apos;ve added a whole host of new features including Smart Search, Meal Plans,
                  Shopping Lists, Recipe Categories, Dietary Information, Private Collections, a
                  whole new website, and so much more!
                </OText>
                <OLink href="/news/2026-03-07-spice-up-ya-life" className="btn btn-primary">
                  Learn more
                </OLink>
              </View>
              <View className="gap-std bg-secondary p-xs grid">
                <Text className="h2 font-serif">Following</Text>
                { feed.following.length > 0 ? (
                  <Text className="txt-xs txt-subtle">You are following {feed.following.length} chef{feed.following.length > 1 && ('s')}.</Text>
                ) : (
                  <Text className="txt-xs txt-subtle">You are not following any chefs.</Text>
                )}
                <View className="grid gap-sm">
                  { feed.following.length > 0 && (
                    feed.following.map(item => {
                      return (<OPressable className="btn btn-secondary" onPress={() => {router.push(`/@${item.username}`)}} key={item.username}>{item.name}</OPressable>);
                    })
                  )}
                </View>
              </View>
              <View className="gap-std bg-secondary p-xs grid">
                <Text className="h2 font-serif">Followers</Text>
                { feed.followers.length > 0 ? (
                  <Text className="txt-xs txt-subtle">You have {feed.followers.length} follower{feed.followers.length > 1 && ('s')}.</Text>
                ) : (
                  <Text className="txt-xs txt-subtle">You do not have any followers.</Text>
                )}
                <View className="grid gap-sm">
                  { feed.followers.length > 0 && (
                    feed.followers.map(item => {
                      return (<OPressable className="btn btn-secondary" className="btn btn-secondary" onPress={() => {router.push(`/@${item.username}`)}} key={item.username}>{item.name}</OPressable>);
                    })
                  )}
                </View>
              </View>
            </View>
          </View>
          ) : (
            <ActivityIndicator size="large"/>
          )}
        </View>
      </View>
      <Footer />
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