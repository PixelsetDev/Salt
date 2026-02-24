import './../../../global.css';
import { ScrollView, Text, View, TextInput } from 'react-native';
import Navbar, { Footer } from '../../../components/Commons';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { OPressable, OText } from '../../../components/Overrides';
import { API_BASE } from '../../../utils/settings';
import { useApiCall } from '../../../utils/api.ts';
import { useToast } from '../../../components/ToastProvider';
import { FontAwesome } from '@expo/vector-icons';
import { Modal } from '../../../components/Modal.tsx';
import { recipeType } from '../../../utils/types';
import { Picker } from '@react-native-picker/picker';

export default function EditRecipe() {
  const { recipe_id } = useLocalSearchParams();
  const { showToast } = useToast();
  const apiCall = useApiCall();
  const [recipe, setRecipe] = useState<recipeType | null>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [ingredientNames, setIngredientNames] = useState<{[key: number]: string}>({});
  const [steps, setSteps] = useState<any[]>([]);
  const [newStepText, setNewStepText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddIngModal, setShowAddIngModal] = useState(false);
  const [ingSearch, setIngSearch] = useState<{query: string, results: any[]}>({query: '', results: []});
  const [ingToDelete, setIngToDelete] = useState<any | null>(null);
  const [stepToDelete, setStepToDelete] = useState<{index: number, text: string} | null>(null);

  const units = ['', 'g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'pcs', 'oz', 'lb'];
  const difficulties = ['Beginner', 'Easy', 'Moderate', 'Difficult', 'Expert'];
  const visibilities = [{id: 3, name: 'Public'}, {id: 2, name: 'Unlisted'}, {id: 1, name: 'Friends'}, {id: 0, name: 'Private'}];

  const loadData = useCallback(() => {
    apiCall(`${API_BASE}/v1/recipes/${recipe_id}`).then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to load recipe'))).then(data => {
      if (data) {
        if (!data.data.isOwned) {
          showToast({ type: 'error', message: 'You do not have permission to edit this recipe.' });
          router.push(`/@${data.data.author.username}/${data.data.slug}`);
          return;
        }
        setRecipe(data.data);
      }
    }).catch(err => showToast({ type: 'error', message: err.message }));

    fetch(`${API_BASE}/v1/recipes/${recipe_id}/ingredients`).then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to load ingredients'))).then(async (data) => {
      const ingList = data?.data || [];
      setIngredients(ingList);
      const names: {[key: number]: string} = {};
      await Promise.all(ingList.map(async (ing: any) => {
        const res = await fetch(`${API_BASE}/v1/ingredients/${ing.ingredient}`);
        if (res.ok) { const details = await res.json(); names[ing.ingredient] = details.data.name; }
      }));
      setIngredientNames(names);
    }).catch(err => showToast({ type: 'error', message: err.message }));

    fetch(`${API_BASE}/v1/recipes/${recipe_id}/steps`).then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to load steps'))).then(data => setSteps(data?.data || [])).catch(err => showToast({ type: 'error', message: err.message }));
  }, [recipe_id]);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    if (!ingSearch.query) { setIngSearch(prev => ({ ...prev, results: [] })); return; }
    const delayDebounceFn = setTimeout(() => {
      fetch(`${API_BASE}/v1/ingredients?search=${encodeURIComponent(ingSearch.query)}&lang=GB`).then(res => res.ok ? res.json() : null).then(data => setIngSearch(prev => ({ ...prev, results: data?.data?.results || [] }))).catch(() => setIngSearch(prev => ({ ...prev, results: [] })));
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [ingSearch.query]);

  const saveMetadata = async () => {
    if (!recipe) return;
    setLoading(true);
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}`, true, { method: 'PUT', body: JSON.stringify({
        ...recipe,
        prep_time: Math.floor(recipe.time.prep),
        cook_time: Math.floor(recipe.time.cook),
        servings: Math.floor(recipe.servings)
      }) });
    if (res.status === 200) showToast({ type: 'success', message: 'Recipe updated.' });
    else showToast({ type: 'error', message: 'Failed to save metadata.' });
    setLoading(false);
  };

  const addIngredient = async (ingredientId: number) => {
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/ingredients`, true, { method: 'POST', body: JSON.stringify({ ingredient: ingredientId, amount: 0, unit: '' }) });
    if (res.status === 201) { loadData(); setShowAddIngModal(false); }
    else showToast({ type: 'error', message: 'Failed to add ingredient.' });
  };

  const deleteIngredient = async () => {
    if (!ingToDelete?.id) { showToast({ type: 'error', message: 'Delete failed: Missing record ID.' }); return; }
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/ingredients`, true, { method: 'DELETE', body: JSON.stringify({ id: ingToDelete.id }) });
    if (res.status === 200) { loadData(); setIngToDelete(null); }
    else showToast({ type: 'error', message: 'Delete failed.' });
  };

  const addStep = async () => {
    if (!newStepText.trim()) return;
    setLoading(true);
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/steps`, true, { method: 'POST', body: JSON.stringify({ step: steps.length + 1, text: newStepText.substring(0, 255) }) });
    if (res.status === 201) { loadData(); setNewStepText(''); showToast({ type: 'success', message: 'Step added.' }); }
    else showToast({ type: 'error', message: 'Failed to add step.' });
    setLoading(false);
  };

  const deleteStep = async () => {
    if (!stepToDelete) return;
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/steps`, true, { method: 'DELETE', body: JSON.stringify({ step: stepToDelete.index + 1 }) });
    if (res.status === 200) { loadData(); setStepToDelete(null); }
    else showToast({ type: 'error', message: 'Delete failed.' });
  };

  const saveIngredient = async (id: number) => {
    const item = ingredients.find(i => i.id === id);
    if (!item) return;
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/ingredients`, true, { method: 'PUT', body: JSON.stringify({
        ...item,
        amount: parseFloat(item.amount) || 0
      }) });
    if (res.status === 200) showToast({ type: 'success', message: 'Ingredient saved.' });
    else showToast({ type: 'error', message: 'Save failed.' });
  };

  const saveStep = async (index: number) => {
    const text = steps[index];
    const stepText = (typeof text === 'object' ? text.text : text).substring(0, 255);
    const res = await apiCall(`${API_BASE}/v1/recipes/${recipe_id}/steps`, true, { method: 'PUT', body: JSON.stringify({ step: index + 1, text: stepText }) });
    if (res.status === 200) showToast({ type: 'success', message: 'Step saved.' });
    else showToast({ type: 'error', message: 'Save failed.' });
  };

  return (
    <ScrollView className="body">
      <Navbar />
      <View className="header p-std"><Text className="h1 font-serif text-white">Edit {recipe?.name}</Text></View>
      {recipe && (
        <View className="p-std grid gap-std">
          <View className="bg-secondary p-xs grid gap-std">
            <View className="flex-row justify-between"><Text className="h2 font-serif">Metadata</Text><OPressable disabled={loading} onPress={saveMetadata} className="btn btn-primary">Save</OPressable></View>
            <View className="grid-2 gap-std">
              <View className="grid gap-std">
                <View className="grid gap-sm">
                  <OText>Recipe Name</OText>
                  <TextInput maxLength={64} className="input" placeholder="Recipe Name" value={recipe.name} onChangeText={t => setRecipe({...recipe, name: t})} />
                  <Text className="txt-xs txt-subtle text-right">{recipe.name?.length || 0}/64</Text>
                </View>
                <View className="grid gap-sm">
                  <OText>Tips</OText>
                  <TextInput maxLength={128} className="input" placeholder="Chef's Tips" multiline value={recipe.tips || ''} onChangeText={t => setRecipe({...recipe, tips: t})} />
                  <Text className="txt-xs txt-subtle text-right">{recipe.tips?.length || 0}/128</Text>
                </View>
              </View>
              <View className="flex-col gap-sm">
                <OText>Description</OText>
                <TextInput maxLength={255} className="input flex-grow" placeholder="Description" multiline value={recipe.description || ''} onChangeText={t => setRecipe({...recipe, description: t})} />
                <Text className="txt-xs txt-subtle text-right">{recipe.description?.length || 0}/255</Text>
              </View>
            </View>
            <View className="grid-3 gap-std">
              <View><OText>Servings</OText><TextInput className="input" keyboardType="numeric" value={recipe.servings.toString()} onChangeText={t => setRecipe({...recipe, servings: parseInt(t) || 0})} /></View>
              <View><OText>Prep (mins)</OText><TextInput className="input" keyboardType="numeric" value={recipe.time.prep.toString()} onChangeText={t => setRecipe({...recipe, time: {...recipe.time, prep: parseInt(t) || 0}})} /></View>
              <View><OText>Cook (mins)</OText><TextInput className="input" keyboardType="numeric" value={recipe.time.cook.toString()} onChangeText={t => setRecipe({...recipe, time: {...recipe.time, cook: parseInt(t) || 0}})} /></View>
            </View>
            <View className="grid-2 gap-std">
              <View><OText>Difficulty</OText><Picker style={{ height: 40 }} className="input w-full" selectedValue={recipe.difficulty} onValueChange={(v) => setRecipe({...recipe, difficulty: v})}>{difficulties.map((d, i) => <Picker.Item key={i} label={d} value={i + 1} />)}</Picker></View>
              <View><OText>Visibility</OText><Picker style={{ height: 40 }} className="input w-full" selectedValue={recipe.visibility} onValueChange={(v) => setRecipe({...recipe, visibility: v})}>{visibilities.map(v => <Picker.Item key={v.id} label={v.name} value={v.id} />)}</Picker></View>
            </View>
          </View>

          <View className="bg-secondary p-xs grid gap-std">
            <View className="flex-row justify-between"><Text className="h2 font-serif">Ingredients</Text><OPressable onPress={() => setShowAddIngModal(true)} className="btn btn-secondary">+ Add</OPressable></View>
            {ingredients.length === 0 ? <OText>This recipe has no ingredients, please add some!</OText> : ingredients.map((ing, idx) => (
              <View key={ing.id || idx} className="flex-row gap-sm items-center">
                <View className="flex-1 input justify-center bg-neutral-200 dark:bg-neutral-800 h-10 px-2 rounded"><OText>{ingredientNames[ing.ingredient] || "Loading..."}</OText></View>
                <TextInput className="input flex-1" placeholder="Qty" keyboardType="numeric" value={ing.amount.toString()} onChangeText={t => setIngredients(ingredients.map(i => i.id === ing.id ? {...i, amount: parseFloat(t) || 0} : i))} />
                <Picker style={{ height: 40, flex: 1 }} className="input" selectedValue={ing.unit} onValueChange={(v) => setIngredients(ingredients.map(i => i.id === ing.id ? {...i, unit: v} : i))}>{units.map(u => <Picker.Item key={u} label={u || 'Unit'} value={u} />)}</Picker>
                <OPressable onPress={() => saveIngredient(ing.id)} className="btn btn-primary"><FontAwesome name="save" size={16} color="white" /></OPressable>
                <OPressable onPress={() => setIngToDelete({...ing, name: ingredientNames[ing.ingredient]})} className="btn btn-danger"><FontAwesome name="trash" size={16} color="white" /></OPressable>
              </View>
            ))}
          </View>

          <View className="bg-secondary p-xs grid gap-std">
            <Text className="h2 font-serif">Steps</Text>
            {steps.length === 0 ? <OText>This recipe has no steps, please add some!</OText> : steps.map((step: any, idx: number) => {
              const currentText = typeof step === 'object' ? step.text : step;
              return (
                <View key={idx} className="grid gap-xs">
                  <View className="flex-row gap-sm items-center">
                    <Text className="font-serif txt-4xl dark:text-white w-12">{idx + 1}.</Text>
                    <TextInput maxLength={255} className="input flex-1 txt-lg" multiline value={currentText} onChangeText={t => setSteps(steps.map((s, i) => i === idx ? (typeof s === 'object' ? {...s, text: t} : t) : s))} />
                    <OPressable onPress={() => saveStep(idx)} className="btn btn-primary"><FontAwesome name="save" size={16} color="white" /></OPressable>
                    <OPressable onPress={() => setStepToDelete({index: idx, text: currentText})} className="btn btn-danger"><FontAwesome name="trash" size={16} color="white" /></OPressable>
                  </View>
                  <Text className="txt-xs txt-subtle text-right mr-20">{currentText?.length || 0}/255</Text>
                </View>
              );
            })}
            <View className="grid gap-xs mt-2">
              <View className="flex-row gap-sm items-center">
                <Text className="font-serif txt-4xl dark:text-white w-12">{steps.length + 1}.</Text>
                <TextInput maxLength={255} className="input flex-1" placeholder="Add a new step..." multiline numberOfLines={1} value={newStepText} onChangeText={setNewStepText} />
                <OPressable onPress={addStep} disabled={loading} className="btn btn-secondary">+ Add</OPressable>
              </View>
              <Text className="txt-xs txt-subtle text-right mr-20">{newStepText.length}/255</Text>
            </View>
          </View>

          <View className="border-2 border-red-500 p-xs grid gap-std">
            <Text className="h2 font-serif">Danger Zone</Text>
            <OPressable onPress={() => setShowDeleteModal(true)} className="btn btn-danger">Delete Recipe Forever</OPressable>
          </View>
        </View>
      )}

      <Modal visible={showAddIngModal} title="Add Ingredient" onClose={() => setShowAddIngModal(false)}>
        <View className="gap-std">
          <TextInput className="input" autoFocus placeholder="Type to search..." onChangeText={(t) => setIngSearch(prev => ({ ...prev, query: t }))} />
          <ScrollView style={{maxHeight: 200}} className="mt-2">{ingSearch.results.length > 0 ? ingSearch.results.map((res: any) => (<OPressable key={res.id} className="p-3 border-b border-neutral-200 dark:border-neutral-700" onPress={() => addIngredient(res.id)}><OText>{res.name}</OText></OPressable>)) : <View className="p-8 items-center"><OText className="opacity-50 text-center">{ingSearch.query ? `No ingredients found for "${ingSearch.query}"` : "Start typing to find ingredients..."}</OText></View>}</ScrollView>
          <OPressable onPress={() => setShowAddIngModal(false)} className="btn btn-secondary">Close</OPressable>
        </View>
      </Modal>

      <Modal visible={!!ingToDelete} title="Delete Ingredient" onClose={() => setIngToDelete(null)}>
        <View className="grid gap-std">
          <OText>Remove <OText>{ingToDelete?.name}</OText> from this recipe?</OText>
          <View className="flex-row gap-std mt-2">
            <OPressable onPress={deleteIngredient} className="btn btn-danger">Delete</OPressable>
            <OPressable onPress={() => setIngToDelete(null)} className="btn btn-secondary">Cancel</OPressable>
          </View>
        </View>
      </Modal>

      <Modal visible={!!stepToDelete} title={`Delete Step ${stepToDelete ? stepToDelete.index + 1 : ''}?`} onClose={() => setStepToDelete(null)}>
        <View className="grid gap-std">
          <OText>&quot;{stepToDelete?.text}&quot;</OText>
          <View className="flex-row gap-std mt-2">
            <OPressable onPress={deleteStep} className="btn btn-danger">Delete</OPressable>
            <OPressable onPress={() => setStepToDelete(null)} className="btn btn-secondary">Cancel</OPressable>
          </View>
        </View>
      </Modal>

      <Modal visible={showDeleteModal} title="Confirm Deletion" onClose={() => setShowDeleteModal(false)}>
        <View className="grid gap-std">
          <View className="border-red-500 border-4 border-dashed p-4"><OText>Warning: This can not be undone!</OText></View>
          <OText>Are you sure you want to permanently delete <OText>{recipe?.name}</OText>?</OText>
          <View className="grid gap-sm">
            <OPressable onPress={() => apiCall(`${API_BASE}/v1/recipes/${recipe_id}`, true, { method: 'DELETE' }).then(() => router.replace('/'))} className="btn btn-danger">Yes, I AM SURE, delete this recipe.</OPressable>
            <OPressable onPress={() => setShowDeleteModal(false)} className="btn btn-primary">No, DO NOT delete this recipe.</OPressable>
          </View>
        </View>
      </Modal>
      <Footer />
    </ScrollView>
  );
}