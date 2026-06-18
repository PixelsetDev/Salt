import "./../../global.css";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OLink, OText } from '../../components/Overrides';
import { useEffect, useState } from 'react';
import { API_BASE } from '../../utils/settings.ts';
import { useApiCall } from '../../utils/api.ts';
import { ErrorBox, SuccessBox } from '../../components/Boxes.tsx';
import { useLogto } from '@logto/rn';
import { useToast } from '../../components/ToastProvider.tsx';

type IngredientRef = { id: number; name_gb: string; name_us?: string; category?: number };
type HealthData = {
  recipes: { missing_steps: number[]; missing_ingredients: number[] };
  ingredients: { missing_dietary: IngredientRef[]; missing_categories: IngredientRef[]; parent_died: IngredientRef[] };
  'processing-time': number;
};

function RecipeLink({ id }: { id: number }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const apiCall = useApiCall();

  useEffect(() => {
    apiCall(`${API_BASE}/v1/recipes/${id}`).then(res => res.ok ? res.json() : null).then(data => {
      if (data?.data) { setSlug(data.data.slug); setUsername(data.data.author.username); }
    }).catch(() => {});
  }, [id]);

  if (!slug || !username) return <ActivityIndicator size="small" />;
  return <OLink href={`/@${username}/${slug}`}>#{id} — /@{username}/{slug}</OLink>;
}

function Section({ title, children, count }: { title: string; children: React.ReactNode; count: number }) {
  return (
    <View className="bg-secondary p-xs grid gap-sm">
      <View className="flex-row justify-between items-center">
        <Text className="h2 font-serif">{title}</Text>
        <View className={`px-2 py-1 rounded ${count === 0 ? 'bg-green-500' : count < 50 ? 'bg-yellow-600' : count < 100 ? 'bg-orange-500' : 'bg-red-500'}`}>
          <Text className="text-white txt-xs font-bold">{count}</Text>
        </View>
      </View>
      <View className="grid-3 gap-sm">
        {count === 0 ? <OText>None found.</OText> : children}
      </View>
    </View>
  );
}

export default function HealthCheck() {
  const apiCall = useApiCall();
  const { showToast } = useToast();
  const { isAuthenticated } = useLogto();
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiCall(`${API_BASE}/v1/moderate/health-check`, true)
      .then(res => res.ok ? res.json() : res.json().then(e => Promise.reject(e.message || 'Failed to load')))
      .then(res => setData(res.data))
      .catch(e => showToast({ type: 'error', message: String(e) }))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return (
    <ScrollView className="body">
      <Navbar />
      <View className="header p-std">
        <View className="flex-row gap-sm justify-between">
          <View className="flex-grow">
            <Text className="h1 font-serif text-white">Moderate</Text>
            <Text className="h3 text-white">Health Check</Text>
          </View>
          <OLink href="/moderate" className="btn btn-info">Back</OLink>
        </View>
      </View>
      <View className="p-std grid gap-std">
        {loading && <ActivityIndicator size="large" />}
        {data && (
          <>
            {data && <OText className="txt-subtle txt-xs text-white">Query completed in {data['processing-time'].toFixed(2)}ms</OText>}
            <Section title="Recipes Missing Steps" count={data.recipes.missing_steps.length}>
              {data.recipes.missing_steps.map(id => <RecipeLink key={id} id={id} />)}
            </Section>
            <Section title="Recipes Missing Ingredients" count={data.recipes.missing_ingredients.length}>
              {data.recipes.missing_ingredients.map(id => <RecipeLink key={id} id={id} />)}
            </Section>
            <Section title="Ingredients Missing Dietary Info" count={data.ingredients.missing_dietary.length}>
              {data.ingredients.missing_dietary.map(ing => <OLink className="txt-lg link-inline" key={ing.id} href={`/ingredients/${ing.id}`}>#{ing.id} — {ing.name_gb}</OLink>)}
            </Section>
            <Section title="Ingredients Missing Categories" count={data.ingredients.missing_categories.length}>
              {data.ingredients.missing_categories.map(ing => <OLink className="txt-lg link-inline" key={ing.id} href={`/ingredients/${ing.id}`}>#{ing.id} — {ing.name_gb}</OLink>)}
            </Section>
            <Section title="Ingredients With Deleted Parent" count={data.ingredients.parent_died.length}>
              {data.ingredients.parent_died.map(ing => <OLink className="txt-lg link-inline" key={ing.id} href={`/ingredients/${ing.id}`}>#{ing.id} — {ing.name_gb}</OLink>)}
            </Section>
          </>
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}