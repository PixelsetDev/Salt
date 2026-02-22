import "./../../global.css";
import { Text, View, ScrollView, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import Navbar, { Footer } from '../../components/Commons';
import { collectionType, recipeType } from '../../utils/types';
import { API_BASE } from '../../utils/settings';
import { OPressable, OText } from '../../components/Overrides.tsx';
import { Link, useLocalSearchParams, router } from 'expo-router';
import { ErrorBox, WarningBox } from '../../components/Boxes.tsx';
import { RecipeLink } from '../../components/RecipeLink.tsx';
import { useLogto } from '@logto/rn';
import { useApiCall } from '../../utils/api';
import { useToast } from '../../components/ToastProvider';

export default function App() {
  const { collection_slug } = useLocalSearchParams();
  const { showToast } = useToast();
  const { recipes: logtoRecipes } = useLogto();
  const apiCall = useApiCall();

  const [error, setError] = useState<string|null>(null);
  const [collection, setCollection] = useState<collectionType>(null);
  const [recipes, setRecipes] = useState<recipeType[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/v1/collections/${collection_slug}`).then(res => res.json()).then(json => {
      if (json.data == null) setError(json.message);
      else { setCollection(json.data.collection); setRecipes(json.data.recipes); }
    }).catch(err => setError(err.message));
  }, [collection_slug]);

  const deleteCollection = async () => {
    try {
      const res = await apiCall(`${API_BASE}/v1/collections/${collection_slug}`, true, { method: 'DELETE' });
      if (res.status === 200) { showToast({ type: 'success', message: 'Collection deleted' }); router.replace('/collections'); }
      else { const d = await res.json(); showToast({ type: 'error', message: d.message }); }
    } catch { showToast({ type: 'error', message: 'Delete failed' }); }
  };

  return (
    <ScrollView className="body">
      <Navbar/>
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">{collection?.name || 'Loading...'}</Text>
          <Text className="h3 text-white">By <Link className="underline h3 text-white" href={`/@${collection?.author.username}`}>{collection?.author.name || 'Loading...'}</Link>.</Text>
        </View>
        {collection?.author.uuid === logtoRecipes?.sub && (
          <View className="flex-row items-end justify-end">
            <OPressable onPress={() => Alert.alert('Delete', 'Delete this collection?', [{text: 'Cancel'}, {text: 'Delete', onPress: deleteCollection, style: 'destructive'}])} className="btn btn-danger">Delete Collection</OPressable>
          </View>
        )}
      </View>

      <View className="p-std grid gap-xl">
        {error && (<ErrorBox message={error}/>)}
        {(recipes && recipes.length > 0) ? (
          <View className="grid gap-std">
            <View className="grid-5 gap-std">
              {recipes.map((recipe) => ( recipe != null && (
                <RecipeLink recipe={ recipe } key={recipe.slug}><OText className="txt-sm text-white">{recipe.description}</OText></RecipeLink>
              )))}
            </View>
          </View>
        ) : (<WarningBox message="This collection does not have any recipes."/>)}
      </View>
      <Footer/>
    </ScrollView>
  );
}