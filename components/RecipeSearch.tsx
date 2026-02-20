import { ActivityIndicator, Text, TextInput, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
import { RecipeLink } from './RecipeLink';
import { OPressable, OText } from './Overrides';
import { API_BASE } from '../utils/settings';
import { FontAwesome } from '@expo/vector-icons';

interface Recipe {
  slug: string;
  name: string;
  author: {
    uuid: string;
    name: string;
    username: string;
  };
  description: string;
}

interface Category {
  id: number;
  name: string;
  parent?: number | null;
}

interface RecipeSearchProps {
  navigateToRecipe?: boolean;
  onRecipePress?: (recipe: Recipe) => void;
  onSearchPerformed?: (performed: boolean) => void;
  user?: string;
  doSearch?: string;
}

const RecipeSearch = ({ navigateToRecipe = true, onRecipePress, user, doSearch, onSearchPerformed }: RecipeSearchProps) => {
  const [search, setSearch] = useState(doSearch || '');
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [parentCategory, setParentCategory] = useState<number | null>(null);
  const [dietaryOptions, setDietaryOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const columnCount = useMemo(() => {
    if (!navigateToRecipe) return 2;
    if (width >= 1280) return 4;
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
    fetch(`${API_BASE}/v1/recipes/categories`)
      .then(res => res.json())
      .then(data => setCategories(data.data || []))
      .catch(() => setCategories([]));

    fetch(`${API_BASE}/v1/ingredients/dietary`)
      .then(res => res.json())
      .then(data => setDietaryOptions(data.data || []))
      .catch(() => setDietaryOptions([]));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchRecipes(search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, user, selectedCategory, selectedDietary]);

  const fetchRecipes = async (query = '') => {
    onSearchPerformed?.(true);
    setRecipes([]);
    setLoading(true);
    setShowSpinner(false);
    const spinnerDelay = setTimeout(() => setShowSpinner(true), 300);

    try {
      let url = `${API_BASE}/v1/recipes`;
      const params = new URLSearchParams();

      if (query) params.append('search', query);
      if (user) params.append('user', user);
      if (selectedCategory !== null && query) params.append('category', String(selectedCategory));
      if (selectedDietary.length > 0) params.append('dietary', JSON.stringify(selectedDietary));

      if (!query && selectedCategory !== null) {
        const categoryRes = await fetch(`${API_BASE}/v1/recipes/categories/${selectedCategory}`);
        const categoryData = await categoryRes.json();

        // If the category has a parent, we are looking at a subcategory
        // We keep the current subcategories list so it doesn't disappear
        if (categoryData.data?.parent) {
          setParentCategory(categoryData.data.parent);
        } else {
          // If it's a top-level category, update the subcategories list
          setSubcategories(categoryData.data?.subcategories || []);
          setParentCategory(null);
        }

        const recipeIds: number[] = categoryData.data?.recipes || [];
        const detailedRecipes = await Promise.all(
          recipeIds.map(async (id) => {
            try {
              const res = await fetch(`${API_BASE}/v1/recipes/${id}`);
              const json = await res.json();
              return json.data;
            } catch (e) {
              return null;
            }
          })
        );

        setRecipes(detailedRecipes.filter(r => r !== null));
      } else {
        if (!selectedCategory) {
          setSubcategories([]);
          setParentCategory(null);
        }

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const res = await fetch(url);
        if (res.status === 204) {
          setRecipes([]);
        } else {
          const data = await res.json();
          setRecipes(Array.isArray(data.data) ? data.data : []);
        }
      }
    } catch (error) {
      setRecipes([]);
    } finally {
      clearTimeout(spinnerDelay);
      setLoading(false);
      setShowSpinner(false);
    }
  };

  const toggleDietary = (item: string) => {
    setSelectedDietary(prev =>
      prev.includes(item)
        ? prev.filter(d => d !== item)
        : [...prev, item]
    );
  };

  const handleRecipePress = (recipe: Recipe) => {
    if (onRecipePress) onRecipePress(recipe);
  };

  const FiltersContent = (
    <View className="grid gap-std">
      <View className="p-4 bg-secondary grid gap-std">
        <OText className="txt-lg font-bold text-white">Categories</OText>
        <View className="grid gap-sm">
          {categories.map(cat => (
            <OPressable
              key={cat.id}
              onPress={() => {
                const isCurrent = selectedCategory === cat.id || parentCategory === cat.id;
                setSelectedCategory(isCurrent ? null : cat.id);
                setParentCategory(null);
              }}
              className={`px-3 py-2 rounded-md btn ${(selectedCategory === cat.id || parentCategory === cat.id) ? 'btn-primary' : 'btn-secondary'}`}
            >
              <OText className="text-white">{cat.name}</OText>
            </OPressable>
          ))}
        </View>
      </View>

      <View className="p-4 bg-secondary grid gap-std">
        <OText className="txt-lg font-bold text-white">Dietary</OText>
        <View className="grid gap-sm">
          {dietaryOptions.map(option => (
            <OPressable
              key={option}
              onPress={() => toggleDietary(option)}
              className={`px-3 py-2 rounded-md ${selectedDietary.includes(option) ? 'btn-danger' : 'btn-primary'}`}
            >
              <OText className="text-white">{selectedDietary.includes(option) ? `Excludes ${option}` : `Includes ${option}`}</OText>
            </OPressable>
          ))}
        </View>
      </View>
    </View>
  );

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

      {!isDesktop && (
        <OPressable
          className="btn btn-secondary flex-row items-center grid gap-sm"
          onPress={() => setShowFilters(prev => !prev)}
        >
          <FontAwesome name="sliders" size={16} />
          <OText className="text-white">Filters</OText>
        </OPressable>
      )}

      {!isDesktop && showFilters && (
        <View>
          {FiltersContent}
        </View>
      )}

      <View className={`${isDesktop ? 'flex-row gap-std' : ''}`}>
        {isDesktop && <View className="w-64">{FiltersContent}</View>}

        <View className="flex-1">
          {/* Subcategories Row */}
          {subcategories.length > 0 && !search && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row gap-sm">
                {subcategories.map(sub => (
                  <OPressable
                    key={sub.id}
                    onPress={() => {
                      // If clicking the active subcategory, go back to parent
                      if (selectedCategory === sub.id) {
                        setSelectedCategory(parentCategory);
                      } else {
                        setSelectedCategory(sub.id);
                      }
                    }}
                    className={`px-4 py-2 rounded-full btn ${selectedCategory === sub.id ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    <OText className="text-white">{sub.name}</OText>
                  </OPressable>
                ))}
              </View>
            </ScrollView>
          )}

          {showSpinner && <ActivityIndicator size="large" color="#ffffff" className="mb-5" />}

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
                            <Text className="txt-xl font-serif text-white">{recipe.name}</Text>
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

          {!loading && recipes.length === 0 && <OText className="text-center">No results found.</OText>}
        </View>
      </View>
    </View>
  );
};

export default RecipeSearch;