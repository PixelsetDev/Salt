import { useEffect, useState } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { OPressable, OText } from './Overrides';
import { API_BASE } from '../utils/settings';
import { Modal } from './Modal';

interface IngredientResult {
  id: number;
  name: string;
}

interface IngredientSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (ingredient: IngredientResult) => void;
  title?: string;
}

export function IngredientSearchModal({ visible, onClose, onSelect, title = 'Add Ingredient' }: IngredientSearchModalProps) {
  const [ingSearch, setIngSearch] = useState<{ query: string; results: IngredientResult[] }>({
    query: '',
    results: [],
  });

  useEffect(() => {
    if (!ingSearch.query) {
      setIngSearch(prev => ({ ...prev, results: [] }));
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetch(`${API_BASE}/v1/ingredients?search=${encodeURIComponent(ingSearch.query)}&lang=GB`)
        .then(res => (res.ok ? res.json() : null))
        .then(data =>
          setIngSearch(prev => ({ ...prev, results: data?.data?.results || [] }))
        )
        .catch(() => setIngSearch(prev => ({ ...prev, results: [] })));
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [ingSearch.query]);

  const handleClose = () => {
    setIngSearch({ query: '', results: [] });
    onClose();
  };

  const handleSelect = (ingredient: IngredientResult) => {
    setIngSearch({ query: '', results: [] });
    onSelect(ingredient);
  };

  return (
    <Modal visible={visible} title={title} onClose={handleClose}>
      <View className="gap-std">
        <TextInput
          className="input"
          autoFocus
          placeholder="Type to search..."
          value={ingSearch.query}
          onChangeText={t => setIngSearch(prev => ({ ...prev, query: t }))}
        />
        <ScrollView style={{ maxHeight: 200 }} className="mt-2">
          {ingSearch.results.length > 0 ? (
            ingSearch.results.map((res) => (
              <OPressable
                key={res.id}
                className="p-3 border-b border-neutral-200 dark:border-neutral-700"
                onPress={() => handleSelect(res)}
              >
                <OText>{res.name}</OText>
              </OPressable>
            ))
          ) : (
            <View className="p-8 items-center">
              <OText className="opacity-50 text-center">
                {ingSearch.query
                  ? `No ingredients found for "${ingSearch.query}"`
                  : 'Start typing to find ingredients...'}
              </OText>
            </View>
          )}
        </ScrollView>
        <OPressable onPress={handleClose} className="btn btn-secondary">
          Close
        </OPressable>
      </View>
    </Modal>
  );
}