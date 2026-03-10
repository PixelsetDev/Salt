import './../../global.css';
import { Text, View, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import Navbar, { Footer } from '../../components/Commons';
import { OLink, OPressable, OText } from '../../components/Overrides';
import { useEffect, useState, useCallback } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { API_BASE } from '../../utils/settings';
import { useApiCall } from '../../utils/api';
import { useToast } from '../../components/ToastProvider';
import { useLogto } from '@logto/rn';
import { FontAwesome } from '@expo/vector-icons';
import { Modal } from '../../components/Modal';
import { Picker } from '@react-native-picker/picker';
import { shoppingItemType, shoppingListType } from '../../utils/types';

const visibilities = [
  { id: 2, name: 'Unlisted' },
  { id: 1, name: 'Friends' },
  { id: 0, name: 'Private' },
];

const itemLabel = (item: shoppingItemType) => item.ingredient_name ?? item.text ?? 'Unknown item';

export default function ShoppingListDetail() {
  const { id } = useLocalSearchParams();
  const apiCall = useApiCall();
  const { showToast } = useToast();
  const { isAuthenticated } = useLogto();

  const [list, setList] = useState<shoppingListType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<shoppingItemType | null>(null);

  const [addQuery, setAddQuery] = useState('');
  const [addResults, setAddResults] = useState<{id: number; name: string}[]>([]);
  const [addText, setAddText] = useState('');
  const [addNoResults, setAddNoResults] = useState(false);

  const loadList = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await apiCall(`${API_BASE}/v1/shopping-lists/${id}`, true);
      if (!res.ok) { const err = await res.json(); throw new Error(err?.message || 'List not found or access denied.'); }
      const data = await res.json();
      const listData = data.data;
      const items = await Promise.all(listData.items.map(async (item: shoppingItemType) => {
        if (!item.ingredient_id) return item;
        const ingRes = await fetch(`${API_BASE}/v1/ingredients/${item.ingredient_id}`);
        const ingData = ingRes.ok ? await ingRes.json() : null;
        return { ...item, ingredient_name: ingData?.data?.name ?? null };
      }));
      setList({ ...listData, items });
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    }
  }, [id, apiCall, isAuthenticated]);

  useEffect(() => { loadList(); }, [loadList]);

  useEffect(() => {
    if (!addQuery.trim()) { setAddResults([]); setAddNoResults(false); return; }
    const timer = setTimeout(() => {
      fetch(`${API_BASE}/v1/ingredients?search=${encodeURIComponent(addQuery)}&lang=GB`)
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          const results = data?.data?.results || [];
          setAddResults(results);
          setAddNoResults(results.length === 0);
        })
        .catch(() => { setAddResults([]); setAddNoResults(true); });
    }, 400);
    return () => clearTimeout(timer);
  }, [addQuery]);

  const resetAddModal = () => {
    setAddQuery('');
    setAddResults([]);
    setAddText('');
    setAddNoResults(false);
    setShowAddModal(false);
  };

  const addIngredientItem = async (ingredient: { id: number; name: string }) => {
    const res = await apiCall(`${API_BASE}/v1/shopping-lists/${id}/items`, true, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredient_id: ingredient.id }),
    });
    if (res.status === 201) { loadList(); showToast({ type: 'success', message: `${ingredient.name} added.` }); resetAddModal(); }
    else showToast({ type: 'error', message: 'Failed to add ingredient.' });
  };

  const addTextItem = async (text: string) => {
    if (!text.trim()) return;
    const res = await apiCall(`${API_BASE}/v1/shopping-lists/${id}/items`, true, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.trim() }),
    });
    if (res.status === 201) { loadList(); showToast({ type: 'success', message: 'Item added.' }); resetAddModal(); }
    else showToast({ type: 'error', message: 'Failed to add item.' });
  };

  const saveMetadata = async () => {
    if (!list) return;
    setLoading(true);
    const res = await apiCall(`${API_BASE}/v1/shopping-lists/${id}`, true, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: list.name, visibility: list.visibility }),
    });
    showToast({ type: res.status === 200 ? 'success' : 'error', message: res.status === 200 ? 'List saved.' : 'Failed to save.' });
    if (res.status === 200) setShowSettingsModal(false);
    setLoading(false);
  };

  const toggleChecked = async (item: shoppingItemType) => {
    const res = await apiCall(`${API_BASE}/v1/shopping-lists/${id}/items/${item.id}`, true, {
      method: 'PUT',
    });
    if (res.status === 200) {
      setList(prev => prev ? {
        ...prev,
        items: prev.items.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i),
      } : prev);
    }
  };

  const deleteItem = async () => {
    if (!itemToDelete) return;
    const res = await apiCall(`${API_BASE}/v1/shopping-lists/${id}/items/${itemToDelete.id}`, true, {
      method: 'DELETE',
    });
    if (res.status === 200) { loadList(); setItemToDelete(null); }
    else showToast({ type: 'error', message: 'Failed to remove item.' });
  };

  const deleteList = async () => {
    const res = await apiCall(`${API_BASE}/v1/shopping-lists/${id}`, true, { method: 'DELETE' });
    if (res.status === 200) router.replace('/shopping-lists');
    else showToast({ type: 'error', message: 'Failed to delete list.' });
  };

  const uncheckedItems = list?.items.filter(i => !i.checked) ?? [];
  const checkedItems = list?.items.filter(i => i.checked) ?? [];
  const isOwned = list?.isOwned ?? false;

  return (
    <ScrollView className="body">
      <Navbar />

      <View className="header p-std flex-row justify-between items-center">
        <View className="grid gap-sm flex-1">
          <Text className="h1 font-serif text-white">{list?.name ?? 'Shopping List'}</Text>
          {list && (
            <OText className="text-white">
              By {list.author?.name ?? list.author?.username} on {new Date(list.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
            </OText>
          )}
        </View>
        <View className="grid gap-sm">
          <OLink href="/shopping-lists" className="btn btn-info">
            <FontAwesome name="arrow-left" size={16} color="white"/> <OText>Back</OText>
          </OLink>
          {isOwned && list && (
            <OPressable onPress={() => setShowSettingsModal(true)} className="btn btn-info">
              <FontAwesome name="cog" size={16} color="white"/> <OText>Settings</OText>
            </OPressable>
          )}
        </View>
      </View>

      {!list ? (
        <View className="p-std items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View className="p-std grid gap-std">
          <View className="bg-secondary p-xs grid gap-std">
            <View className="flex-row justify-between items-center flex-wrap gap-sm">
              <Text className="h2 font-serif">Items</Text>
              {isOwned && (
                <OPressable onPress={() => setShowAddModal(true)} className="btn btn-secondary">
                  + Add Item
                </OPressable>
              )}
            </View>

            {list.items.length === 0 ? (
              <OText className="txt-subtle">No items yet{isOwned ? ' — add something to get started!' : '.'}</OText>
            ) : (
              <>
                {uncheckedItems.map(item => (
                  <View key={item.id} className="flex-row items-center gap-sm">
                    <OPressable onPress={() => toggleChecked(item)} className="btn btn-secondary p-2">
                      <FontAwesome name="square-o" size={18} />
                    </OPressable>
                    <View className="flex-1 flex-row items-center gap-sm">
                      <OText className="flex-1">{itemLabel(item)}</OText>
                    </View>
                    {isOwned && (
                      <OPressable onPress={() => setItemToDelete(item)} className="btn btn-danger">
                        <FontAwesome name="trash" size={16} color="white" />
                      </OPressable>
                    )}
                  </View>
                ))}

                {checkedItems.length > 0 && (
                  <>
                    <View className="border-b border-neutral-300 dark:border-neutral-600 mt-2" />
                    {checkedItems.map(item => (
                      <View key={item.id} className="flex-row items-center gap-sm opacity-50">
                        <OPressable onPress={() => toggleChecked(item)} className="btn btn-neutral p-2">
                          <FontAwesome name="check-square" size={18} color="#166534" />
                        </OPressable>
                        <OText className="flex-1 line-through">{itemLabel(item)}</OText>
                        {isOwned && (
                          <OPressable onPress={() => setItemToDelete(item)} className="btn btn-danger">
                            <FontAwesome name="trash" size={16} color="white" />
                          </OPressable>
                        )}
                      </View>
                    ))}
                  </>
                )}
              </>
            )}
          </View>
        </View>
      )}

      <Modal visible={showSettingsModal} title="List Settings" onClose={() => setShowSettingsModal(false)}>
        <View className="grid gap-std">
          <View className="grid gap-sm">
            <OText>List Name</OText>
            <TextInput
              maxLength={64}
              className="input"
              placeholder="List Name"
              value={list?.name ?? ''}
              onChangeText={t => list && setList({ ...list, name: t })}
            />
            <Text className="txt-xs txt-subtle text-right">{list?.name?.length ?? 0}/64</Text>
          </View>
          <View className="grid gap-sm">
            <OText>Visibility</OText>
            <Picker
              style={{ height: 40 }}
              className="input w-full"
              selectedValue={list?.visibility}
              onValueChange={v => list && setList({ ...list, visibility: v })}
            >
              {visibilities.map(v => (
                <Picker.Item key={v.id} label={v.name} value={v.id} />
              ))}
            </Picker>
          </View>
          <View className="flex-row gap-std mt-2">
            <OPressable disabled={loading} onPress={saveMetadata} className="btn btn-primary">Save</OPressable>
            <OPressable onPress={() => setShowSettingsModal(false)} className="btn btn-secondary">Cancel</OPressable>
          </View>
          <View className="border-t border-neutral-300 dark:border-neutral-600 pt-4 mt-2">
            <OPressable onPress={() => { setShowSettingsModal(false); deleteList(); }} className="btn btn-danger">
              Delete List Forever
            </OPressable>
          </View>
        </View>
      </Modal>

      <Modal visible={showAddModal} title="Add Item" onClose={resetAddModal}>
        <View className="grid gap-std">
          <TextInput
            className="input"
            autoFocus
            placeholder="Search ingredients or type an item..."
            value={addQuery}
            onChangeText={t => { setAddQuery(t); setAddText(t); }}
          />
          {addResults.length > 0 ? (
            <ScrollView style={{ maxHeight: 200 }}>
              {addResults.map(ing => (
                <OPressable key={ing.id} className="p-3 border-b border-neutral-200 dark:border-neutral-700" onPress={() => addIngredientItem(ing)}>
                  <OText>{ing.name}</OText>
                </OPressable>
              ))}
            </ScrollView>
          ) : addNoResults && addQuery.trim() ? (
            <View className="grid gap-sm">
              <OText className="txt-subtle">No ingredients found — add as custom item?</OText>
              <OPressable onPress={() => addTextItem(addText)} className="btn btn-primary">
                Add "{addText}"
              </OPressable>
            </View>
          ) : null}
          <OPressable onPress={resetAddModal} className="btn btn-secondary">Cancel</OPressable>
        </View>
      </Modal>

      <Modal visible={!!itemToDelete} title="Remove Item" onClose={() => setItemToDelete(null)}>
        <View className="grid gap-std">
          <OText>Remove <OText>{itemToDelete ? itemLabel(itemToDelete) : ''}</OText> from this list?</OText>
          <View className="flex-row gap-std mt-2">
            <OPressable onPress={deleteItem} className="btn btn-danger">Remove</OPressable>
            <OPressable onPress={() => setItemToDelete(null)} className="btn btn-secondary">Cancel</OPressable>
          </View>
        </View>
      </Modal>

      <Footer />
    </ScrollView>
  );
}