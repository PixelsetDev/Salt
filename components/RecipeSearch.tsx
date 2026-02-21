import { ActivityIndicator, Text, TextInput, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { RecipeLink } from './RecipeLink';
import { OPressable, OText } from './Overrides';
import { API_BASE } from '../utils/settings';
import { FontAwesome } from '@expo/vector-icons';

interface Recipe { slug: string; name: string; author: { uuid: string; name: string; username: string; }; description: string; }
interface Category { id: number; name: string; parent?: number | null; }

const RecipeSearch = ({ navigateToRecipe = true, onRecipePress, user, doSearch, onSearchPerformed }: any) => {
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

  const columns = useMemo(() => {
    const count = !navigateToRecipe ? 2 : width >= 1280 ? 4 : width >= 768 ? 3 : 2;
    const cols: Recipe[][] = Array.from({ length: count }, () => []);
    recipes.forEach((r, i) => cols[i % count].push(r));
    return cols;
  }, [recipes, width, navigateToRecipe]);

  useEffect(() => {
    const fetchMeta = (path: string, setter: any) => fetch(`${API_BASE}${path}`).then(r => r.json()).then(d => setter(d.data || [])).catch(() => setter([]));
    fetchMeta('/v1/recipes/categories', setCategories);
    fetchMeta('/v1/ingredients/dietary', setDietaryOptions);
  }, []);

  const fetchRecipes = useCallback(async (query = '') => {
    onSearchPerformed?.(true);
    setRecipes([]); setLoading(true); setShowSpinner(false);
    const timeout = setTimeout(() => setShowSpinner(true), 300);
    try {
      if (!query && selectedCategory !== null) {
        const cat = await fetch(`${API_BASE}/v1/recipes/categories/${selectedCategory}`).then(r => r.json());
        if (cat.data?.parent) setParentCategory(cat.data.parent);
        else { setSubcategories(cat.data?.subcategories || []); setParentCategory(null); }
        const detailed = await Promise.all((cat.data?.recipes || []).map((id: number) => fetch(`${API_BASE}/v1/recipes/${id}`).then(r => r.json()).then(j => j.data).catch(() => null)));
        setRecipes(detailed.filter(r => r));
      } else {
        if (!selectedCategory) { setSubcategories([]); setParentCategory(null); }
        const p = new URLSearchParams();
        if (query) p.append('search', query);
        if (user) p.append('user', user);
        if (selectedCategory && query) p.append('category', String(selectedCategory));
        if (selectedDietary.length) p.append('dietary', JSON.stringify(selectedDietary));
        const res = await fetch(`${API_BASE}/v1/recipes?${p.toString()}`);
        const data = res.status === 204 ? { data: [] } : await res.json();
        setRecipes(Array.isArray(data.data) ? data.data : []);
      }
    } catch { setRecipes([]); } finally { clearTimeout(timeout); setLoading(false); setShowSpinner(false); }
  }, [selectedCategory, selectedDietary, user, onSearchPerformed]);

  useEffect(() => {
    const t = setTimeout(() => fetchRecipes(search), 300);
    return () => clearTimeout(t);
  }, [search, fetchRecipes]);

  const btnStyle = (active: boolean, type = 'primary') => `px-3 py-2 rounded-md btn ${active ? `btn-${type}` : 'btn-secondary'}`;

  const Filters = () => (
    <View className="grid gap-std">
      <View className="p-4 bg-secondary grid gap-std">
        <Text className="txt-4xl font-serif dark:text-white">Categories</Text>
        <View className="grid gap-sm">
          {categories.map(c => (
            <OPressable key={c.id} className={btnStyle(selectedCategory === c.id || parentCategory === c.id)}
                        onPress={() => { setSelectedCategory(selectedCategory === c.id || parentCategory === c.id ? null : c.id); setParentCategory(null); }}>
              <OText className="dark:text-white">{c.name}</OText>
            </OPressable>
          ))}
        </View>
      </View>
      <View className="p-4 bg-secondary grid gap-std">
        <Text className="txt-4xl font-serif dark:text-white">Dietary</Text>
        <Text className="txt-xs text-neutral-500 italic">
          Always check product labels, this is for guidance only and may be incorrect.
        </Text>
        <View className="grid gap-sm">
          {dietaryOptions.map(o => (
            <OPressable key={o} className={btnStyle(selectedDietary.includes(o), 'danger')} onPress={() => setSelectedDietary(d => d.includes(o) ? d.filter(x => x !== o) : [...d, o])}>
              <OText className="dark:text-white">{selectedDietary.includes(o) ? `Excludes ${o}` : `Includes ${o}`}</OText>
            </OPressable>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View className="gap-std">
      <TextInput placeholder="Search recipes..." placeholderTextColor="#ccc" value={search} onChangeText={setSearch} className="input" returnKeyType="search" />

      {!isDesktop && (
        <OPressable className="btn btn-secondary flex-row items-center gap-sm" onPress={() => setShowFilters(!showFilters)}>
          <FontAwesome name="sliders" size={16} /><OText className="dark:text-white">Filters</OText>
        </OPressable>
      )}

      <View className={isDesktop ? "flex-row gap-std" : "gap-std"}>
        {((!isDesktop && showFilters) || isDesktop) && <View className={isDesktop ? "w-64" : ""}>{Filters()}</View>}

        <View className="flex-1">
          {/* Constrained Subcategories container */}
          {subcategories.length > 0 && !search && (
            <View className="mb-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-sm">
                  {subcategories.map(s => (
                    <OPressable key={s.id} onPress={() => setSelectedCategory(selectedCategory === s.id ? parentCategory : s.id)} className={btnStyle(selectedCategory === s.id)}>
                      <OText className="dark:text-white">{s.name}</OText>
                    </OPressable>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {showSpinner && <ActivityIndicator size="large" color="#fff" className="mb-5" />}

          <View className="flex-row gap-std">
            {columns.map((col, i) => (
              <View key={i} className="flex-1 gap-std">
                {col.map(r => (
                  <View key={r.slug}>
                    {navigateToRecipe ? <RecipeLink recipe={r} /> : (
                      <OPressable onPress={() => onRecipePress?.(r)} className="btn-np btn-primary overflow-hidden">
                        <Image source={{ uri: `https://api.ourcookbook.org/storage/recipes/@${r.author.username}/${r.slug}.webp` }} className="w-full aspect-square" />
                        <View className="gap-2 px-4 py-3"><Text className="txt-xl font-serif dark:text-white">{r.name}</Text><OText className="dark:text-white">By {r.author.name}</OText></View>
                      </OPressable>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
          {!loading && !recipes.length && <OText className="text-center">No results found.</OText>}
        </View>
      </View>
    </View>
  );
};

export default RecipeSearch;