import './../../global.css';
import { ScrollView, Text, View, TextInput } from 'react-native';
import Navbar, { Footer } from '../../components/Commons';
import { useState } from 'react';
import { OPressable } from '../../components/Overrides';
import { API_BASE } from '../../utils/settings';
import { useApiCall } from '../../utils/api.ts';
import { useUser } from '../../components/auth/UserProvider.tsx';
import { useToast } from '../../components/ToastProvider';
import { router } from 'expo-router';
import { recipeType } from '../../utils/types';

export default function NewRecipe() {
  const { user } = useUser();
  const { showToast } = useToast();
  const apiCall = useApiCall();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<recipeType>>({ slug: '', name: '', description: '', servings: 0, tips: '', difficulty: 1, visibility: 1, time: { prep: 0, cook: 0 } });

  const submit = async () => {
    setLoading(true);
    try {
      const res = await apiCall(`${API_BASE}/v1/recipe`, true, {
        method: 'POST',
        body: JSON.stringify({ ...form, author: user?.uuid, prep_time: form?.time?.prep, cook_time: form?.time?.cook })
      });
      const data = await res.json();
      if (res.status === 201) {
        showToast({ type: 'success', message: 'Recipe created!' });
        router.replace({ pathname: '/edit/recipe/[recipe_id]', params: { recipe_id: data.id } });
      } else {
        showToast({ type: 'error', message: data.message });
      }
    } catch (err:any) {
      showToast({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="body">
      <Navbar />
      <View className="p-std gap-std">
        <Text className="h1 font-serif">Create New Recipe</Text>
        <View className="bg-secondary p-xs gap-std">
          <TextInput className="input" placeholder="Recipe Name" onChangeText={(t) => setForm({...form, name: t, slug: t.toLowerCase().replace(/ /g, '-')})} />
          <TextInput className="input" placeholder="Slug" value={form?.slug} onChangeText={(t) => setForm({...form, slug: t})} />
          <TextInput className="input" placeholder="Description" multiline onChangeText={(t) => setForm({...form, description: t})} />
          <View className="grid-2 gap-std">
            <TextInput className="input" placeholder="Servings" keyboardType="numeric" onChangeText={(t) => setForm({...form, servings: parseInt(t) || 0})} />
            <TextInput className="input" placeholder="Prep Time (mins)" keyboardType="numeric" onChangeText={(t) => setForm({...form, time: { ...form?.time!, prep: parseInt(t) || 0 }})} />
            <TextInput className="input" placeholder="Cook Time (mins)" keyboardType="numeric" onChangeText={(t) => setForm({...form, time: { ...form?.time!, cook: parseInt(t) || 0 }})} />
          </View>
          <OPressable disabled={loading} onPress={submit} className="btn btn-primary items-center"><Text className="tc-white">Create Recipe</Text></OPressable>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}