import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { RecipeLink } from './RecipeLink';

const RecipeSearch = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [recipes, setRecipes] = useState<
    {
      slug: string;
      title: string;
      author: {
        name: string;
        username: string;
      };
      description: string;
    }[]
  >([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchRecipes(search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    fetchRecipes(); // Initial load
  }, []);

  const fetchRecipes = async (query = "") => {
    setRecipes([]); // clear results immediately
    setLoading(true);
    setShowSpinner(false);

    const spinnerDelay = setTimeout(() => {
      setShowSpinner(true);
    }, 300);

    try {
      const url = `https://api.ourcookbook.org/recipes${query ? `?query=${encodeURIComponent(query)}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data.data)) {
        setRecipes(data.data);
      } else {
        setRecipes([]);
        console.warn("No recipes found:", data.status?.message || "Unknown issue");
      }
    } catch (err) {
      console.log("Error fetching recipes:", err);
    } finally {
      clearTimeout(spinnerDelay);
      setLoading(false);
      setShowSpinner(false);
    }
  };

  return (
    <View className="grid gap-std p-std">
      <Text className="h2 font-serif text-center">Search</Text>
      <TextInput
        placeholder="Search recipes..."
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
        className="input"
        returnKeyType="search"
      />

      {showSpinner && (
        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
      )}

      <View className="grid-5 gap-std">
        {recipes.map((recipe) => (
          <RecipeLink recipe={recipe} key={recipe.slug} />
        ))}
      </View>

      {!loading && recipes.length === 0 && (
        <Text className="txt-xl text-center">No results found.</Text>
      )}
    </View>
  );
}

export default RecipeSearch;