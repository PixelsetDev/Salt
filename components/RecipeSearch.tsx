import { ActivityIndicator, Text, TextInput, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { RecipeLink } from './RecipeLink';
import { OPressable, OText } from './Overrides';
import { API_BASE } from '../utils/settings';
import { FontAwesome } from '@expo/vector-icons';
import { InfoBox, WarningBox } from './Boxes.tsx';
import { useApiCall } from '../utils/api.ts';
import { useLogto } from '@logto/rn';

interface Recipe { id: number; slug: string; name: string; author: { uuid: string; name: string; username: string; }; description: string; visibility: number; }
interface Category { id: number; name: string; parent?: number | null; }

const RecipeSearch = ({ navigateToRecipe = true, onRecipePress, user, doSearch, onSearchPerformed }: any) => {
  const [search, setSearch] = useState(doSearch || '');
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

  const { isAuthenticated } = useLogto();
  const apiCall = useApiCall();

  const [showMore, setShowMore] = useState(false);

  const presets = [
    { name: 'Vegan', excludes: ['meat', 'animal_products', 'milk', 'eggs', 'fish', 'crustaceans', 'molluscs'] },
    { name: 'Vegetarian', excludes: ['meat', 'fish', 'crustaceans', 'molluscs'] },
    { name: 'Pescatarian', excludes: ['meat'] },
    { name: 'Gluten Free', excludes: ['gluten'] },
    { name: 'Dairy Free', excludes: ['milk'] },
    { name: 'Nut Free', excludes: ['peanuts', 'treenuts'] },
  ];

  const togglePreset = (presetExcludes) => {
    const allSelected = presetExcludes.every(e => selectedDietary.includes(e));
    if (allSelected) {
      setSelectedDietary(prev => prev.filter(item => !presetExcludes.includes(item)));
    } else {
      setSelectedDietary(prev => [...new Set([...prev, ...presetExcludes])]);
    }
  };

  const isPresetActive = (presetExcludes) => presetExcludes.every(e => selectedDietary.includes(e));

  useEffect(() => {
    const fetchMeta = async (path: string, setter: any) => {
      try {
        const res = await apiCall(`${API_BASE}${path}`, false);
        const d = await res.json();
        setter(d.data || []);
      } catch { setter([]); }
    };
    fetchMeta('/v1/recipes/categories', setCategories);
    fetchMeta('/v1/ingredients/dietary', setDietaryOptions);
  }, [apiCall, isAuthenticated]);

  const fetchRecipes = useCallback(async (query = '') => {
    onSearchPerformed?.(true);
    setShowSpinner(false);
    const timeout = setTimeout(() => setShowSpinner(true), 300);

    try {
      if (selectedCategory !== null) {
        const catRes = await fetch(`${API_BASE}/v1/recipes/categories/${selectedCategory}`).then(r => r.json());
        if (catRes.data?.parent) setParentCategory(catRes.data.parent);
        else { setSubcategories(catRes.data?.subcategories || []); setParentCategory(null); }
      } else { setSubcategories([]); setParentCategory(null); }

      const p = new URLSearchParams();
      if (query) p.append('search', query);
      if (user) p.append('user', user);
      if (selectedCategory) p.append('category', String(selectedCategory));
      if (selectedDietary.length) p.append('dietary', JSON.stringify(selectedDietary));

      const res = await apiCall(`${API_BASE}/v1/recipes?${p.toString()}`, false);
      if (res.status === 204 || res.status === 404) { setRecipes([]); }
      else { const data = await res.json(); setRecipes(Array.isArray(data) ? data : (data.data || [])); }
    } catch { setRecipes([]); } finally { clearTimeout(timeout); setShowSpinner(false); }
  }, [selectedCategory, selectedDietary, user, onSearchPerformed, apiCall, isAuthenticated]);

  useEffect(() => {
    const t = setTimeout(() => fetchRecipes(search), 300);
    return () => clearTimeout(t);
  }, [search, fetchRecipes, selectedCategory, selectedDietary]);

  const btnStyle = (active: boolean, type = 'primary') => `px-3 py-2 rounded-md btn ${active ? `btn-${type}` : 'btn-secondary'}`;

  const Filters = () => (
    <View className="grid gap-std">
      <View className="p-4 bg-secondary grid gap-std">
        <Text className="txt-4xl font-serif dark:text-white">Categories</Text>
        <View className="grid gap-sm">
          {categories.map(c => (
            <OPressable key={c.id} className={btnStyle(selectedCategory === c.id || parentCategory === c.id)}
                  onPress={() => { setSelectedCategory(selectedCategory === c.id || parentCategory === c.id ? null : c.id); setParentCategory(null); }}>
              {c.name}
            </OPressable>
          ))}
        </View>
      </View>
      <View className="p-4 bg-secondary grid gap-std">
        <Text className="txt-4xl font-serif dark:text-white">Dietary</Text>
        <Text className="txt-subtle italic">Always check product labels.</Text>

        <View className="grid gap-sm">
          <View className="grid gap-sm animate-fade-in">
            {presets.map(p => (
              <OPressable key={p.name} className={btnStyle(isPresetActive(p.excludes), 'primary')} onPress={() => togglePreset(p.excludes)}>
                {p.name}
              </OPressable>
            ))}
          </View>
          <OPressable onPress={() => setShowMore(!showMore)} className="p-2 txt-subtle underline text-center">
            {showMore ? 'Show less' : 'Show more'}
          </OPressable>
          {showMore && (
            <View className="grid gap-sm animate-fade-in">
              {dietaryOptions.map(o => (
                <OPressable key={o} className={btnStyle(selectedDietary.includes(o), 'danger')} onPress={() => setSelectedDietary(d => d.includes(o) ? d.filter(x => x !== o) : [...d, o])}>
                  {selectedDietary.includes(o) ? `Excludes ${o}` : `Includes ${o}`}
                </OPressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View className="gap-std">
      <TextInput placeholder="Search..." value={search} onChangeText={setSearch} className="input" />
      {!isDesktop && (
        <OPressable className="btn btn-secondary flex-row items-center gap-sm" onPress={() => setShowFilters(!showFilters)}>
          <FontAwesome name="sliders" size={16} /><OText className="dark:text-white">&nbsp;Filters</OText>
        </OPressable>
      )}
      <View className={isDesktop ? "flex-row gap-std" : "gap-std"}>
        {((!isDesktop && showFilters) || isDesktop) && <View className={isDesktop ? "w-64" : ""}>{Filters()}</View>}
        <View className="flex-1">
          {subcategories.length > 0 && (
            <View className="mb-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-sm">
                  {subcategories.map(s => (
                    <OPressable key={s.id} onPress={() => setSelectedCategory(selectedCategory === s.id ? (parentCategory || null) : s.id)} className={btnStyle(selectedCategory === s.id)}>
                      {s.name}
                    </OPressable>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
          {showSpinner && <ActivityIndicator size="large" color="#fff" className="mb-5" />}
          <View className="mb-5">
            <InfoBox message="We're still loading in dietary information right now, so some filters may not behave as expected."/>
          </View>
          <View className="grid-2 md:grid-3 xl:grid-4 gap-std items-stretch">
            {recipes.length > 0 ? (
              recipes.map(r => (
                navigateToRecipe ? <RecipeLink recipe={r} key={r.slug} /> : (
                    <OPressable onPress={() => onRecipePress?.(r)} className="btn-np btn-primary overflow-hidden h-full" key={r.slug}>
                      <Image source={{ uri: `https://api.ourcookbook.org/storage/recipes/@${r.author.username}/${r.slug}.webp` }} className="w-full aspect-square" />
                      <View className="gap-2 px-4 py-3">
                        <Text className="txt-xl font-serif dark:text-white">{r.name}</Text>
                        <OText className="dark:text-white">By {r.author.name}</OText>
                      </View>
                    </OPressable>
                  )
              ))
            ) : (<WarningBox message={`No results found.`}/>)}
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecipeSearch;