import { ActivityIndicator, Text, TextInput, View, Image, useWindowDimensions } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
import { RecipeLink } from './RecipeLink';
import { OPressable, OText } from './Overrides';

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

  const { width } = useWindowDimensions();

  const columnCount = useMemo(() => {
    if (!navigateToRecipe) return 2;
    if (width >= 1280) return 5;
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    return 2;
  }, [width, navigateToRecipe]);

  const columns = useMemo(() => {
    const result: Recipe[][] = Array.from({ length: columnCount }, () => []);
    recipes.forEach((recipe, index) => {
      result[index % columnCount].push(recipe);
    });
    return result;
  }, [recipes, columnCount]);

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
    setRecipes([]);
    setLoading(true);
    setShowSpinner(false);
    const spinnerDelay = setTimeout(() => setShowSpinner(true), 300);

    fetch(`https://api.ourcookbook.org/recipes${query ? `?query=${encodeURIComponent(query)}` : ''}`)
      .then(async (res) => (res.status === 204 ? { data: [] } : res.json()))
      .then((data) => {
        if (Array.isArray(data.data)) setRecipes(data.data);
      })
      .catch((err) => console.log('Error fetching recipes:', err))
      .finally(() => {
        clearTimeout(spinnerDelay);
        setLoading(false);
        setShowSpinner(false);
      });
  };

  const handleRecipePress = (recipe: Recipe) => {
    if (onRecipePress) onRecipePress(recipe);
  };

  return (
    <View className="gap-std">
      <TextInput
        placeholder="Search recipes..."
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
        className="input"
        returnKeyType="search"
      />

      {showSpinner && <ActivityIndicator size="large" color="#ffffff" className="mt-5" />}

      <View className="flex-row gap-std">
        {columns.map((col, i) => (
          <View key={`col-${i}`} className="flex-1 gap-std">
            {col.map((recipe) => (
              <View key={recipe.slug}>
                {navigateToRecipe ? (
                  <RecipeLink recipe={recipe}>{null}</RecipeLink>
                ) : (
                  <OPressable
                    onPress={() => handleRecipePress(recipe)}
                    className="btn-np btn-primary overflow-hidden"
                  >
                    <View className="flex-col">
                      <Image
                        source={{
                          uri: `https://api.ourcookbook.org/storage/recipes/@${recipe.author.username}/${recipe.slug}.webp`,
                        }}
                        className="w-full rounded-t-md aspect-square"
                      />
                      <View className="gap-2 px-4 py-3">
                        <Text className="txt-xl font-serif text-white">{recipe.title}</Text>
                        <OText className="txt-lg text-white">By {recipe.author.name}</OText>
                      </View>
                    </View>
                  </OPressable>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      {!loading && recipes.length === 0 && (
        <Text className="txt-xl text-center">No results found.</Text>
      )}
    </View>
  );
};

export default RecipeSearch;
