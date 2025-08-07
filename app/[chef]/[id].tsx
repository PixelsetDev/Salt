import "./../../global.css";
import { Text, View, ScrollView, ImageBackground } from 'react-native';
import Navbar from "../../components/Navbar";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import he from 'he';
import { OText } from '../../components/Overrides';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Difficulty } from '../../components/Scales';

export default function App() {
  const { chef, id } = useLocalSearchParams();
  const cleanId = (typeof chef === 'string' ? chef : '').replace(/^@/, '');

  const [recipe, setRecipe] = useState<{
    title: string;
    description: string;
    ingredients: {
      Item: string;
      Amount: string;
      Unit: string;
    },
    steps: object,
    dietary: {
      dairy_free: string;
      gluten_free: string;
      vegan: string;
      vegetarian: string;
    },
    tips: string;
  } | null>(null);

  useEffect(() => {
    fetch("https://api.ourcookbook.org/recipes/" + cleanId + '/' + id, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.data);
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
            <View className="span-2 bg-secondary p-xs">
              <OText className="font-bold">About this recipe</OText>
              <OText>{he.decode(recipe.description)}</OText>
            </View>
            <View className="bg-secondary p-xs">
              <OText className="font-bold">Difficulty</OText>
              <Difficulty currentStep={2} steps={['Beginner','Easy','Moderate','Difficult','Expert']}/>
            </View>
            <View className="grid bg-secondary p-xs">
              <OText className="font-bold">This meal takes {parseInt(recipe.time.prep) + parseInt(recipe.time.cook)} minutes in total.</OText>
              <OText>Preparing: {recipe.time.prep} minutes</OText>
              <OText>Cooking: {recipe.time.cook} minutes</OText>
            </View>
            <View className="grid bg-secondary p-xs">
              <OText className="font-bold">Servings</OText>
              <OText>This recipe serves {recipe.servings} people.</OText>
            </View>
            <View className="grid bg-secondary p-xs">
              <OText className="font-bold">Dietary</OText>
              <View className="flex flex-row gap-2">
                {recipe.dietary.dairy_free === "1" ? (<OText>Dairy free</OText>) : (<OText>Contains dairy</OText>)}
                <OText>|</OText>
                {recipe.dietary.gluten_free === "1" ? (<OText>Gluten free</OText>) : (<OText>Contains gluten</OText>)}
                <OText>|</OText>
                {recipe.dietary.vegan === "1" ? (<OText>Vegan</OText>) : (<OText>Not vegan</OText>)}
                <OText>|</OText>
                {recipe.dietary.vegetarian === "1" ? (<OText>Vegetarian</OText>) : (<OText>Not vegetarian</OText>)}
              </View>
            </View>
          </View>
          <View className="grid-3 gap-std">
            <View className="grid gap-2 bg-secondary p-xs">
              <Text className="h2 font-serif">Ingredients</Text>
              {recipe.ingredients.map((ingredient) => (
                <View key={ingredient.key}>
                  <OText>{ingredient.Amount}{ingredient.Unit} {ingredient.Item}</OText>
                </View>
              ))}
            </View>
            <View className="grid span-2 gap-2 bg-secondary p-xs">
              <Text className="h2 font-serif">Steps</Text>
              {recipe.steps.map((step, index) => (
                <View key={step} className="flex flex-row gap-2">
                  <OText>{index+1}.</OText>
                  <OText>{step}</OText>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}