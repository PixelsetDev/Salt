import "./../../global.css";
import { Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import Navbar, { Footer } from '../../components/Commons';
import { categoriesType, categoryType, ingredientsType, ingredientType } from '../../utils/types';
import { API_BASE } from '../../utils/settings';
import { OText } from "../../components/Overrides";
import { WarningBox } from '../../components/Boxes';

type BreadcrumbEntry = { type: 'root' } | { type: 'category'; id: number; name: string };

const ALLERGENS = [
  { key: 'celery', label: 'Celery' }, { key: 'gluten', label: 'Gluten' },
  { key: 'crustaceans', label: 'Crustaceans' }, { key: 'eggs', label: 'Eggs' },
  { key: 'fish', label: 'Fish' }, { key: 'lupin', label: 'Lupin' },
  { key: 'milk', label: 'Milk' }, { key: 'molluscs', label: 'Molluscs' },
  { key: 'mustard', label: 'Mustard' }, { key: 'peanuts', label: 'Peanuts' },
  { key: 'sesame', label: 'Sesame' }, { key: 'soybeans', label: 'Soybeans' },
  { key: 'sulphites', label: 'Sulphites' }, { key: 'treenuts', label: 'Tree Nuts' },
];
const DIETARY = [{ key: 'animal_products', label: 'Animal products' }, { key: 'meat', label: 'Meat' }];

function allergenChip(result: number) {
  if (result === 0) return { label: 'No', cls: 'chip-green' };
  if (result === 1) return { label: 'May contain', cls: 'chip-yellow' };
  if (result === 2) return { label: 'Yes', cls: 'chip-red' };
  return { label: '—', cls: 'chip' };
}

export default function App() {
  const [categories, setCategories] = useState<categoriesType>(null);
  const [ingredients, setIngredients] = useState<ingredientsType>([]);
  const [ingredient, setIngredient] = useState<ingredientType>(null);
  const [category, setCategory] = useState<categoryType>(null);
  const [loading, setLoading] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbEntry[]>([{ type: 'root' }]);

  useEffect(() => { getCategories(); }, []);

  function clearContent() {
    setIngredient(null); setIngredients([]); setCategory(null); setCategories(null);
  }

  async function getCategories() {
    setLoading(true);
    fetch(API_BASE + '/v1/ingredients/categories/')
      .then(r => r.json())
      .then(body => { clearContent(); setCategories(body.data); setBreadcrumbs([{ type: 'root' }]); })
      .finally(() => setLoading(false));
  }

  async function getCategory(id: number, name: string, appendBreadcrumb = true) {
    setLoading(true);
    fetch(API_BASE + '/v1/ingredients/categories/' + id)
      .then(r => r.json())
      .then(async body => {
        clearContent();
        setCategory(body.data);
        if (appendBreadcrumb) setBreadcrumbs(prev => [...prev, { type: 'category', id, name }]);
        if (body.data.ingredients?.length > 0) {
          const fullIngredients = await Promise.all(
            body.data.ingredients.map((iid: number) =>
              fetch(API_BASE + '/v1/ingredients/' + iid).then(r => r.json()).then(b => ({ id: iid, ...b.data }))
            )
          );
          setIngredients(fullIngredients);
        }
      })
      .finally(() => setLoading(false));
  }

  async function getIngredient(id: number, name: string) {
    setLoading(true);
    fetch(API_BASE + '/v1/ingredients/' + id)
      .then(r => r.json())
      .then(body => {
        setIngredients([]);
        setIngredient(body.data);
        setBreadcrumbs(prev => {
          const last = prev[prev.length - 1];
          const replacing = last?.type === 'category' && ingredients.some(i => i.id === last.id);
          return replacing ? [...prev.slice(0, -1), { type: 'category', id, name }] : [...prev, { type: 'category', id, name }];
        });
      })
      .finally(() => setLoading(false));
  }

  async function navigateToBreadcrumb(index: number) {
    const crumb = breadcrumbs[index];
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
    if (crumb.type === 'root') {
      setLoading(true);
      fetch(API_BASE + '/v1/ingredients/categories/').then(r => r.json()).then(body => { clearContent(); setCategories(body.data); }).finally(() => setLoading(false));
    } else {
      await getCategory(crumb.id, crumb.name, false);
    }
  }

  return (
    <ScrollView className="body">
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Ingredients</Text>
        </View>
      </View>

      <View className="p-std grid gap-lg">
        <View className="flex flex-row flex-wrap items-center gap-1">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            const label = crumb.type === 'root' ? 'All Categories' : crumb.name;
            return (
              <View key={i} className="flex flex-row items-center">
                <Pressable onPress={() => !isLast && navigateToBreadcrumb(i)} className={isLast ? 'opacity-100' : 'opacity-70'}>
                  <OText className={`txt-xl ${isLast ? 'font-bold' : 'underline'}`}>{label}</OText>
                </Pressable>
                {!isLast && <OText className="txt-xl txt-subtle mx-1">›</OText>}
              </View>
            );
          })}
        </View>

        {loading ? <ActivityIndicator size="large" /> : (
          <View className="grid-2-1 gap-std">
            {ingredient ? (
              <IngredientDetail ingredient={ingredient} />
            ) : (
              <>
                {categories && categories.length > 0 && (
                  <CategoryList title="Categories" items={categories} onPress={(id, name) => getCategory(id, name)} />
                )}
                {!categories && category?.subcategories?.length > 0 && (
                  <CategoryList title="Subcategories" items={category.subcategories} onPress={(id, name) => getCategory(id, name)} />
                )}
                {!categories && ingredients.length > 0 && (
                  <CategoryList title="Ingredients" items={ingredients} onPress={(id, name) => getIngredient(id, name)} isLeaf />
                )}
              </>
            )}
          </View>
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}

function CategoryList({ title, items, onPress, isLeaf = false }: { title: string; items: { id: number; name: string }[]; onPress: (id: number, name: string) => void; isLeaf?: boolean }) {
  return (
    <View className="grid gap-std">
      <Text className="h2 font-serif">{title}</Text>
      <View className="border-t border-neutral-200 dark:border-neutral-700">
        {items.map(item => (
          <Pressable key={item.id} onPress={() => onPress(item.id, item.name)} className="flex flex-row items-center justify-between py-3 px-1 border-b border-neutral-200 dark:border-neutral-700 active:bg-neutral-100 dark:active:bg-neutral-800">
            <OText className="txt-xl flex-1">{item.name}</OText>
            {!isLeaf && <OText className="txt-xl txt-subtle ml-2">›</OText>}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function AllergenRow({ label, result }: { label: string; result: number }) {
  const { label: chipLabel, cls } = allergenChip(result);
  return (
    <View className="flex flex-row items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
      <OText className="txt-xl flex-1">{label}</OText>
      <Text className={cls}>{chipLabel}</Text>
    </View>
  );
}

function IngredientDetail({ ingredient }: { ingredient: ingredientType }) {
  return (
    <View className="grid gap-std span-2">
      <Text className="h2 font-serif">{ingredient?.name}</Text>
      {ingredient?.disclaimer && (
        <WarningBox message={`Important: ${ingredient?.disclaimer}`}/>
      )}
      {ingredient?.dietary != null && (
        <View className="grid-2-1 gap-std">
          <View className="grid gap-sm">
            <Text className="h3 font-serif">Allergens</Text>
            <View className="border-t border-neutral-500">
              {ALLERGENS.map(({ key, label }) => <AllergenRow key={key} label={label} result={(ingredient?.dietary as any)[key]} />)}
            </View>
          </View>
          <View className="grid gsp-sm">
            <Text className="h3 font-serif">Dietary</Text>
            <View className="border-t border-neutral-500">
              {DIETARY.map(({ key, label }) => <AllergenRow key={key} label={label} result={(ingredient?.dietary as any)[key]} />)}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}