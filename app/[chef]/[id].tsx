import "./../../global.css";
import { Text, View, ScrollView, ImageBackground } from 'react-native';
import Navbar from "../../components/Navbar";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import he from 'he';
import { OText, OLink } from '../../components/Overrides';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Difficulty } from '../../components/Scales';

export default function App() {
  const { chef, id } = useLocalSearchParams();
  const cleanId = (typeof chef === 'string' ? chef : '').replace(/^@/, '');

  const [recipe, setRecipe] = useState<{
    title: string;
    description: string;
    ingredients: [{
      Item: string;
      Amount: string;
      Unit: string;
    }];
    steps: string[];
    dietary: {
      dairy_free: string;
      gluten_free: string;
      vegan: string;
      vegetarian: string;
    };
    tips: string|null;
    servings: string;
    time: {
      cook: string;
      prep: string;
    };
  } | null>(null);

  const [reviews, setReviews] = useState<
    {
      rating: string;
      comment: string | null;
      author: {
        username: string;
        name: string;
      };
    }[]
  >([]);

  useEffect(() => {
    fetch("https://api.ourcookbook.org/recipes/" + cleanId + '/' + id, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.data);
      })
      .catch((err) => console.error(err));
    fetch("https://api.ourcookbook.org/recipes/" + cleanId + '/' + id + '/reviews', { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
      })
      .catch((err) => console.error(err));
  }, [cleanId, id]);

  return (
    <ScrollView>
      <Navbar />
      <ImageBackground source={'https://api.ourcookbook.org/storage/recipes/'+chef+'/'+id+'.webp'} className="px-std py-sm">
        {recipe ? (
          <View className="grid gap-std p-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Text className="h1 font-serif text-white">{ he.decode(recipe.title) }</Text>
            <View className="flex flex-row space-x-4">
              <View className="text-white flex flex-row space-x-1">
                <FontAwesome6 name="star" size={22} color="white" />
                <FontAwesome6 name="star" size={22} color="white" />
                <FontAwesome6 name="star" size={22} color="white" />
                <FontAwesome6 name="star" size={22} color="white" />
                <FontAwesome6 name="star" size={22} color="white" />
              </View>
              <OText className="text-white">|</OText>
              <OText className="text-white">0.0</OText>
              <OText className="text-white">|</OText>
              <OText className="text-white">0 Ratings</OText>
            </View>
          </View>
        ) : (
          <View className="grid gap-std">
            <Text className="h1 font-serif text-white">Loading...</Text>
            <OText className="text-white">Loading...</OText>
          </View>
        )}
      </ImageBackground>

      {recipe && (
        <View className="grid gap-std p-std">
          <View className="grid-3 gap-std">
            <View className="grid gap-std span-2 bg-secondary p-xs">
              <Text className="h2 font-serif">About this recipe</Text>
              <OText>{he.decode(recipe.description)}</OText>
            </View>
            <View className="bg-secondary p-xs mobile-span-2">
              <Text className="h2 font-serif">Difficulty</Text>
              <Difficulty currentStep={2} steps={['Beginner','Easy','Moderate','Difficult','Expert']}/>
            </View>
            <View className="grid gap-std bg-secondary p-xs">
              <Text className="h2 font-serif">Cooking time.</Text>
              <OText>Preparing: {recipe.time.prep} minutes</OText>
              <OText>Cooking: {recipe.time.cook} minutes</OText>
            </View>
            <View className="grid gap-std bg-secondary p-xs">
              <Text className="h2 font-serif">Servings</Text>
              <OText>This recipe serves {recipe.servings} people.</OText>
            </View>
            <View className="grid gap-std bg-secondary p-xs">
              <Text className="h2 font-serif">Dietary</Text>
              <View className="sm:flex hidden flex-row gap-2">
                {recipe.dietary.dairy_free === "1" ? (<OText>Dairy free</OText>) : (<OText>Contains dairy</OText>)}
                <OText>|</OText>
                {recipe.dietary.gluten_free === "1" ? (<OText>Gluten free</OText>) : (<OText>Contains gluten</OText>)}
                <OText>|</OText>
                {recipe.dietary.vegan === "1" ? (<OText>Vegan</OText>) : (<OText>Not vegan</OText>)}
                <OText>|</OText>
                {recipe.dietary.vegetarian === "1" ? (<OText>Vegetarian</OText>) : (<OText>Not vegetarian</OText>)}
              </View>
              <OText className="txt-sm sm:block hidden">
                All information including dietary information was uploaded by the recipe author. We are unable to
                verify the accuracy of this information. Always take care and follow proper food hygiene procedures
                when cooking.
              </OText>
              <View className="sm:hidden grid gap-2">
                {recipe.dietary.gluten_free === "1" ? (
                  <View className="flex flex-row gap-2"><FontAwesome6 name="leaf" color="green" size={22} /> <OText>Vegan</OText></View>
                ) : (
                  <View className="flex flex-row gap-2"><FontAwesome6 name="leaf" color="red" size={22} /> <OText>Not vegan</OText></View>
                )}
                {recipe.dietary.gluten_free === "1" ? (
                  <View className="flex flex-row gap-2"><FontAwesome6 name="leaf" color="green" size={22} /> <OText>Vegetarian</OText></View>
                ) : (
                  <View className="flex flex-row gap-2"><FontAwesome6 name="leaf" color="red" size={22} /> <OText>Not vegetarian</OText></View>
                )}
                {recipe.dietary.dairy_free === "1" ? (
                  <View className="flex flex-row gap-2"><FontAwesome6 name="cow" color="green" size={22} /> <OText>Dairy free</OText></View>
                ) : (
                  <View className="flex flex-row gap-2"><FontAwesome6 name="cow" color="red" size={22} /> <OText>Contains dairy</OText></View>
                )}
                {recipe.dietary.gluten_free === "1" ? (
                  <View className="flex flex-row gap-2"><FontAwesome6 name="bread-slice" color="green" size={22} /> <OText>Gluten free</OText></View>
                ) : (
                  <View className="flex flex-row gap-2"><FontAwesome6 name="bread-slice" color="red" size={22} /> <OText>Contains gluten</OText></View>
                )}
                <OText className="txt-sm">
                  All information including dietary information was uploaded by the recipe author. We are unable to
                  verify the accuracy of this information. Always take care and follow proper food hygiene procedures
                  when cooking.
                </OText>
              </View>
            </View>
            <View className="flex gap-std">
              <View className="grid gap-std bg-secondary p-xs">
                <Text className="h2 font-serif">Ingredients</Text>
                {recipe.ingredients.map((ingredient) => (
                  <View key={ingredient.key}>
                    <OText>{ingredient.Amount}{ingredient.Unit} {ingredient.Item}</OText>
                  </View>
                ))}
              </View>
              <View className="mobile-span-2 grid gap-std bg-secondary p-xs flex-grow">
                <Text className="h2 font-serif">Tips from the Author</Text>
                {typeof recipe.tips === "string" ? (
                  <OText>{he.decode(recipe.tips)}</OText>
                ) : (
                  <OText>Have fun and enjoy cooking!</OText>
                )}
              </View>
            </View>
            <View className="flex span-2 gap-std bg-secondary p-xs">
              <Text className="h2 font-serif">Steps</Text>
              {recipe.steps.map((step, index) => (
                <View key={step} className="flex flex-row gap-2">
                  <Text className="font-serif txt-xl">{index+1}.</Text>
                  <OText>{step}</OText>
                </View>
              ))}
              <View className="flex-grow"></View>
            </View>
            <View className="span-2 grid gap-std bg-secondary p-xs">
              <Text className="h2 font-serif">Reviews</Text>
              <View className="grid-2">
                {reviews.map((review) => (
                  <View key={reviews.key} className="border-2 border-green-800 p-xs">
                    {review.rating === "1" && (
                      <View className="flex flex-row gap-2">
                        <OLink href="/@{review.author.username}" className="underline txt-lg">{review.author.name}</OLink>
                        <OText>liked this recipe.</OText>
                      </View>
                    )}
                    {review.rating !== null && (
                    <OText className="italic">&quot;{review.comment}&quot;</OText>
                    )}
                  </View>
                ))}
              </View>
            </View>
            <View className="mobile-span-2 grid gap-std bg-secondary p-xs">
              <Text className="h2 font-serif">Recipes like this</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}