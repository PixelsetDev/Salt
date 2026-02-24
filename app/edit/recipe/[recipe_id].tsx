import './../../../global.css';
import { ScrollView, Text, View, TextInput } from 'react-native';
import Navbar, { Footer } from '../../../components/Commons';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { OPressable, OText } from '../../../components/Overrides';
import { API_BASE } from '../../../utils/settings';
import { useApiCall } from '../../../utils/api.ts';
import { useToast } from '../../../components/ToastProvider';
import { FontAwesome } from '@expo/vector-icons';
import { Modal } from '../../../components/Modal.tsx';
import { recipeType } from '../../../utils/types';
import { ErrorBox } from '../../../components/Boxes.tsx';

export default function EditRecipe() {
  const { recipe_id } = useLocalSearchParams();
  const { showToast } = useToast();
  const apiCall = useApiCall();
  const [recipe, setRecipe] = useState<recipeType>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddIngModal, setShowAddIngModal] = useState(false);
  const [Error, setError] = useState<string|null>(null);
  const [ingSearch, setIngSearch] = useState<{query: string, results: any[]}>({query: '', results: []});

  const units = ['', 'g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'pcs', 'oz', 'lb'];
  const difficulties = ['Beginner', 'Easy', 'Moderate', 'Difficult', 'Expert'];
  const visibilities = [{id: 3, name: 'Public'}, {id: 2, name: 'Unlisted'}, {id: 1, name: 'Friends'}, {id: 0, name: 'Private'}];

  useEffect(() => {
    apiCall(`${API_BASE}/v1/recipes/${recipe_id}`).then(res => res.json()).then(data => setRecipe(data.data));
    fetch(`${API_BASE}/v1/recipes/${recipe_id}/ingredients`).then(res => res.json()).then(data => setIngredients(data.data));
    fetch(`${API_BASE}/v1/recipes/${recipe_id}/steps`).then(res => res.json()).then(data => setSteps(data.data));
  }, [recipe_id]);

  const saveMetadata = async () => {
    setLoading(true);
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}`, true, { method: 'PUT', body: JSON.stringify({ ...recipe, prep_time: recipe?.time.prep, cook_time: recipe?.time.cook }) });
    if (res.status === 200) showToast({ type: 'success', message: 'Recipe updated.' });
    else setError('Error '+res.status);
    setLoading(false);
  };

  const addIngredient = async (ingredientId: number) => {
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/ingredients`, true, { method: 'POST', body: JSON.stringify({ ingredient: ingredientId, amount: 0, unit: '' }) });
    if (res.status === 201) { setShowAddIngModal(false); router.reload(); }
    else setError('Error ' + res.status);
  };

  const deleteIngredient = async (id: number) => {
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/ingredients`, true, { method: 'DELETE', body: JSON.stringify({ id }) });
    if (res.status === 204) router.reload(); else setError('Error ' + res.status);
  };

  const addStep = async () => {
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/steps`, true, { method: 'POST', body: JSON.stringify({ step: steps.length + 1, text: '' }) });
    if (res.status === 201) router.reload(); else setError('Error ' + res.status);
  };

  const deleteStep = async (id: number) => {
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/steps`, true, { method: 'DELETE', body: JSON.stringify({ id }) });
    if (res.status === 204) router.reload(); else setError('Error ' + res.status);
  };

  const updateIngredient = async (id: number, field: string, value: any) => {
    const updated = ingredients.map(i => i.id === id ? { ...i, [field]: value } : i);
    setIngredients(updated);
    const item = updated.find(i => i.id === id);
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/ingredients`, true, { method: 'PUT', body: JSON.stringify(item) });
    if (res.status !== 200) setError('Error '+res.status);
  };

  const searchIngredients = async (query: string) => {
    setIngSearch(prev => ({ ...prev, query }));
    if (query.length < 2) return setIngSearch(prev => ({ ...prev, results: [] }));
    const res = await fetch(`${API_BASE}/v1/ingredients?search=${query}&lang=GB`);
    const data = await res.json();
    setIngSearch(prev => ({ ...prev, results: data.data.results }));
  };

  const updateStep = async (id: number, text: string) => {
    const updated = steps.map(s => s.id === id ? { ...s, text } : s);
    setSteps(updated);
    const item = updated.find(s => s.id === id);
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/steps`, true, { method: 'PUT', body: JSON.stringify(item) });
    if (res.status !== 200) setError('Error '+res.status);
  };

  return (
    <ScrollView className="body">
      <Navbar />
      {Error && (<ErrorBox message={Error}/>)}
      {recipe && (
        <View className="p-std gap-std">
          <Text className="h1 font-serif">Edit {recipe.name}</Text>
          <View className="bg-secondary p-xs gap-std">
            <Text className="h2 font-serif">Metadata</Text>
            <TextInput className="input" placeholder="Recipe Name" value={recipe.name} onChangeText={t => setRecipe({...recipe, name: t})} />
            <View className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded"><OText className="txt-subtle">Slug: {recipe.slug}</OText></View>
            <TextInput className="input" placeholder="Description" multiline value={recipe.description} onChangeText={t => setRecipe({...recipe, description: t})} />
            <TextInput className="input" placeholder="Chef's Tips" multiline value={recipe.tips} onChangeText={t => setRecipe({...recipe, tips: t})} />
            <View className="grid-3 gap-std">
              <View><OText className="txt-xs mb-1">Servings</OText><TextInput className="input" keyboardType="numeric" value={recipe.servings.toString()} onChangeText={t => setRecipe({...recipe, servings: parseInt(t) || 0})} /></View>
              <View><OText className="txt-xs mb-1">Prep (mins)</OText><TextInput className="input" keyboardType="numeric" value={recipe.time.prep.toString()} onChangeText={t => setRecipe({...recipe, time: {...recipe.time, prep: parseInt(t) || 0}})} /></View>
              <View><OText className="txt-xs mb-1">Cook (mins)</OText><TextInput className="input" keyboardType="numeric" value={recipe.time.cook.toString()} onChangeText={t => setRecipe({...recipe, time: {...recipe.time, cook: parseInt(t) || 0}})} /></View>
            </View>
            <View className="grid-2 gap-std">
              <View><OText className="txt-xs mb-1">Difficulty</OText><select className="input w-full" value={recipe.difficulty} onChange={(e) => setRecipe({...recipe, difficulty: parseInt(e.target.value)})}>{difficulties.map((d, i) => <option key={i} value={i + 1}>{d}</option>)}</select></View>
              <View><OText className="txt-xs mb-1">Visibility</OText><select className="input w-full" value={recipe.visibility} onChange={(e) => setRecipe({...recipe, visibility: parseInt(e.target.value)})}>{visibilities.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}</select></View>
            </View>
            <OPressable disabled={loading} onPress={saveMetadata} className="btn btn-primary"><Text className="tc-white">Save General Info</Text></OPressable>
          </View>

          <View className="bg-secondary p-xs gap-std">
            <View className="flex-row justify-between"><Text className="h2 font-serif">Ingredients</Text><OPressable onPress={() => setShowAddIngModal(true)} className="btn btn-secondary"><Text>+ Add</Text></OPressable></View>
            {ingredients?.map((ing) => (
              <View key={ing.id} className="flex-row gap-sm items-center">
                <View className="flex-1 input justify-center bg-neutral-200 dark:bg-neutral-800 h-10 px-2 rounded"><OText>{ing.name}</OText></View>
                <TextInput className="input flex-1" placeholder="Qty" keyboardType="numeric" value={ing.amount.toString()} onChangeText={t => updateIngredient(ing.id, 'amount', parseFloat(t) || 0)} />
                <select className="input flex-1" value={ing.unit} onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}>{units.map(u => <option key={u} value={u}>{u || 'Unit'}</option>)}</select>
                <OPressable onPress={() => deleteIngredient(ing.id)} className="btn btn-danger"><FontAwesome name="trash" size={16} color="white" /></OPressable>
              </View>
            ))}
          </View>

          <View className="bg-secondary p-xs gap-std">
            <View className="flex-row justify-between"><Text className="h2 font-serif">Steps</Text><OPressable onPress={addStep} className="btn btn-secondary"><Text>+ Add</Text></OPressable></View>
            {steps?.map((step: any, idx: number) => (
              <View key={step.id || idx} className="flex-row gap-sm items-center">
                <View className="w-8"><OText className="font-bold">{idx + 1}.</OText></View>
                <TextInput className="input flex-1" multiline value={typeof step === 'object' ? step.text : step} onChangeText={t => updateStep(step.id, t)} />
                <OPressable onPress={() => deleteStep(step.id)} className="btn btn-danger"><FontAwesome name="trash" size={16} color="white" /></OPressable>
              </View>
            ))}
          </View>

          <OPressable onPress={() => setShowDeleteModal(true)} className="btn btn-danger"><Text className="tc-white font-bold">Delete Recipe Forever</Text></OPressable>
        </View>
      )}

      <Modal visible={showAddIngModal} title="Add Ingredient" onClose={() => setShowAddIngModal(false)}>
        <View className="gap-std">
          <TextInput className="input" placeholder="Search ingredients..." onChangeText={(t) => searchIngredients(t)} />
          <ScrollView style={{maxHeight: 200}}>
            {ingSearch.results.map((res: any) => (
              <OPressable key={res.id} className="p-2 border-b border-neutral-200" onPress={() => addIngredient(res.id)}>
                <OText>{res.name}</OText>
              </OPressable>
            ))}
          </ScrollView>
          <OPressable onPress={() => setShowAddIngModal(false)} className="btn btn-secondary"><Text>Cancel</Text></OPressable>
        </View>
      </Modal>

      <Modal visible={showDeleteModal} title="Confirm Deletion" onClose={() => setShowDeleteModal(false)}>
        <View className="gap-4">
          <OText className="text-center">Permanently delete <OText className="font-bold">{recipe?.name}</OText>?</OText>
          <View className="flex-row gap-std mt-2">
            <OPressable onPress={() => apiCall(`${API_BASE}/v1/recipes/${recipe_id}`, true, { method: 'DELETE' }).then(() => router.replace('/'))} className="btn btn-danger flex-1"><Text className="tc-white">Confirm</Text></OPressable>
            <OPressable onPress={() => setShowDeleteModal(false)} className="btn btn-secondary flex-1"><Text>Cancel</Text></OPressable>
          </View>
        </View>
      </Modal>
      <Footer />
    </ScrollView>
  );
}
