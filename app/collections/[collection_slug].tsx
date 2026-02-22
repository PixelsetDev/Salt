import "./../../global.css";
import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Navbar, { Footer } from '../../components/Commons';
import { collectionType, recipeType } from '../../utils/types';
import { API_BASE } from '../../utils/settings';
import { OText } from '../../components/Overrides.tsx';
import { Link, useLocalSearchParams } from 'expo-router';
import { ErrorBox, WarningBox } from '../../components/Boxes.tsx';
import { RecipeLink } from '../../components/RecipeLink.tsx';

export default function App() {
  const { collection_slug } = useLocalSearchParams();

  const [error, setError] = useState<string|null>(null);
  const [collection, setCollection] = useState<collectionType>(null);
  const [recipes, setRecipes] = useState<recipeType[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/v1/collections/${collection_slug}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.data == null) {
          setError(json.message);
        } else {
          setCollection(json.data.collection);
          setRecipes(json.data.recipes);
        }
      })
      .catch((err) => setError(err.message));

  }, [collection_slug]);

  // noinspection PointlessBooleanExpressionJS
  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className={`header grid-2`}>
        <View className={`grid gap-std`}>
          <Text className={`h1 font-serif text-white`} key={`user-header-name`}>{collection?.name || 'Loading...'}</Text>
          <Text className="h3 text-white flex-row">By <Link className={`underline h3 text-white`} href={`/@${collection?.author.username}`}>{collection?.author.name || 'Loading...'}</Link>.</Text>
        </View>
      </View>

      <View className={`p-std grid gap-xl`}>
        {error && (<ErrorBox message={error}/>)}

        {(recipes && recipes.length > 0) ? (
          <View className={`grid gap-std`}>
            <View className={`grid-5 gap-std`}>
              {recipes.map((recipe) => ( recipe != null && (
                <RecipeLink recipe={ recipe } key={recipe.slug}><OText className={`txt-sm text-white`}>{recipe.description}</OText></RecipeLink>
              )))}
            </View>
          </View>
        ) : (<WarningBox message={`This collection does not have any recipes.`}/>)}
      </View>
      <Footer/>
    </ScrollView>
  );
}