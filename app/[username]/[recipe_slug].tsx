import "./../../global.css";
import { Text, View, ScrollView, ImageBackground } from 'react-native';
import { Footer, Navbar } from '../../components/Commons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { OText, OLink } from '../../components/Overrides';
import { Difficulty } from '../../components/Scales';
import { API_BASE } from '../../utils/settings';
import { recipeIngredientType, recipeType, reviewsType, stepsType } from '../../utils/types';

export default function App() {
  const { username, recipe_slug } = useLocalSearchParams();
  const cleanUsername = (typeof username === 'string' ? username : '').replace(/^@/, '');

  const [recipe, setRecipe] = useState<recipeType>(null);
  const [steps, setSteps] = useState<stepsType>(null);
  const [reviews, setReviews] = useState<reviewsType>([]);
  const [ingredients, setIngredients] = useState<recipeIngredientType>(null);

  useEffect(() => {
    if (!cleanUsername || typeof recipe_slug !== 'string') return;

    fetch(`${API_BASE}/v1/recipes/${cleanUsername}/${recipe_slug}`)
      .then(res => res.json())
      .then(data => setRecipe(data.data))
      .catch(console.error);

  }, [cleanUsername, recipe_slug]);

  useEffect(() => {
    fetch(`${API_BASE}/v1/recipes/${recipe?.id}/steps`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setSteps(data.data);
      })
      .catch((err) => console.error(err));
    fetch(`${API_BASE}/v1/recipes/${recipe?.id}/reviews`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
      })
      .catch((err) => console.error(err));
    fetch(`${API_BASE}/v1/recipes/${recipe?.id}/ingredients`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data.data);
      })
      .catch((err) => console.error(err));
    console.log(recipe);
  }, [recipe]);

  const backgroundImage = { uri: 'https://api.ourcookbook.org/storage/recipes/' + username + '/' + recipe_slug + '.webp' };

  return (
    <ScrollView>
      <Navbar />
      <ImageBackground source={backgroundImage} className="px-std py-sm">
        {recipe ? (
          <View className="gap-std p-sm grid " style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Text className="h1 font-serif text-white">{recipe.name}</Text>
            <View className="flex flex-row gap-2">
              <OText className={`text-white h3`}>By</OText>
              <OLink className="underline h3 text-white" href={`/@${recipe.author.username}`}>{recipe.author.name}</OLink>
            </View>
            <View className="flex flex-row space-x-4">
              <View className="flex flex-row space-x-1 text-white">
                <Text className={`text-white`}>☆</Text>
                <Text className={`text-white`}>☆</Text>
                <Text className={`text-white`}>☆</Text>
                <Text className={`text-white`}>☆</Text>
                <Text className={`text-white`}>☆</Text>
              </View>
              <OText className="text-white">|</OText>
              <OText className="text-white">0.0</OText>
              <OText className="text-white">|</OText>
              <OText className="text-white">0 Ratings</OText>
            </View>
          </View>
        ) : (
          <View className="gap-std grid">
            <Text className="h1 font-serif text-white">Loading...</Text>
            <OText className="text-white">Loading...</OText>
          </View>
        )}
      </ImageBackground>

      <View className="w-full h-2 bg-green relative"></View>

      {recipe && (
        <View className="gap-std p-std grid">
          <View className="grid-3 gap-std">
            <View className="gap-std span-2 bg-secondary p-xs grid">
              <Text className="h2 font-serif">About this recipe</Text>
              <OText>{(recipe.description?.trim()==="")?("Looks like the author didn't upload a description!"):recipe.description }</OText>
              <OText>This recipe serves {recipe.servings} people.</OText>
              <OText className="txt-xs">
                All information including dietary information was uploaded by the recipe author.
                We are unable to verify the accuracy of this information. Always take care and
                follow proper food hygiene procedures when cooking.
              </OText>
            </View>
            <View className="gap-std bg-secondary p-xs grid">
              <Text className="h2 font-serif">Cooking</Text>
              <OText>
                {recipe.author.name} estimates that this recipe takes {recipe.time.prep} minutes to
                prepare, and {recipe.time.cook} minutes to cook.
              </OText>
              <Difficulty
                currentStep={2}
                steps={['Beginner', 'Easy', 'Moderate', 'Difficult', 'Expert']}
              />
            </View>
            <View className="gap-std flex">
              <View className={`gap-std bg-secondary p-xs grid ${ !recipe.tips && (`flex-grow`)}`}>
                <Text className="h2 font-serif">Ingredients</Text>
                { ingredients ? (
                  ingredients.map((ingredient, index) => (
                    <View key={'ingredient' + index}>
                      <OText>
                        {ingredient.amount}
                        {ingredient.unit} {ingredient.name}
                      </OText>
                    </View>
                  ))
                ) : (
                  <>
                    <OText>
                      Looks like {recipe.author.name} didn&apos;t give us a list of ingredients...
                      that&apos;s awkward.
                    </OText>
                    <OText>
                      Try messaging them to ask, or see what&apos;s mentioned in the steps to the
                      right.
                    </OText>
                    <OText>
                      Sorry for any inconvenience caused!
                    </OText>
                  </>
                )}
              </View>
              { recipe.tips && (
              <View className="mobile-span-2 gap-std bg-secondary p-xs grid flex-grow">
                <Text className="h2 font-serif">Chef&apos;s Tips</Text>
                  <OText>{recipe.tips}</OText>
              </View>
              )}
            </View>
            <View className="span-2 gap-std bg-secondary p-xs flex">
              <Text className="h2 font-serif">Steps</Text>
              {(steps != null) ? (steps.map((step, index) => (
                <View key={step} className="flex flex-row gap-">
                  <Text className="txt-4xl font-serif">{index + 1}.&nbsp;&nbsp;</Text>
                  <OText className={`self-center`}>{step}</OText>
                </View>
              ))) : (<OText>This recipe doesn&apos;t have any steps, is it even a recipe???</OText>)}
              <View className="flex-grow"></View>
            </View>
            <View className="span-2 gap-std bg-secondary p-xs grid">
              <Text className="h2 font-serif">Reviews</Text>
              <View className="grid-2">
                {reviews !== null ? (
                  reviews.map((review, index) => (
                    <View key={'review' + index} className={`px-4 py-3 border-4 ${(review.rating === '1') ? "border-green-800" : "border-red-800"}`}>
                      {review.rating === '1' ? (
                        <View className="flex flex-row gap-2">
                          <OLink
                            href={`/@${review.author.username}`}
                            className="h3 font-serif underline">
                            {review.author.name}
                          </OLink>
                          <Text className="h3 font-serif">liked this recipe.</Text>
                        </View>
                      ) : (
                        <View className="flex flex-row gap-2">
                          <OLink
                            href={`/@${review.author.username}`}
                            className="h3 font-serif underline">
                            {review.author.name}
                          </OLink>
                          <Text className="h3 font-serif">disliked this recipe.</Text>
                        </View>
                      )}
                      {review.comment !== null && review.comment !== '' ? (
                        <OText className="italic">&quot;{review.comment}&quot;</OText>
                      ) : (
                        <OText className="italic">They didn&apos;t leave a comment.</OText>
                      )}
                    </View>
                  ))
                ) : (
                  <View className={`span-2`}>
                    <OText>Nobody has reviewed this recipe, why not be the first?</OText>
                  </View>
                )}
              </View>
            </View>
            <View className="mobile-span-2 gap-std bg-secondary p-xs grid">
              <Text className="h2 font-serif">Recipes like this</Text>
            </View>
          </View>
        </View>
      )}
      <Footer/>
    </ScrollView>
  );
}