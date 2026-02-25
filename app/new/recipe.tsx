import './../../global.css';
import { ScrollView, Text, View, TextInput } from 'react-native';
import Navbar, { Footer } from '../../components/Commons';
import { useState, useEffect, useCallback } from 'react';
import { OPressable, OText } from '../../components/Overrides';
import { API_BASE } from '../../utils/settings';
import { useApiCall } from '../../utils/api.ts';
import { useToast } from '../../components/ToastProvider';
import { router } from 'expo-router';
import { recipeType } from '../../utils/types';
import { Picker } from '@react-native-picker/picker';

export default function NewRecipe() {
  const { showToast } = useToast();
  const apiCall = useApiCall();
  const [loading, setLoading] = useState(false);
  const [flatCategories, setFlatCategories] = useState<{id: number, name: string}[]>([]);
  const [form, setForm] = useState<Partial<recipeType>>({
    name: '',
    description: '',
    tips: '',
    category: 0,
    servings: 1,
    difficulty: 1,
    visibility: 3,
    time: { prep: 0, cook: 0 }
  });

  const difficulties = ['Beginner', 'Easy', 'Moderate', 'Difficult', 'Expert'];
  const visibilities = [{id: 3, name: 'Public'}, {id: 2, name: 'Unlisted'}, {id: 1, name: 'Friends'}, {id: 0, name: 'Private'}];

  const loadCategories = useCallback(async () => {
    try {
      const catRes = await fetch(`${API_BASE}/v1/recipes/categories`);
      const parents = (await catRes.json())?.data || [];

      const subcategoryData = await Promise.all(
        parents.map((cat: any) =>
          fetch(`${API_BASE}/v1/recipes/categories/${cat.id}`)
            .then(res => res.ok ? res.json() : { data: { subcategories: [] } })
        )
      );

      let flattened: {id: number, name: string}[] = [{ id: 0, name: "Uncategorised" }];
      parents.forEach((cat: any, index: number) => {
        flattened.push({ id: Number(cat.id), name: cat.name });
        const subs = subcategoryData[index]?.data?.subcategories || [];
        subs.forEach((s: any) => flattened.push({ id: Number(s.id), name: `└ ${s.name}` }));
      });

      setFlatCategories(flattened);
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    }
  }, []);

  useEffect(() => { loadCategories(); }, [loadCategories]);

  const submit = async () => {
    if (!form?.name || form?.name.length > 64) return showToast({ type: 'error', message: 'Name is required (max 64 chars).' });

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        description: form.description || '',
        category: Number(form.category),
        tips: '',
        servings: Math.floor(Number(form.servings || 1)),
        prep_time: Math.floor(Number(form.time?.prep || 0)),
        cook_time: Math.floor(Number(form.time?.cook || 0)),
        difficulty: Number(form.difficulty),
        visibility: Number(form.visibility)
      };

      const res = await apiCall(`${API_BASE}/v1/recipes`, true, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.status === 201) {
        showToast({ type: 'success', message: 'Recipe created!' });
        router.replace({ pathname: '/edit/recipe/[recipe_id]', params: { recipe_id: data.id } });
      } else {
        showToast({ type: 'error', message: data.message || 'Failed to create recipe.' });
      }
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="body">
      <Navbar />
      <View className="header p-std">
        <Text className="h1 font-serif text-white">New Recipe</Text>
      </View>
      <View className="p-std">
        <View className="grid gap-std">
          <View className="bg-secondary p-sm grid gap-std">
            <Text className="h2 font-serif">Tell us about your recipe...</Text>
            <View className="grid gap-sm">
              <OText>Recipe Name</OText>
              <TextInput maxLength={64} className="input" placeholder="Enter name..." value={form?.name} onChangeText={(t) => setForm({...form, name: t})} />
              <Text className="txt-xs txt-subtle text-right">{form?.name?.length || 0}/64</Text>
            </View>
            <View className="flex-col gap-sm">
              <OText>Description</OText>
              <TextInput maxLength={255} className="input flex-grow" placeholder="Enter description..." multiline value={form?.description} onChangeText={(t) => setForm({...form, description: t})} />
              <Text className="txt-xs txt-subtle text-right">{form?.description?.length || 0}/255</Text>
            </View>
            <View className="grid-3 gap-std">
              <View><OText>Servings</OText><TextInput className="input" keyboardType="numeric" value={form?.servings?.toString()} onChangeText={(t) => setForm({...form, servings: parseInt(t) || 0})} /></View>
              <View><OText>Prep (mins)</OText><TextInput className="input" keyboardType="numeric" value={form?.time?.prep?.toString()} onChangeText={(t) => setForm({...form, time: { ...form?.time!, prep: parseInt(t) || 0 }})} /></View>
              <View><OText>Cook (mins)</OText><TextInput className="input" keyboardType="numeric" value={form?.time?.cook?.toString()} onChangeText={(t) => setForm({...form, time: { ...form?.time!, cook: parseInt(t) || 0 }})} /></View>
            </View>
            <View className="grid-3 gap-std">
              <View>
                <OText>Category</OText>
                <Picker style={{ height: 40 }} className="input w-full" selectedValue={form?.category} onValueChange={(v) => setForm({...form, category: v})}>
                  {flatCategories.map(c => <Picker.Item key={c.id} label={c.name} value={c.id} />)}
                </Picker>
              </View>
              <View>
                <OText>Difficulty</OText>
                <Picker style={{ height: 40 }} className="input w-full" selectedValue={form?.difficulty} onValueChange={(v) => setForm({...form, difficulty: v})}>
                  {difficulties.map((d, i) => <Picker.Item key={i} label={d} value={i + 1} />)}
                </Picker>
              </View>
              <View>
                <OText>Visibility</OText>
                <Picker style={{ height: 40 }} className="input w-full" selectedValue={form?.visibility} onValueChange={(v) => setForm({...form, visibility: v})}>
                  {visibilities.map(v => <Picker.Item key={v.id} label={v.name} value={v.id} />)}
                </Picker>
              </View>
            </View>
            <OPressable disabled={loading} onPress={submit} className="btn btn-primary">Create Recipe</OPressable>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}