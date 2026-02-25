import "./../../global.css";
import { Text, View, ScrollView, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import Navbar, { Footer } from '../../components/Commons';
import { collectionType, recipeType } from '../../utils/types';
import { API_BASE } from '../../utils/settings';
import { OPressable, OText } from '../../components/Overrides.tsx';
import { Link, useLocalSearchParams, router } from 'expo-router';
import { ErrorBox, InfoBox, WarningBox } from '../../components/Boxes.tsx';
import { RecipeLink } from '../../components/RecipeLink.tsx';
import { useApiCall } from '../../utils/api';
import { useToast } from '../../components/ToastProvider';
import { Modal } from '../../components/Modal';
import { useUser } from '../../components/auth/UserProvider.tsx';
import RecipeSearch from "../../components/RecipeSearch";
import { FontAwesome } from "@expo/vector-icons";
import { useLogto } from '@logto/rn';

export default function App() {
  const { collection_slug } = useLocalSearchParams();
  const { showToast } = useToast();
  const { user } = useUser();
  const { isAuthenticated } = useLogto();
  const apiCall = useApiCall();

  const [error, setError] = useState<string|null>(null);
  const [collection, setCollection] = useState<collectionType>(null);
  const [recipes, setRecipes] = useState<recipeType[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [form, setForm] = useState({ name: '', description: '', visibility: 0 });
  const [selectedRecipes, setSelectedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await apiCall(`${API_BASE}/v1/collections/${collection_slug}`, false);
        const json = await res.json();
        if (json.data == null) {
          setError(json.message);
        } else {
          const col = json.data.collection;
          const recs = json.data.recipes;
          setCollection(col);
          setRecipes(recs);
          setForm({
            name: col.name,
            description: col.description || '',
            visibility: col.visibility
          });
          setSelectedRecipes(recs);
          setError(null);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchCollection();
  }, [apiCall, collection_slug, isAuthenticated]);

  const toggleRecipe = (recipe: any) => {
    setSelectedRecipes(prev => prev.find(r => r.id === recipe.id) ? prev.filter(r => r.id !== recipe.id) : [...prev, recipe]);
  };

  const deleteCollection = async () => {
    if (!collection?.id) return;
    try {
      const res = await apiCall(`${API_BASE}/v1/collections/${collection.id}`, true, { method: 'DELETE' });
      if (res.status === 200) {
        showToast({ type: 'success', message: 'Collection deleted' });
        router.replace('/collections');
      } else {
        const d = await res.json();
        showToast({ type: 'error', message: d.message });
      }
    } catch (e: any) {
      showToast({ type: 'error', message: e.message });
    } finally {
      setShowDelete(false);
    }
  };

  const saveCollection = async () => {
    if (!collection?.id) return;
    if (!form.name.trim()) return showToast({ type: 'error', message: 'Please enter a name.' });
    setLoading(true);
    try {
      const res = await apiCall(`${API_BASE}/v1/collections/${collection.id}`, true, {
        method: 'PUT',
        body: JSON.stringify({ ...form, recipe_ids: selectedRecipes.map(r => r.id) })
      });
      if (res.status === 200) {
        showToast({ type: 'success', message: 'Collection updated!' });
        setCollection(prev => prev ? { ...prev, ...form } : null);
        setRecipes(selectedRecipes);
        setShowEdit(false);
      } else {
        const d = await res.json();
        showToast({ type: 'error', message: d.message || 'Failed to update.' });
      }
    } catch (e: any) {
      showToast({ type: 'error', message: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="body">
      <Navbar/>
      <Modal visible={showDelete} title="Delete Collection" onClose={() => setShowDelete(false)}>
        <View className="gap-std">
          <OText className="text-white">Are you sure? This cannot be undone.</OText>
          <View className="flex-row gap-std justify-end">
            <OPressable onPress={() => setShowDelete(false)} className="btn btn-secondary">Cancel</OPressable>
            <OPressable onPress={deleteCollection} className="btn btn-danger">Delete</OPressable>
          </View>
        </View>
      </Modal>
      <Modal visible={showEdit} title="Edit Collection" onClose={() => setShowEdit(false)} maxw="">
        <ScrollView className="max-h-[70vh]">
          <View className="grid-2-1 gap-std">
            <View className="grid-2 span-2 gap-std">
              <OPressable onPress={() => setShowEdit(false)} className="btn btn-secondary">Cancel</OPressable>
              <OPressable onPress={saveCollection} disabled={loading} className="btn btn-primary">{loading ? 'Saving...' : 'Save Changes'}</OPressable>
            </View>
            <View className="grid gap-std">
              <View className="grid gap-sm">
                <OText className="text-white">Name</OText>
                <TextInput className="input text-white" value={form.name} onChangeText={(t) => setForm({...form, name: t})} maxLength={27} />
              </View>
              <View className="grid gap-sm">
                <OText className="text-white">Visibility</OText>
                <View className="flex-row gap-std flex-wrap">
                  {[{v: 0, l: 'Private'}, {v: 1, l: 'Friends'}, {v: 2, l: 'Unlisted'}, {v: 3, l: 'Public'}].map((opt) => (
                    <OPressable key={opt.v} onPress={() => setForm({...form, visibility: opt.v})} className={`btn ${form.visibility === opt.v ? 'btn-primary' : 'btn-secondary'}`}>
                      {opt.l}
                    </OPressable>
                  ))}
                </View>
              </View>
            </View>
            <View className="grid gap-std">
              <View className="grid gap-sm">
                <OText className="text-white">Description</OText>
                <TextInput className="input text-white" value={form.description} onChangeText={(t) => setForm({...form, description: t})} multiline numberOfLines={3} maxLength={128} />
              </View>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-sm py-12">
            {selectedRecipes.map(r => (
              <View key={r.id} className="chip-green flex-row gap-sm items-center">
                <Text className="txt-xs text-black">{r.name}</Text>
                <OPressable onPress={() => toggleRecipe(r)}><FontAwesome name="times" size={12} color="black" /></OPressable>
              </View>
            ))}
          </View>
          <View className="grid gap-sm">
            <OText className="h3 font-serif">Recipes</OText>
            <RecipeSearch navigateToRecipe={false} onRecipePress={toggleRecipe} />
          </View>
        </ScrollView>
      </Modal>
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white grow">{collection?.name || 'Loading...'}</Text>
          {(collection?.author.name === "SYSTEM") ? (
            <Text className="h3 text-white">By OurCookbook.</Text>
          ) : (
            <Text className="h3 text-white">By <Link className="underline h3 text-white" href={`/@${collection?.author.username}`}>{collection?.author.name || 'Loading...'}</Link>.</Text>
          )}
        </View>
          <View className="grid gap-sm justify-end items-end">
            {collection && (
              collection.visibility === 0 ? (<OText className={`bg-red-700 rounded-md px-2 text-center text-white`}>
                <FontAwesome name={`lock`} size={16}/>&nbsp;Private
              </OText>) : (collection.visibility === 1) ? (<OText className={`bg-orange-500 rounded-md px-2 text-center text-white`}>
                <FontAwesome name={`users`} size={16}/>&nbsp;Friends Only
              </OText>) : (collection.visibility === 2) && (<OText className={`bg-yellow-500 rounded-md px-2 text-center text-white`}>
                <FontAwesome name={`eye`} size={16}/>&nbsp;Unlisted
              </OText>)
            )}
            {!!collection?.featured && (<OText className={`bg-yellow-500 rounded-md px-2 text-center text-yellow-900`}>
              <FontAwesome name={`star`} size={16}/>&nbsp;
              Featured
            </OText>)}
            {collection?.author.uuid === user?.uuid && (
            <View className="flex-row items-end gap-sm">
              <OPressable onPress={() => setShowEdit(true)} className="btn btn-info">Edit</OPressable>
              <OPressable onPress={() => setShowDelete(true)} className="btn btn-danger">Delete</OPressable>
            </View>
            )}
          </View>
      </View>
      <View className="p-std grid gap-std">
        {error && (<ErrorBox message={error}/>)}
          {(collection?.author.name === "SYSTEM") && (
            <View className="grid gap-sm">
              <InfoBox message={<OText>This collection was automatically generated by the OurCookbook algorithm. <Link className="underline" href="https://support.pixelset.dev/knowledgebase.php?article=66">Learn more.</Link></OText>}></InfoBox>
            </View>
          )}
          {recipes.some(r => r?.visibility !== 3) && (
            <WarningBox message="Some recipes in this collection have restricted privacy settings and may be hidden from other users."/>
          )}
          {(recipes && recipes.length > 0) ? (
          <View className="grid-5 gap-std">
            {recipes.map((recipe) => ( recipe != null && (
              <RecipeLink recipe={ recipe } key={recipe.slug}><OText className="txt-sm text-white">{recipe.description}</OText></RecipeLink>
            )))}
          </View>
        ) : (!error && <WarningBox message="This collection does not have any recipes."/>)}
      </View>
      <Footer/>
    </ScrollView>
  );
}