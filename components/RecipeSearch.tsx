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
    <View className={`gap-std grid`}>
      <TextInput
        placeholder="Search recipes..."
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
        className={`input`}
        returnKeyType="search"
      />

      {showSpinner && <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />}

      <View className={`gap-std`}>
        {/* FEATURED FIRST ITEM - SPANS ENTIRE GRID WIDTH */}
        {recipes.length > 0 && (
          <View className={`mb-std`}>
            {navigateToRecipe ? (
              <RecipeLink recipe={recipes[0]} key={recipes[0].slug}>
                {null}
              </RecipeLink>
            ) : (
              <OPressable
                onPress={() => handleRecipePress(recipes[0])}
                key={recipes[0].slug}
                className={`btn-np btn-primary w-full`}>
                <View className={`grid grid-cols-3 gap-std`}>
                  <Image
                    source={{
                      uri: `https://api.ourcookbook.org/storage/recipes/@${recipes[0].author.username}/${recipes[0].slug}.webp`,
                    }}
                    className={`col-span-1 rounded-l-md flex-1`}
                  />
                  <View className={`col-span-2 grid gap-2 px-4 py-3`}>
                    <Text className={`txt-xl font-serif text-white`}>{recipes[0].title}</Text>
                    <OText className={`txt-lg text-white`}>By {recipes[0].author.name}</OText>
                  </View>
                </View>
              </OPressable>
            )}
          </View>
        )}

        {/* MASONRY RESPONSIVE GRID - Using dynamic flex columns to prevent disappearing items */}
        <View className={`flex-row gap-std`}>
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <View
              key={`col-${colIndex}`}
              className={`flex-1 flex-col gap-std`}
            >
              {recipes.slice(1).filter((_, i) => i % columnCount === colIndex).map((recipe) => (
                navigateToRecipe ? (
                  <RecipeLink recipe={recipe} key={recipe.slug}>{null}</RecipeLink>
                ) : (
                  <OPressable
                    onPress={() => handleRecipePress(recipe)}
                    key={recipe.slug}
                    className={`btn-np btn-primary w-full`}>
                    <View className={`flex-col`}>
                      <Image
                        source={{ uri: `https://api.ourcookbook.org/storage/recipes/@${recipe.author.username}/${recipe.slug}.webp` }}
                        className={`w-full aspect-square rounded-t-md`}
                      />
                      <View className={`px-3 py-2`}>
                        <Text className={`txt-md font-serif text-white`}>{recipe.title}</Text>
                        <OText className={`txt-sm text-white`}>{recipe.author.name}</OText>
                      </View>
                    </View>
                  </OPressable>
                )
              ))}
            </View>
          ))}
        </View>
      </View>

      {!loading && recipes.length === 0 && (
        <Text className={`txt-xl text-center`}>No results found.</Text>
      )}
    </View>
  );
};

export default RecipeSearch;