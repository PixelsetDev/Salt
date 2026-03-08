import "./../../global.css";
import { Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import Navbar, { Footer } from '../../components/Commons';
import { categoriesType, categoryType, ingredientsType, ingredientType } from '../../utils/types';
import { API_BASE } from '../../utils/settings';

type BreadcrumbEntry =
  | { type: 'root' }
  | { type: 'category'; id: number; name: string };

export default function App() {
  const [categories, setCategories] = useState<categoriesType>(null);
  const [ingredients, setIngredients] = useState<ingredientsType>([]);
  const [ingredient, setIngredient] = useState<ingredientType>(null);
  const [category, setCategory] = useState<categoryType>(null);
  const [loading, setLoading] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbEntry[]>([{ type: 'root' }]);

  useEffect(() => { getCategories(); }, []);

  async function getCategories() {
    setLoading(true);
    fetch(API_BASE + '/v1/ingredients/categories/', { method: 'GET' })
      .then((response) => response.json())
      .then((body) => {
        clearContent();
        setCategories(body.data);
        setBreadcrumbs([{ type: 'root' }]);
      })
      .finally(() => setLoading(false));
  }

  async function getCategory(id: number, name: string, appendBreadcrumb = true) {
    setLoading(true);
    fetch(API_BASE + '/v1/ingredients/categories/' + id, { method: 'GET' })
      .then((response) => response.json())
      .then(async (body) => {
        clearContent();
        setCategory(body.data);

        if (appendBreadcrumb) {
          setBreadcrumbs(prev => [...prev, { type: 'category', id, name }]);
        }

        if (body.data.ingredients && body.data.ingredients.length > 0) {
          const ingredientRequests = body.data.ingredients.map((ingredientId: number) =>
            fetch(API_BASE + '/v1/ingredients/' + ingredientId)
              .then((res) => res.json())
              .then((resBody) => ({ id: ingredientId, ...resBody.data }))
          );
          const fullIngredients = await Promise.all(ingredientRequests);
          setIngredients(fullIngredients);
        } else {
          setIngredients([]);
        }
      })
      .finally(() => setLoading(false));
  }

  async function getIngredient(id: number, name: string) {
    setLoading(true);
    fetch(API_BASE + '/v1/ingredients/' + id, { method: 'GET' })
      .then((response) => response.json())
      .then((body) => {
        setIngredient(body.data);
        setBreadcrumbs(prev => [...prev, { type: 'category', id, name }]);
      })
      .finally(() => setLoading(false));
  }

  function clearContent() {
    setIngredient(null);
    setIngredients([]);
    setCategory(null);
    setCategories(null);
  }

  async function navigateToBreadcrumb(index: number) {
    const crumb = breadcrumbs[index];
    const newCrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newCrumbs);

    if (crumb.type === 'root') {
      setLoading(true);
      fetch(API_BASE + '/v1/ingredients/categories/', { method: 'GET' })
        .then((r) => r.json())
        .then((body) => { clearContent(); setCategories(body.data); })
        .finally(() => setLoading(false));
    } else {
      await getCategory(crumb.id, crumb.name, false);
    }
  }

  function parseAllergen(result: number) {
    if (result === 0) return { label: 'No', color: '#22c55e' };
    if (result === 1) return { label: 'May contain — check packaging', color: '#f59e0b' };
    if (result === 2) return { label: 'Yes', color: '#ef4444' };
    return { label: '—', color: '#9ca3af' };
  }

  const ALLERGENS: { key: string; label: string }[] = [
    { key: 'celery', label: 'Celery' },
    { key: 'gluten', label: 'Gluten' },
    { key: 'crustaceans', label: 'Crustaceans' },
    { key: 'eggs', label: 'Eggs' },
    { key: 'fish', label: 'Fish' },
    { key: 'lupin', label: 'Lupin' },
    { key: 'milk', label: 'Milk' },
    { key: 'molluscs', label: 'Molluscs' },
    { key: 'mustard', label: 'Mustard' },
    { key: 'peanuts', label: 'Peanuts' },
    { key: 'sesame', label: 'Sesame' },
    { key: 'soybeans', label: 'Soybeans' },
    { key: 'sulphites', label: 'Sulphites' },
    { key: 'treenuts', label: 'Tree Nuts' },
  ];

  const DIETARY: { key: string; label: string }[] = [
    { key: 'animal_products', label: 'Animal products' },
    { key: 'meat', label: 'Meat' },
  ];

  const currentTitle = ingredient?.name ?? category?.name ?? 'Ingredients';

  return (
    <ScrollView className="body">
      <Navbar />

      {/* Header */}
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Ingredients</Text>
          <Text className="h3 text-white">{loading ? 'Loading…' : currentTitle}</Text>
        </View>
      </View>

      <View className="p-std grid gap-xl">

        {/* Breadcrumb trail */}
        {breadcrumbs.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              const label = crumb.type === 'root' ? 'All Categories' : crumb.name;
              return (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable
                    onPress={() => !isLast && navigateToBreadcrumb(i)}
                    style={{ opacity: isLast ? 1 : 0.7 }}
                  >
                    <Text
                      className="txt-xl"
                      style={{
                        fontWeight: isLast ? '600' : '400',
                        textDecorationLine: isLast ? 'none' : 'underline',
                      }}
                    >
                      {label}
                    </Text>
                  </Pressable>
                  {!isLast && (
                    <Text className="txt-xl" style={{ marginHorizontal: 6, opacity: 0.4 }}>›</Text>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {/* Top-level categories */}
            {categories && categories.length > 0 && (
              <CategoryList
                title="Categories"
                items={categories.map(c => ({ id: c.id, name: c.name }))}
                onPress={(id, name) => getCategory(id, name)}
              />
            )}

            {/* Subcategories */}
            {!categories && category?.subcategories && category.subcategories.length > 0 && (
              <CategoryList
                title="Subcategories"
                items={category.subcategories.map((c: any) => ({ id: c.id, name: c.name }))}
                onPress={(id, name) => getCategory(id, name)}
              />
            )}

            {/* Ingredients list */}
            {!categories && ingredients.length > 0 && (
              <CategoryList
                title="Ingredients"
                items={ingredients.map(i => ({ id: i.id, name: i.name }))}
                onPress={(id, name) => getIngredient(id, name)}
                isLeaf
              />
            )}

            {/* Ingredient detail */}
            {ingredient && (
              <IngredientDetail
                ingredient={ingredient}
                allergens={ALLERGENS}
                dietary={DIETARY}
                parseAllergen={parseAllergen}
              />
            )}
          </>
        )}
      </View>

      <Footer />
    </ScrollView>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function CategoryList({
                        title,
                        items,
                        onPress,
                        isLeaf = false,
                      }: {
  title: string;
  items: { id: number; name: string }[];
  onPress: (id: number, name: string) => void;
  isLeaf?: boolean;
}) {
  return (
    <View className="grid gap-std">
      <Text className="h2 font-serif">{title}</Text>
      <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onPress(item.id, item.name)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
              paddingHorizontal: 4,
              borderBottomWidth: 1,
              borderBottomColor: '#e5e7eb',
              backgroundColor: pressed ? '#f9fafb' : 'transparent',
            })}
          >
            <Text className="txt-xl" style={{ flex: 1 }}>{item.name}</Text>
            {!isLeaf && (
              <Text className="txt-xl" style={{ opacity: 0.4, marginLeft: 8 }}>›</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function AllergenRow({
                       label,
                       result,
                       parseAllergen,
                     }: {
  label: string;
  result: number;
  parseAllergen: (n: number) => { label: string; color: string };
}) {
  const parsed = parseAllergen(result);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
      }}
    >
      <Text className="txt-xl" style={{ flex: 1 }}>{label}</Text>
      <Text className="txt-xl font-bold" style={{ color: parsed.color }}>
        {parsed.label}
      </Text>
    </View>
  );
}

function IngredientDetail({
                            ingredient,
                            allergens,
                            dietary,
                            parseAllergen,
                          }: {
  ingredient: ingredientType;
  allergens: { key: string; label: string }[];
  dietary: { key: string; label: string }[];
  parseAllergen: (n: number) => { label: string; color: string };
}) {
  return (
    <View className="grid gap-xl">
      {ingredient.disclaimer && (
        <View style={{ backgroundColor: '#fffbeb', borderRadius: 8, padding: 12 }}>
          <Text className="txt-xl">
            <Text style={{ fontWeight: '700' }}>Important: </Text>
            {ingredient.disclaimer}
          </Text>
        </View>
      )}

      {ingredient.dietary != null && (
        <>
          <View className="grid gap-std">
            <Text className="h2 font-serif">Allergens</Text>
            <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
              {allergens.map(({ key, label }) => (
                <AllergenRow
                  key={key}
                  label={label}
                  result={(ingredient.dietary as any)[key]}
                  parseAllergen={parseAllergen}
                />
              ))}
            </View>
          </View>

          <View className="grid gap-std">
            <Text className="h2 font-serif">Dietary</Text>
            <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
              {dietary.map(({ key, label }) => (
                <AllergenRow
                  key={key}
                  label={label}
                  result={(ingredient.dietary as any)[key]}
                  parseAllergen={parseAllergen}
                />
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
}