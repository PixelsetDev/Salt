import "./../../global.css";
import { Text, View, ScrollView, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Footer, Navbar } from '../../components/Commons';
import { categoriesType, categoryType, ingredientsType, ingredientType } from '../../utils/types';
import { API_BASE } from '../../utils/settings';

export default function App() {
  const [categories, setCategories] = useState<categoriesType>(null);
  const [ingredients, setIngredients] = useState<ingredientsType>([]);
  const [ingredient, setIngredient] = useState<ingredientType>(null);
  const [category, setCategory] = useState<categoryType>(null);

  useEffect(() => { getCategories(); },[]);

  async function getCategories() {
    fetch(API_BASE + '/v1/ingredients/categories/', { method: 'GET' })
      .then((response) => response.json())
      .then((body) => {
        clear();
        setCategories(body.data);
      });
  }

  async function getCategory(id: number) {
    fetch(API_BASE + '/v1/ingredients/categories/' + id, { method: 'GET' })
      .then((response) => response.json())
      .then(async (body) => {
        clear();
        setCategory(body.data);

        if (body.data.ingredients && body.data.ingredients.length > 0) {
          const ingredientRequests = body.data.ingredients.map((ingredientId: number) =>
            fetch(API_BASE + '/v1/ingredients/' + ingredientId)
              .then((res) => res.json())
              .then((resBody) => ({
                id: ingredientId,
                ...resBody.data
              }))
          );

          const fullIngredients = await Promise.all(ingredientRequests);
          setIngredients(fullIngredients);
        } else {
          setIngredients([]);
        }
      });
  }

  async function getIngredient(id: number) {
    fetch(API_BASE + '/v1/ingredients/' + id, { method: 'GET' })
      .then((response) => response.json())
      .then((body) => {
        clear();
        setIngredient(body.data);
      });
  }

  function clear() {
    setIngredient(null);
    setIngredients([]);
    setCategory(null);
    setCategories(null);
  }

  function parseAllergen(result: number) {
    if (result === 0) {
      return 'No'
    } else if (result === 1) {
      return 'Some brands/manufacturers, check packaging.'
    } else if (result === 2) {
      return 'Yes'
    }
  }

  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className="header grid-2">
        {categories ? (
          <View className="grid gap-std">
            <Text className="h1 font-serif text-white" key={"user-header-name"}>Ingredients</Text>
            <Text className="h3 text-white"></Text>
          </View>
        ) : category ? (
          <View className="grid gap-std">
            <Text className="h1 font-serif text-white" key={"user-header-name"}>Ingredients</Text>
            <Text className="h3 text-white">{category.name}</Text>
          </View>
        ) : ingredient ? (
          <View className="grid gap-std">
            <Text className="h1 font-serif text-white" key={"user-header-name"}>Ingredients</Text>
            <Text className="h3 text-white">{ingredient.name}</Text>
          </View>
        ) : (
          <View className="grid gap-std">
            <Text className="h1 font-serif text-white">Loading...</Text>
            <Text className="h3 text-white">Loading...</Text>
          </View>
        )}
      </View>

      <View className="p-std grid gap-xl">
        {(categories && categories.length > 0) ? (
          <View className="grid gap-std">
            <Text className="h2 font-serif text-center">Categories</Text>
            <View className="grid-2 gap-std">
              {categories.map((category) => (
                <Pressable onPress={() => getCategory(category.id)} className="grid gap-2 px-4 py-2" key={category.id}>
                  <Text className="btn btn-primary txt-2xl text-white">{category.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <>
            {(category?.subcategories && category.subcategories.length > 0) && (
              <View className="grid gap-std">
                <Text className="h2 font-serif text-center">Subcategories ({category.subcategories.length})</Text>
                <View className="grid-2 gap-std">
                  {category.subcategories.map((category) => (
                    <Pressable onPress={() => getCategory(category.id)} className="grid gap-2 px-4 py-2" key={category.id}>
                      <Text className="btn btn-primary txt-2xl text-white">{category.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
            {(ingredients && ingredients.length > 0) && (
              <View className="grid gap-std">
                <Text className="h2 font-serif text-center">Ingredients ({ingredients.length})</Text>
                <View className="grid-2 gap-std">
                  {ingredients.map((ingredient) => (
                    <Pressable
                      onPress={() => getIngredient(ingredient.id)}
                      className="grid gap-2 px-4 py-2"
                      key={ingredient.id}
                    >
                      <Text className="btn btn-primary txt-2xl text-white">
                        {ingredient.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
            {ingredient && (
              <View className="grid gap-xl">
                <View className="grid gap-std">
                  <Text className="h2 font-serif text-center">Allergen Information</Text>

                  <Text className={`txt-xl text-center`}><Text className={`font-bold`}>Important:</Text> {ingredient.disclaimer}</Text>

                  { ingredient.dietary != null && (
                    <View className={`grid-2 gap-std`}>
                      <Text className={`txt-xl font-bold`}>Contains Celery:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.celery)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Gluten:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.gluten)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Crustaceans:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.crustaceans)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Eggs:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.eggs)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Fish:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.fish)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Lupin:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.lupin)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Milk:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.milk)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Molluscs:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.molluscs)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Mustard:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.mustard)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Peanuts:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.peanuts)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Sesame:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.sesame)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Soybeans:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.soybeans)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Sulphites:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.sulphites)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains Tree Nuts:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.treenuts)}</Text>
                    </View>
                  )}
                </View>
                <View className="grid gap-std">
                  <Text className="h2 font-serif text-center">Dietary</Text>

                  <Text className={`txt-xl text-center`}><Text className={`font-bold`}>Important:</Text> {ingredient.disclaimer}</Text>

                  { ingredient.dietary != null && (
                    <View className={`grid-2 gap-std`}>
                      <Text className={`txt-xl font-bold`}>Contains animal products:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.animal_products)}</Text>
                      <Text className={`txt-xl font-bold`}>Contains meat:</Text>
                      <Text className={`txt-xl`}>{parseAllergen(ingredient.dietary.meat)}</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
            <Pressable onPress={() => getCategories()} className="grid gap-2 px-4 py-2">
              <Text className="btn btn-secondary txt-2xl">Back</Text>
            </Pressable>
          </>
        )}
      </View>
      <Footer/>
    </ScrollView>
  );
}