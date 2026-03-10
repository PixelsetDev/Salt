import './../../global.css';
import { Text, View, ScrollView, ActivityIndicator, TextInput, useWindowDimensions } from 'react-native';
import Navbar, { Footer } from '../../components/Commons';
import { OText, OLink, OPressable } from '../../components/Overrides';
import { useEffect, useState, useCallback } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { API_BASE } from '../../utils/settings';
import { useApiCall } from '../../utils/api';
import { useLogto } from '@logto/rn';
import { useToast } from '../../components/ToastProvider';
import { FontAwesome } from '@expo/vector-icons';
import { mealPlanType, mealItemType } from '../../utils/types';
import { Modal } from '../../components/Modal';
import { Picker } from '@react-native-picker/picker';
import RecipeSearch from '../../components/RecipeSearch';

const visibilities = [
  { id: 2, name: 'Unlisted' },
  { id: 1, name: 'Friends' },
  { id: 0, name: 'Private' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function firstWeekdayOfMonth(year: number, month: number): number {
  const jsDay = new Date(year, month - 1, 1).getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

function groupByDay(items: mealItemType[], year: number, month: number): Record<number, mealItemType[]> {
  const map: Record<number, mealItemType[]> = {};
  for (const item of items) {
    const d = new Date(item.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      const day = d.getDate();
      if (!map[day]) map[day] = [];
      map[day].push(item);
    }
  }
  return map;
}

function MealChip({ item }: { item: mealItemType }) {
  const label = item.recipe_name ?? item.text ?? '';
  const isRecipe = !!item.recipe_name;
  return (
    <View className={`chip ${isRecipe ? 'chip-green' : 'chip-yellow'} mb-1`}>
      <Text className="txt-xs" numberOfLines={1}>{label}</Text>
    </View>
  );
}

function CalendarDay({ day, isToday, isCurrentMonth, items, onPress }: { day: number | null; isToday: boolean; isCurrentMonth: boolean; items: mealItemType[]; onPress?: () => void; }) {
  if (day === null) { return <View className="border border-neutral-200 dark:border-neutral-700 min-h-16" />; }
  return (
    <OPressable onPress={onPress} className={`border border-neutral-200 dark:border-neutral-700 p-1 min-h-16 ${isToday ? 'bg-green-800/10' : ''} ${!isCurrentMonth ? 'opacity-30' : ''}`}>
      <Text className={`txt-xs font-bold ${isToday ? 'text-green-800 dark:text-green-400' : 'dark:text-white'}`}>{day}</Text>
      <View className="grid gap-sm mt-1">
        {items.map(item => (<MealChip key={item.id} item={item} />))}
      </View>
    </OPressable>
  );
}

function WeekDay({ date, isToday, items, onPress }: { date: Date; isToday: boolean; items: mealItemType[]; onPress?: () => void; }) {
  const label = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  return (
    <OPressable onPress={onPress} className={`border border-neutral-200 dark:border-neutral-700 p-3 ${isToday ? 'bg-green-800/10' : ''}`}>
      <View className="flex-row items-center justify-between mb-1">
        <Text className={`txt-sm font-bold ${isToday ? 'text-green-800 dark:text-green-400' : 'dark:text-white'}`}>{label}</Text>
        {items.length === 0 && <OText className="txt-subtle">No meals</OText>}
      </View>
      <View className="flex-row flex-wrap gap-sm">
        {items.map(item => (<MealChip key={item.id} item={item} />))}
      </View>
    </OPressable>
  );
}

export default function MealPlanCalendar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const apiCall = useApiCall();
  const { isAuthenticated } = useLogto();
  const { showToast } = useToast();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const d = new Date(today);
    const dow = d.getDay() === 0 ? 6 : d.getDay() - 1;
    d.setDate(d.getDate() - dow);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [plan, setPlan] = useState<mealPlanType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsVisibility, setSettingsVisibility] = useState(0);
  const [saving, setSaving] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<mealItemType[]>([]);
  const [tab, setTab] = useState<'recipe' | 'custom'>('recipe');
  const [customText, setCustomText] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const loadPlan = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiCall(`${API_BASE}/v1/meal-plans/${id}`, false);
      if (!res.ok) { const err = await res.json(); throw new Error(err?.message); }
      const data = await res.json();
      setPlan(data?.data ?? null);
      setSettingsVisibility(data?.data?.visibility ?? 0);
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }, [apiCall, isAuthenticated, id]);

  useEffect(() => { loadPlan(); }, [loadPlan]);

  const saveSettings = async () => {
    setSaving(true);
    try {
      const res = await apiCall(`${API_BASE}/v1/meal-plans/${id}`, true, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: settingsVisibility }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);
      setPlan(prev => prev ? { ...prev, visibility: settingsVisibility } : prev);
      showToast({ type: 'success', message: 'Settings saved.' });
      setShowSettingsModal(false);
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const deletePlan = async () => {
    try {
      const res = await apiCall(`${API_BASE}/v1/meal-plans/${id}`, true, { method: 'DELETE' });
      if (!res.ok) { const data = await res.json(); throw new Error(data?.message); }
      router.replace('/meal-plans');
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    }
  };

  const openDay = (dateStr: string, items: mealItemType[]) => {
    setSelectedDate(dateStr);
    setSelectedItems(items);
    setTab('recipe');
    setCustomText('');
    setConfirmDeleteId(null);
    setShowAddMenu(items.length === 0);
  };

  const addRecipe = async (recipe: any) => {
    if (!selectedDate) return;
    try {
      const res = await apiCall(`${API_BASE}/v1/meal-plans/items`, true, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, recipe_id: recipe.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);
      const newItem: mealItemType = { id: data.data, plan_id: id as any, recipe_id: recipe.id, text: null, date: selectedDate, recipe_name: recipe.name };
      setSelectedItems(prev => [...prev, newItem]);
      setPlan(prev => prev ? { ...prev, items: [...(prev.items ?? []), newItem] } : prev);
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    }
  };

  const addCustom = async () => {
    if (!selectedDate || !customText.trim()) return;
    try {
      const res = await apiCall(`${API_BASE}/v1/meal-plans/items`, true, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, text: customText.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);
      const newItem: mealItemType = { id: data.data, plan_id: id as any, recipe_id: null, text: customText.trim(), date: selectedDate };
      setSelectedItems(prev => [...prev, newItem]);
      setPlan(prev => prev ? { ...prev, items: [...(prev.items ?? []), newItem] } : prev);
      setCustomText('');
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      const res = await apiCall(`${API_BASE}/v1/meal-plans/items/${itemId}`, true, { method: 'DELETE' });
      if (!res.ok) { const data = await res.json(); throw new Error(data?.message); }
      setSelectedItems(prev => prev.filter(i => i.id !== itemId));
      setPlan(prev => prev ? { ...prev, items: (prev.items ?? []).filter(i => i.id !== itemId) } : prev);
      setConfirmDeleteId(null);
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    }
  };

  const prevMonth = () => {
    if (viewMonth === 1) { setViewMonth(12); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 12) { setViewMonth(1); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const prevWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); };
  const nextWeek = () => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); };

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const toDateStr = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const itemsByDateStr: Record<string, mealItemType[]> = {};
  for (const item of plan?.items ?? []) {
    if (!itemsByDateStr[item.date]) itemsByDateStr[item.date] = [];
    itemsByDateStr[item.date].push(item);
  }

  const totalDays = daysInMonth(viewYear, viewMonth);
  const startOffset = firstWeekdayOfMonth(viewYear, viewMonth);
  const itemsByDay = plan?.items ? groupByDay(plan.items, viewYear, viewMonth) : {};

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isTodayDate = (d: Date) => d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  const isTodayDay = (day: number | null) => day !== null && day === today.getDate() && viewMonth === today.getMonth() + 1 && viewYear === today.getFullYear();

  const weekLabel = `${weekDates[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${weekDates[6].toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  const selectedLabel = selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <ScrollView className="body">
      <Navbar />

      <Modal visible={!!selectedDate} title={selectedLabel} onClose={() => setSelectedDate(null)} maxw="">
        <ScrollView className="max-h-[70vh]">
          <View className="grid gap-std">
            {selectedItems.length > 0 && (
              <View className="grid gap-sm">
                {selectedItems.map(item => (
                  <View key={item.id} className="flex-row items-center justify-between p-2 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                    <View className={`chip ${item.recipe_name ? 'chip-green' : 'chip-yellow'}`}>
                      <Text className="txt-xs">{item.recipe_name ?? item.text}</Text>
                    </View>
                    <OPressable onPress={() => setConfirmDeleteId(item.id)}>
                      <FontAwesome name="times" size={14} color="red" />
                    </OPressable>
                  </View>
                ))}
              </View>
            )}

            {confirmDeleteId !== null && (
              <View className="grid gap-sm">
                <OText>Are you sure you want to remove this meal?</OText>
                <View className="flex-row gap-std">
                  <OPressable onPress={() => setConfirmDeleteId(null)} className="btn btn-secondary">Cancel</OPressable>
                  <OPressable onPress={() => deleteItem(confirmDeleteId)} className="btn btn-danger">Remove</OPressable>
                </View>
              </View>
            )}

            {showAddMenu ? (
              <>
                <View className="flex-row gap-std">
                  <OPressable onPress={() => setTab('recipe')} className={`btn ${tab === 'recipe' ? 'btn-primary' : 'btn-secondary'}`}>Recipe</OPressable>
                  <OPressable onPress={() => setTab('custom')} className={`btn ${tab === 'custom' ? 'btn-primary' : 'btn-secondary'}`}>Custom</OPressable>
                </View>
                {tab === 'recipe' ? (
                  <RecipeSearch navigateToRecipe={false} onRecipePress={addRecipe} />
                ) : (
                  <View className="grid gap-sm">
                    <TextInput className="input" placeholder="e.g. Leftover pasta" value={customText} onChangeText={setCustomText} maxLength={64} />
                    <Text className="txt-xs txt-subtle text-right">{customText.length}/64</Text>
                    <OPressable onPress={addCustom} disabled={!customText.trim()} className="btn btn-primary">Add</OPressable>
                  </View>
                )}
              </>
            ) : (
              <OPressable onPress={() => setShowAddMenu(true)} className="btn btn-primary">+ Add Meal</OPressable>
            )}
          </View>
        </ScrollView>
      </Modal>

      <Modal visible={showSettingsModal} title="Plan Settings" onClose={() => setShowSettingsModal(false)}>
        <View className="grid gap-std">
          <View className="grid gap-sm">
            <OText>Visibility</OText>
            <Picker
              style={{ height: 40 }}
              className="input w-full"
              selectedValue={settingsVisibility}
              onValueChange={v => setSettingsVisibility(v)}
            >
              {visibilities.map(v => (
                <Picker.Item key={v.id} label={v.name} value={v.id} />
              ))}
            </Picker>
          </View>
          <View className="flex-row gap-std mt-2">
            <OPressable onPress={saveSettings} disabled={saving} className="btn btn-primary">Save</OPressable>
            <OPressable onPress={() => setShowSettingsModal(false)} className="btn btn-secondary">Cancel</OPressable>
          </View>
          <View className="border-t border-neutral-300 dark:border-neutral-600 pt-4 mt-2">
            <OPressable onPress={() => { setShowSettingsModal(false); deletePlan(); }} className="btn btn-danger">Delete Plan Forever</OPressable>
          </View>
        </View>
      </Modal>

      <View className="header p-std">
        <View className="flex-row items-center gap-std">
          <View className="flex-1">
            <Text className="h1 font-serif text-white">{plan ? `${plan.author.name}'s Meal Plan` : 'Meal Plan'}</Text>
            {plan && !plan.isOwned && (
              <OText className="txt-sm text-white opacity-70">by {plan.author?.name ?? plan.author?.username}</OText>
            )}
          </View>
          <View className="grid gap-sm">
            <OLink href="/meal-plans" className="btn btn-info">
              <FontAwesome name="arrow-left" size={16} color="white" /> <OText>Back</OText>
            </OLink>
            {plan?.isOwned && (
              <OPressable onPress={() => setShowSettingsModal(true)} className="btn btn-info">
                <FontAwesome name="cog" size={16} color="white" /> <OText>Settings</OText>
              </OPressable>
            )}
          </View>
        </View>
      </View>

      <View className="p-std grid gap-std">
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {!isDesktop && (
              <View className="flex-row gap-std">
                <OPressable onPress={() => setViewMode('week')} className={`btn ${viewMode === 'week' ? 'btn-primary' : 'btn-secondary'}`}>Week</OPressable>
                <OPressable onPress={() => setViewMode('month')} className={`btn ${viewMode === 'month' ? 'btn-primary' : 'btn-secondary'}`}>Month</OPressable>
              </View>
            )}

            {(!isDesktop && viewMode === 'week') ? (
              <>
                <View className="flex-row items-center justify-between">
                  <OPressable onPress={prevWeek} className="btn btn-secondary"><Text className="dark:text-white">‹</Text></OPressable>
                  <Text className="h3 font-serif">{weekLabel}</Text>
                  <OPressable onPress={nextWeek} className="btn btn-secondary"><Text className="dark:text-white">›</Text></OPressable>
                </View>
                {weekDates.map(date => {
                  const dateStr = toDateStr(date);
                  return <WeekDay key={dateStr} date={date} isToday={isTodayDate(date)} items={itemsByDateStr[dateStr] ?? []} onPress={plan?.isOwned ? () => openDay(dateStr, itemsByDateStr[dateStr] ?? []) : undefined} />;
                })}
              </>
            ) : (
              <>
                <View className="flex-row items-center justify-between">
                  <OPressable onPress={prevMonth} className="btn btn-secondary"><Text className="dark:text-white">‹</Text></OPressable>
                  <Text className="h2 font-serif">{months[viewMonth - 1]} {viewYear}</Text>
                  <OPressable onPress={nextMonth} className="btn btn-secondary"><Text className="dark:text-white">›</Text></OPressable>
                </View>
                <View className="grid grid-cols-7">
                  {days.map(d => (
                    <View key={d} className="items-center py-1 bg-green-800">
                      <Text className="txt-xs text-white font-bold">{d}</Text>
                    </View>
                  ))}
                  {cells.map((day, i) => (
                    <CalendarDay key={i} day={day} isToday={isTodayDay(day)} isCurrentMonth={day !== null} items={day !== null ? (itemsByDay[day] ?? []) : []} onPress={plan?.isOwned && day !== null ? () => openDay(toDateStr(new Date(viewYear, viewMonth - 1, day!)), itemsByDay[day!] ?? []) : undefined} />
                  ))}
                </View>
              </>
            )}

            <View className="flex-row gap-std mt-2 flex-wrap">
              <View className="flex-row items-center gap-sm">
                <View className="chip chip-green"><Text className="txt-xs">Recipe</Text></View>
                <OText className="txt-subtle">From OurCookbook</OText>
              </View>
              <View className="flex-row items-center gap-sm">
                <View className="chip chip-yellow"><Text className="txt-xs">Custom</Text></View>
                <OText className="txt-subtle">Custom meal</OText>
              </View>
            </View>
          </>
        )}
      </View>

      <Footer />
    </ScrollView>
  );
}