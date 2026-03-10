import './../../global.css';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import Navbar, { Footer } from '../../components/Commons';
import { OPressable, OText } from '../../components/Overrides';
import { useEffect, useState, useCallback } from 'react';
import { router } from 'expo-router';
import { API_BASE } from '../../utils/settings';
import { useApiCall } from '../../utils/api';
import { useLogto } from '@logto/rn';
import { useToast } from '../../components/ToastProvider';
import { Modal } from '../../components/Modal';
import { Picker } from '@react-native-picker/picker';
import { ButtonArrow } from '../../components/Buttons';
import { useUser } from '../../components/auth/UserProvider';
import { mealPlanType } from '../../utils/types';

const visibilities = [
  { id: 2, name: 'Unlisted' },
  { id: 1, name: 'Friends' },
  { id: 0, name: 'Private' },
];

const visibilityChip: Record<number, string> = {
  2: 'chip-yellow',
  1: 'chip-green',
  0: 'chip-red',
};

const visibilityLabel: Record<number, string> = {
  2: 'Unlisted',
  1: 'Friends',
  0: 'Private',
};

export default function MealPlanner() {
  const apiCall = useApiCall();
  const { isAuthenticated } = useLogto();
  const { showToast } = useToast();
  const { user } = useUser();

  const [plans, setPlans] = useState<mealPlanType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [visibility, setVisibility] = useState(0);

  const loadPlans = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await apiCall(`${API_BASE}/v1/meal-plans`, true);
      if (!res.ok) { const err = await res.json(); throw new Error(err?.message); }
      const data = await res.json();
      setPlans(data?.data || []);
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }, [apiCall, isAuthenticated]);

  useEffect(() => { loadPlans(); }, [loadPlans]);

  const createPlan = async () => {
    setLoading(true);
    try {
      const res = await apiCall(`${API_BASE}/v1/meal-plans`, true, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setShowCreateModal(false);
        setVisibility(0);
        router.push(`/meal-plans/${data?.data}`);
      } else {
        showToast({ type: 'error', message: data?.message });
      }
    } catch (err: any) {
      showToast({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const myPlan = plans.find(p => p.isOwned);
  const otherPlans = plans.filter(p => !p.isOwned);

  return (
    <ScrollView className="body">
      <Navbar />

      <View className="header p-std">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Meal Plans</Text>
        </View>
      </View>

      <View className="p-std grid gap-std">
        <View className="flex-row justify-between items-center">
          <Text className="h2 font-serif">My Plan</Text>
          {!myPlan && (<OPressable onPress={() => setShowCreateModal(true)} className="btn btn-primary">+ New Plan</OPressable>)}
        </View>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : myPlan ? (
          <ButtonArrow onPress={() => router.push(`/meal-plans/${myPlan.id}`)}>
            <View className="grid gap-sm">
              <View className="flex-row items-center gap-sm flex-wrap">
                <Text className="h3 font-serif">{`${myPlan.author.name}'s Meal Plan`}</Text>
                <View className={visibilityChip[myPlan.visibility] ?? 'chip'}>
                  <Text className="txt-xs">{visibilityLabel[myPlan.visibility] ?? 'Unknown'}</Text>
                </View>
              </View>
            </View>
          </ButtonArrow>
        ) : (<OText>You don&apos;t have a meal plan yet.</OText>)}

        {otherPlans.length > 0 && (
          <>
            <Text className="h2 font-serif mt-4">From Friends</Text>
            {otherPlans.map(plan => (
              <ButtonArrow key={plan.id} onPress={() => router.push(`/meal-plans/${plan.id}`)}>
                <View className="grid gap-sm">
                  <Text className="h3 font-serif">{`${plan.author.name}'s Meal Plan`}</Text>
                </View>
              </ButtonArrow>
            ))}
          </>
        )}

      </View>

      <Modal visible={showCreateModal} title="New Meal Plan" onClose={() => setShowCreateModal(false)}>
        <View className="grid gap-std">
          <View className="grid gap-sm">
            <OText>Plan Name</OText>
            <View className="input opacity-50">
              <OText>{user?.name}&apos;s Meal Plan</OText>
            </View>
          </View>
          <View className="grid gap-sm">
            <OText>Visibility</OText>
            <Picker
              style={{ height: 40 }}
              className="input w-full"
              selectedValue={visibility}
              onValueChange={v => setVisibility(v)}
            >
              {visibilities.map(v => (
                <Picker.Item key={v.id} label={v.name} value={v.id} />
              ))}
            </Picker>
          </View>
          <View className="flex-row gap-std mt-2">
            <OPressable onPress={createPlan} disabled={loading} className="btn btn-primary">Create</OPressable>
            <OPressable onPress={() => setShowCreateModal(false)} className="btn btn-secondary">Cancel</OPressable>
          </View>
        </View>
      </Modal>

      <Footer />
    </ScrollView>
  );
}