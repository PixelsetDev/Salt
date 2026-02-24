import "./../../global.css";
import { Text, View, ScrollView, TextInput } from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { useState } from "react";
import { OPressable, OText } from "../../components/Overrides";
import RecipeSearch from "../../components/RecipeSearch";
import { API_BASE } from "../../utils/settings";
import { useApiCall } from "../../utils/api";
import { useToast } from "../../components/ToastProvider";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
    const [form, setForm] = useState({ name: '', description: '', visibility: 3 });
    const [selectedRecipes, setSelectedRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const apiCall = useApiCall();
    const { showToast } = useToast();

    const toggleRecipe = (recipe: any) => {
        setSelectedRecipes(prev =>
            prev.find(r => r.id === recipe.id)
                ? prev.filter(r => r.id !== recipe.id)
                : [...prev, recipe]
        );
    };

    const createCollection = async () => {
        if (!form.name.trim()) return showToast({ type: 'error', message: 'Please enter a name.' });
        setLoading(true);
        try {
            const res = await apiCall(`${API_BASE}/v1/collections`, true, {
                method: 'POST',
                body: JSON.stringify({ ...form, recipe_ids: selectedRecipes.map(r => r.id) })
            });
            const json = await res.json();
            if (res.status === 201) {
                showToast({ type: 'success', message: 'Collection created!' });
                router.replace(`/collections/${json.data}`);
            }
            else { showToast({ type: 'error', message: json.message || 'Failed to create.' }); }
        } catch (e) { showToast({ type: 'error', message: e.message }); } finally { setLoading(false); }
    };

    return (
        <ScrollView className="body">
            <Navbar />
            <View className="header p-std">
                <Text className="h1 font-serif text-white">New Collection</Text>
            </View>
            <View className="grid gap-lg p-std">
                <View className="grid-2 gap-std">
                    <View className="bg-secondary p-sm gap-std">
                        <Text className="h2 font-serif">Details</Text>
                        <View className="gap-1">
                            <OText className="txt-xs txt-subtle">Name</OText>
                            <TextInput value={form.name} onChangeText={t => setForm({...form, name: t})} placeholder="e.g. Sunday Roasts" className="input" maxLength={27} />
                            <OText className="txt-xs txt-subtle text-right">{form.name.length}/27</OText>
                        </View>
                        <View className="gap-1">
                            <OText className="txt-xs txt-subtle">Description</OText>
                            <TextInput value={form.description} onChangeText={t => setForm({...form, description: t})} placeholder="Optional description..." multiline numberOfLines={2} className="input" style={{ textAlignVertical: 'top' }} maxLength={128} />
                            <OText className="txt-xs txt-subtle text-right">{form.description.length}/128</OText>
                        </View>
                        <View className="gap-1">
                            <OText className="txt-xs txt-subtle">Visibility</OText>
                            <View className="flex-row flex-wrap gap-sm">
                                {[{l:'Public',v:3},{l:'Unlisted',v:2},{l:'Friends',v:1},{l:'Private',v:0}].map(opt => (
                                    <OPressable key={opt.v} onPress={() => setForm({...form, visibility: opt.v})} className={`btn ${form.visibility === opt.v ? 'btn-primary' : 'btn-secondary'}`}>
                                        {opt.l}
                                    </OPressable>
                                ))}
                            </View>
                        </View>
                        <OPressable onPress={createCollection} disabled={loading} className="btn btn-primary">
                            {loading ? <FontAwesome name="circle-o-notch" size={20} color="white" className="animate-spin" /> : <Text className="text-white">Save Collection</Text>}
                        </OPressable>
                    </View>
                    <View className="bg-secondary p-sm gap-std">
                        <Text className="h2 font-serif">Selected ({selectedRecipes.length})</Text>
                        {selectedRecipes.length === 0 ? <OText className="italic txt-subtle">Tap recipes below to add them.</OText> : (
                            <View className="grid divide-y divide-neutral-500 gap-sm">
                                {selectedRecipes.map(r => (
                                    <View className="flex-row gap-std items-center py-2" key={r.id}>
                                        <OText className="text-white grow">{r.name}</OText>
                                        <OPressable onPress={() => toggleRecipe(r)} className="btn btn-danger">
                                            <FontAwesome name="times" size={14} color="white" />
                                        </OPressable>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
                <View className="gap-std">
                    <Text className="h2 font-serif">Find Recipes</Text>
                    <RecipeSearch navigateToRecipe={false} onRecipePress={toggleRecipe} />
                </View>
            </View>
            <Footer/>
        </ScrollView>
    );
}