import './../../global.css';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import Navbar, { Footer } from '../../components/Commons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { OLink, OText } from '../../components/Overrides';
import { Difficulty } from '../../components/Scales';
import { API_BASE } from '../../utils/settings';
import { dietaryType, recipeIngredientsType, recipeType, reviewsType, stepsType } from '../../utils/types';
import { parseAmount, parseUnit } from '../../utils/parser';
import { FontAwesome } from '@expo/vector-icons';
import { apiCall } from '../../utils/api.ts';

export default function App() {
  const { username, recipe_slug } = useLocalSearchParams();
  const cleanUsername = (typeof username === 'string' ? username : '').replace(/^@/, '');

  const [recipe, setRecipe] = useState<recipeType>(null);
  const [steps, setSteps] = useState<stepsType>(null);
  const [reviews, setReviews] = useState<reviewsType>(null);
  const [ingredients, setIngredients] = useState<recipeIngredientsType>(null);
  const [dietary, setDietary] = useState<dietaryType>(null);
  const [disclaimers, setDisclaimers] = useState<string[]>([]);

  useEffect(() => {
    if (!cleanUsername || typeof recipe_slug !== 'string') return;

    apiCall()(`${API_BASE}/v1/recipes/${cleanUsername}/${recipe_slug}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.data))
      .catch(console.error);
  }, [cleanUsername, recipe_slug]);

  useEffect(() => {
    if (recipe?.id !== undefined) {
      fetch(`${API_BASE}/v1/recipes/${recipe?.id}/steps`, { method: 'GET' })
        .then((res) => res.json())
        .then((data) => {
          setSteps(data.data);
        })
        .catch((err) => console.error(err));
      fetch(`${API_BASE}/v1/recipes/${recipe?.id}/reviews`, { method: 'GET' })
        .then((res) => res.json())
        .then((data) => {
          setReviews(data.data);
          console.log(data.data);
        })
        .catch((err) => console.error(err));
      fetch(`${API_BASE}/v1/recipes/${recipe?.id}/ingredients`, { method: "GET" })
        .then((res) => res.json())
        .then((data) =>
          Promise.all(
            data.data.map((item: any) =>
              fetch(`${API_BASE}/v1/ingredients/${item.ingredient}`, { method: "GET" })
                .then((res) => res.json())
                .then(({ data }) => ({
                  ...item,
                  name: data.name,
                  dietary: data.dietary,
                  disclaimer: data.disclaimer,
                }))
            )
          )
        )
        .then((ingredientsWithNames) => {
          setIngredients(ingredientsWithNames);

          const aggregatedDietary = {
            celery: 0,
            gluten: 0,
            crustaceans: 0,
            eggs: 0,
            fish: 0,
            lupin: 0,
            milk: 0,
            molluscs: 0,
            mustard: 0,
            peanuts: 0,
            sesame: 0,
            soybeans: 0,
            sulphites: 0,
            treenuts: 0,
            animal_products: 0,
            meat: 0,
          };

          const disclaimers = new Set<string>();

          ingredientsWithNames.forEach(({ dietary, disclaimer }) => {
            if (disclaimer) {
              disclaimers.add(disclaimer);
            }

            if (!dietary) return;

            if (dietary.celery > aggregatedDietary.celery) aggregatedDietary.celery = dietary.celery;
            if (dietary.gluten > aggregatedDietary.gluten) aggregatedDietary.gluten = dietary.gluten;
            if (dietary.crustaceans > aggregatedDietary.crustaceans) aggregatedDietary.crustaceans = dietary.crustaceans;
            if (dietary.eggs > aggregatedDietary.eggs) aggregatedDietary.eggs = dietary.eggs;
            if (dietary.fish > aggregatedDietary.fish) aggregatedDietary.fish = dietary.fish;
            if (dietary.lupin > aggregatedDietary.lupin) aggregatedDietary.lupin = dietary.lupin;
            if (dietary.milk > aggregatedDietary.milk) aggregatedDietary.milk = dietary.milk;
            if (dietary.molluscs > aggregatedDietary.molluscs) aggregatedDietary.molluscs = dietary.molluscs;
            if (dietary.mustard > aggregatedDietary.mustard) aggregatedDietary.mustard = dietary.mustard;
            if (dietary.peanuts > aggregatedDietary.peanuts) aggregatedDietary.peanuts = dietary.peanuts;
            if (dietary.sesame > aggregatedDietary.sesame) aggregatedDietary.sesame = dietary.sesame;
            if (dietary.soybeans > aggregatedDietary.soybeans) aggregatedDietary.soybeans = dietary.soybeans;
            if (dietary.sulphites > aggregatedDietary.sulphites) aggregatedDietary.sulphites = dietary.sulphites;
            if (dietary.treenuts > aggregatedDietary.treenuts) aggregatedDietary.treenuts = dietary.treenuts;
            if (dietary.animal_products > aggregatedDietary.animal_products) aggregatedDietary.animal_products = dietary.animal_products;
            if (dietary.meat > aggregatedDietary.meat) aggregatedDietary.meat = dietary.meat;
          });

          setDietary(aggregatedDietary);
          setDisclaimers([...disclaimers]);
        })
        .catch((err) => console.error(err));
    }
  }, [recipe]);

  const backgroundImage = { uri: 'https://api.ourcookbook.org/storage/recipes/' + username + '/' + recipe_slug + '.webp' };

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <ImageBackground source={backgroundImage} className={`px-std py-sm`}>
        {recipe ? (
          <View className={`gap-std p-sm grid`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Text className={`h1 font-serif text-white`}>{recipe.name}</Text>
            <View className={`flex flex-row gap-2`}>
              <OLink className={`txt-2xl text-white`} href={`/@${recipe.author.username}`}>Created by <Text className={`underline`}>{recipe.author.name}</Text>.</OLink>
            </View>
            {reviews?.score !== -1 ? (
            <View className={`flex flex-row gap-4`}>
              <View className={`flex flex-row gap-1`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesome
                    key={star}
                    name={star <= Math.round(reviews?.score || 0) ? "star" : "star-o"}
                    size={24}
                    color="#fff"
                  />
                ))}
              </View>
              <OText className={`text-white`}>|</OText>
              <OText className={`text-white`}>{reviews?.score }</OText>
              <OText className={`text-white`}>|</OText>
              <OText className={`text-white`}>{reviews?.reviews?.length} Ratings</OText>
            </View>
            ) : (<OText className={`text-white italic`}>This recipe doesn&apos;t have any reviews yet.</OText>)}
          </View>
        ) : (
          <View className={`gap-std grid`}>
            <Text className={`h1 font-serif text-white`}>Loading...</Text>
            <OText className={`text-white`}>Loading...</OText>
          </View>
        )}
      </ImageBackground>

      <View className={`w-full h-2 bg-green relative`}></View>

      {recipe && (
        <View className={`gap-std p-std grid`}>
          <View className={`grid-3 gap-std`}>
            <View className={`gap-std span-2 bg-secondary p-xs grid`}>
              <Text className={`h2 font-serif`}>About this recipe</Text>
              <OText>{(recipe.description?.trim()==="")?("Looks like the author didn't upload a description!"):recipe.description }</OText>
              <View className={`border-t-2 border-neutral-200 mt-2 text-xs`}></View>
              <OText className={`txt-xs`}>
                {dietary && (() => {
                  if (!dietary) return null;

                  const contains: string[] = [];
                  const mayContain: string[] = [];
                  const allergens: (keyof typeof dietary)[] = [
                    "celery","gluten","crustaceans","eggs","fish","lupin","milk","molluscs",
                    "mustard","peanuts","sesame","soybeans","sulphites","treenuts"
                  ];

                  allergens.forEach((key) => {
                    const value = dietary[key];
                    if (value === 2) contains.push(key);
                    else if (value === 1) mayContain.push(key);
                  });

                  const sentences: string[] = [];
                  if (contains.length) sentences.push(`Contains ${contains.join(", ")}.`);
                  if (mayContain.length) sentences.push(`May contain ${mayContain.join(", ")}.`);

                  if (dietary.animal_products === 2) sentences.push("Not suitable for vegans.");
                  else if (dietary.animal_products === 1) sentences.push("May not be suitable for vegans.");

                  if (dietary.meat === 2) sentences.push("Not suitable for vegetarians.");
                  else if (dietary.meat === 1) sentences.push("May not be suitable for vegetarians.");

                  if (sentences.length !== 0) { sentences.unshift("Dietary information:"); }

                  return sentences.join(" ");
                })()}
              </OText>
              <OText className={`txt-xs`}>
                Always follow proper food hygiene procedures when cooking.{ disclaimers.map((disclaimer) => (' '+disclaimer))}
                &nbsp;Recipe information uploaded by the author, OurCookbook cannot guarantee the accuracy or completeness of any information on this page.
              </OText>
            </View>
            <View className={`gap-std bg-secondary p-xs grid`}>
              <Text className={`h2 font-serif`}>Cooking</Text>
              <OText>This recipe serves {recipe.servings} people.</OText>
              <OText>
                {recipe.author.name} estimates that this recipe takes {recipe.time.prep} minutes to
                prepare, and {recipe.time.cook} minutes to cook.
              </OText>
              <Difficulty
                currentStep={2}
                steps={['Beginner', 'Easy', 'Moderate', 'Difficult', 'Expert']}
              />
            </View>
            <View className={`gap-std flex`}>
              <View className={`gap-std bg-secondary p-xs grid ${ !recipe.tips && (`flex-grow`)}`}>
                <Text className={`h2 font-serif`}>Ingredients</Text>
                { ingredients ? (
                  <View className={`flex-row divide-x-2 divide-neutral-200/75`}>
                    <View className={`grid gap-1 flex-grow divide-y-2 divide-neutral-300`}>
                      { ingredients.map((ingredient, index) => (
                        <OText key={'ingredient-name' + index} className={`flex-grow pr-2 pt-1`}>{ingredient.name}</OText>
                      ))}
                    </View>
                    <View className={`grid gap-1 divide-y-2 divide-neutral-300`}>
                      { ingredients.map((ingredient, index) => (
                        <OText key={'ingredient-amount' + index} className={`pl-2 pt-1`}>{parseAmount(ingredient.amount)} {parseUnit(ingredient.amount, ingredient.unit)}</OText>
                      ))}
                    </View>
                  </View>
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
              <View className={`mobile-span-2 gap-std bg-secondary p-xs grid flex-grow`}>
                <Text className={`h2 font-serif`}>Chef&apos;s Tips</Text>
                  <OText>{recipe.tips}</OText>
              </View>
              )}
            </View>
            <View className={`span-2 gap-std bg-secondary p-xs`}>
              <Text className={`h2 font-serif`}>Steps</Text>
              {(steps != null) ? (steps.map((step, index) => (
                <View key={step} className={`flex flex-row gap-std`}>
                  <Text className={`txt-4xl font-serif dark:text-white`}>{index + 1}.&nbsp;&nbsp;</Text>
                  <OText className={`self-center`}>{step}</OText>
                </View>
              ))) : (<OText>This recipe doesn&apos;t have any steps, is it even a recipe???</OText>)}
              <View className={`flex-grow`}></View>
            </View>
            <View className={`span-2 gap-std bg-secondary p-xs grid`}>
              <Text className={`h2 font-serif`}>Reviews</Text>
              <View className={`grid-2 gap-std`}>
                {reviews?.reviews && reviews?.score !== -1 ? (
                  reviews.reviews.map((review, index) => (
                    <View key={'review' + index} className={`px-4 py-3 border-4 ${(review.rating === 5 || review.rating === 4) ? "border-green-800" : (review.rating === 3) ? "border-yellow-700" : "border-red-800"}`}>
                      <View className={`flex flex-row gap-2`}>
                        <OLink
                          href={`/@${review.author.username}`}
                          className={`h3 font-serif underline`}>
                          {review.author.name}
                        </OLink>
                        <Text className={`h3 font-serif`}>{review.rating}/5</Text>
                      </View>
                      {review.comment !== null && review.comment !== '' ? (
                        <OText className={`italic`}>&quot;{review.comment}&quot;</OText>
                      ) : (
                        <OText className={`italic`}>They didn&apos;t leave a comment.</OText>
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
            <View className={`mobile-span-2 gap-std bg-secondary p-xs grid`}>
              <Text className={`h2 font-serif`}>Recipes like this</Text>
              <OText className={`italic`}>Coming soon, check back later!</OText>
            </View>
          </View>
        </View>
      )}
      <Footer/>
    </ScrollView>
  );
}