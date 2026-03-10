import './../../global.css';
import { Text, View, ScrollView, TextInput, ActivityIndicator } from 'react-native';
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
import {shoppingListType} from "../../utils/types.ts";

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

export default function ShoppingLists() {
    const apiCall = useApiCall();
    const { isAuthenticated } = useLogto();
    const { showToast } = useToast();

    const [lists, setLists] = useState<shoppingListType[]>([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newList, setNewList] = useState({ name: '', visibility: 0 });

    const loadLists = useCallback(async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            const res = await apiCall(`${API_BASE}/v1/shopping-lists`, true);
            if (!res.ok) { const err = await res.json(); throw new Error(err?.message || 'Failed to load lists'); }
            const data = await res.json();
            setLists(data?.data?.results || []);
        } catch (err: any) {
            showToast({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    }, [apiCall, isAuthenticated]);

    useEffect(() => { loadLists(); }, [loadLists]);

    const createList = async () => {
        if (!newList.name.trim()) {
            showToast({ type: 'error', message: 'Please enter a name for your list.' });
            return;
        }
        setLoading(true);
        const res = await apiCall(`${API_BASE}/v1/shopping-lists`, true, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newList.name.trim(), visibility: newList.visibility }),
        });
        if (res.status === 201) {
            const id = (await res.json())?.data;
            setShowCreateModal(false);
            setNewList({ name: '', visibility: 0 });
            router.push(`/shopping-lists/${id}`);
        } else {
            showToast({ type: 'error', message: 'Failed to create list.' });
        }
        setLoading(false);
    };

    const myLists = lists.filter(l => l.isOwned);
    const otherLists = lists.filter(l => !l.isOwned);

    return (
        <ScrollView className="body">
            <Navbar />

            <View className="header p-std">
                <View className="grid gap-std">
                    <Text className="h1 font-serif text-white">Shopping Lists</Text>
                </View>
            </View>

            <View className="p-std grid gap-std">

                <View className="flex-row justify-between items-center">
                    <Text className="h2 font-serif">My Lists</Text>
                    <OPressable onPress={() => setShowCreateModal(true)} className="btn btn-primary">
                        + New List
                    </OPressable>
                </View>

                {loading ? (
                    <ActivityIndicator size="large"/>
                ) : myLists.length === 0 ? (
                    <OText>None found.</OText>
                ) : (
                    myLists.map(list => (
                        <ButtonArrow key={list.uuid} onPress={() => router.push(`/shopping-lists/${list.uuid}`)}>
                            <View className="grid gap-sm">
                                <View className="flex-row items-center gap-sm flex-wrap">
                                    <Text className="h3 font-serif">{list.name}</Text>
                                    <View className={visibilityChip[list.visibility] ?? 'chip'}>
                                        <Text className="txt-xs">{visibilityLabel[list.visibility] ?? 'Unknown'}</Text>
                                    </View>
                                </View>
                                <OText className="txt-subtle">
                                    {new Date(list.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </OText>
                            </View>
                        </ButtonArrow>
                    ))
                )}

                {otherLists.length > 0 && (
                    <>
                        <Text className="h2 font-serif mt-4">From Friends</Text>
                        {otherLists.map(list => (
                            <ButtonArrow key={list.uuid} onPress={() => router.push(`/shopping-lists/${list.uuid}`)}>
                                <View className="grid gap-sm">
                                    <Text className="h3 font-serif">{list.name}</Text>
                                    <OText className="txt-subtle">
                                        by {list.author?.name ?? list.author?.username} &middot;{' '}
                                        {new Date(list.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </OText>
                                </View>
                            </ButtonArrow>
                        ))}
                    </>
                )}

            </View>

            <Modal visible={showCreateModal} title="New Shopping List" onClose={() => setShowCreateModal(false)}>
                <View className="grid gap-std">
                    <View className="grid gap-sm">
                        <OText>List Name</OText>
                        <TextInput
                            maxLength={64}
                            className="input"
                            placeholder="e.g. Weekly Shop"
                            value={newList.name}
                            onChangeText={t => setNewList({ ...newList, name: t })}
                        />
                        <Text className="txt-xs txt-subtle text-right">{newList.name.length}/64</Text>
                    </View>
                    <View className="grid gap-sm">
                        <OText>Visibility</OText>
                        <Picker
                            style={{ height: 40 }}
                            className="input w-full"
                            selectedValue={newList.visibility}
                            onValueChange={v => setNewList({ ...newList, visibility: v })}
                        >
                            {visibilities.map(v => (
                                <Picker.Item key={v.uuid} label={v.name} value={v.uuid} />
                            ))}
                        </Picker>
                    </View>
                    <View className="flex-row gap-std mt-2">
                        <OPressable onPress={createList} disabled={loading} className="btn btn-primary">
                            Create
                        </OPressable>
                        <OPressable onPress={() => setShowCreateModal(false)} className="btn btn-secondary">
                            Cancel
                        </OPressable>
                    </View>
                </View>
            </Modal>

            <Footer />
        </ScrollView>
    );
}