import { ActivityIndicator, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { RecipeLink } from './RecipeLink';
import { OLink, OPressable, OText } from './Overrides';

interface Recipe {
  slug: string;
  title: string;
  author: {
    name: string;
    username: string;
  };
  description: string;
}

interface RecipeSearchProps {
  navigateToRecipe?: boolean;
  onRecipePress?: (recipe: Recipe) => void;
}

const RecipeSearch = ({ navigateToRecipe = true, onRecipePress }: RecipeSearchProps) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchRecipes(search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async (query = '') => {
    setRecipes([]); // clear results
    setLoading(true);
    setShowSpinner(false);

    const spinnerDelay = setTimeout(() => {
      setShowSpinner(true);
    }, 300);

    fetch(
      `https://api.ourcookbook.org/recipes${
        query ? `?query=${encodeURIComponent(query)}` : ''
      }`
    )
      .then(async (res) => {
        if (res.status === 204) {
          return { data: [], status: { message: 'No content' } };
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setRecipes(data.data);
        } else {
          setRecipes([]);
          console.warn('No recipes found:', data.status?.message || 'Unknown issue');
        }
      })
      .catch((err) => {
        console.log('Error fetching recipes:', err);
      })
      .finally(() => {
        clearTimeout(spinnerDelay);
        setLoading(false);
        setShowSpinner(false);
      });
  };

  const handleRecipePress = (recipe: Recipe) => {
    if (onRecipePress) {
      onRecipePress(recipe);
    }
  };

  return (
    <View className="gap-std grid">
      <TextInput
        placeholder="Search recipes..."
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
        className="input"
        returnKeyType="search"
      />

      {showSpinner && <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />}

      <View className={`${navigateToRecipe ? (`grid-5`) : (`grid-2`)} gap-std`}>
        {recipes.map((recipe) =>
          navigateToRecipe ? (
            <RecipeLink recipe={recipe} key={recipe.slug}>
              {null}
            </RecipeLink>
          ) : (
            <OPressable
              onPress={() => handleRecipePress(recipe)}
              key={recipe.slug}
              className="btn-np btn-primary">
              <View className={`grid grid-cols-3 gap-std`}>
                <Image
                  source={{
                    uri: `https://api.ourcookbook.org/storage/recipes/@${recipe.author.username}/${recipe.slug}.webp`,
                  }}
                  className="col-span-1 rounded-l-md flex-1"
                />
                <View className="col-span-2 grid gap-2 px-4 py-3">
                  <Text className="txt-xl font-serif text-white">{recipe.title}</Text>
                  <OText className="txt-lg text-white">By {recipe.author.name}</OText>
                </View>
              </View>
            </OPressable>
          )
        )}
      </View>

      {!loading && recipes.length === 0 && (
        <Text className="txt-xl text-center">No results found.</Text>
      )}
    </View>
  );
};

export default RecipeSearch;
