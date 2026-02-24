import './../../global.css';
import { ScrollView, Text, View, TextInput } from 'react-native';
import Navbar, { Footer } from '../../components/Commons';
import { useState } from 'react';
import { OPressable, OText } from '../../components/Overrides';
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
  const [form, setForm] = useState<Partial<recipeType>>({ name: '', description: '', servings: 0, tips: '', difficulty: 1, visibility: 3, time: { prep: 0, cook: 0 } });

  const difficulties = ['Beginner', 'Easy', 'Moderate', 'Difficult', 'Expert'];
  const visibilities = [{id: 3, name: 'Public'}, {id: 2, name: 'Unlisted'}, {id: 1, name: 'Friends'}, {id: 0, name: 'Private'}];

  const submit = async () => {
    if (!form?.name || form?.name.length > 64) return showToast({ type: 'error', message: 'Name is required and must be 64 characters or less.' });
    if (form?.description && form?.description.length > 255) return showToast({ type: 'error', message: 'Description must be 255 characters or less.' });
    if (isNaN(Number(form?.servings)) || isNaN(Number(form?.time?.prep)) || isNaN(Number(form?.time?.cook))) return showToast({ type: 'error', message: 'Servings, Prep, and Cook times must be valid numbers.' });

    setLoading(true);
    try {
      const res = await apiCall(`${API_BASE}/v1/recipes`, true, {
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
      <View className="header p-std">
        <Text className="h1 font-serif text-white">New Recipe</Text>
      </View>
      <View className="p-std">
        <View className="grid gap-std">
          <View>
            <OText>Recipe Name</OText>
            <TextInput className="input" placeholder="Enter name..." maxLength={64} value={form?.name} onChangeText={(t) => setForm({...form, name: t})} />
            <Text className="txt-xs txt-subtle text-right">{form?.name?.length || 0}/64</Text>
          </View>
          <View>
            <OText>Description</OText>
            <TextInput className="input" placeholder="Enter description..." multiline maxLength={255} value={form?.description} onChangeText={(t) => setForm({...form, description: t})} />
            <Text className="txt-xs txt-subtle text-right">{form?.description?.length || 0}/255</Text>
          </View>
          <View className="grid-3 gap-std">
            <View><OText>Servings</OText><TextInput className="input" keyboardType="numeric" value={form?.servings?.toString()} onChangeText={(t) => setForm({...form, servings: parseInt(t) || 0})} /></View>
            <View><OText>Prep (mins)</OText><TextInput className="input" keyboardType="numeric" value={form?.time?.prep?.toString()} onChangeText={(t) => setForm({...form, time: { ...form?.time!, prep: parseInt(t) || 0 }})} /></View>
            <View><OText>Cook (mins)</OText><TextInput className="input" keyboardType="numeric" value={form?.time?.cook?.toString()} onChangeText={(t) => setForm({...form, time: { ...form?.time!, cook: parseInt(t) || 0 }})} /></View>
          </View>
          <View className="grid-2 gap-std">
            <View><OText>Difficulty</OText><select className="input w-full" value={form?.difficulty} onChange={(e) => setForm({...form, difficulty: parseInt(e.target.value)})}>{difficulties.map((d, i) => <option key={i} value={i + 1}>{d}</option>)}</select></View>
            <View><OText>Visibility</OText><select className="input w-full" value={form?.visibility} onChange={(e) => setForm({...form, visibility: parseInt(e.target.value)})}>{visibilities.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}</select></View>
          </View>
          <OPressable disabled={loading} onPress={submit} className="btn btn-primary"><Text className="tc-white">Create Recipe</Text></OPressable>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}