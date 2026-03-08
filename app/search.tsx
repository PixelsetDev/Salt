/* Same as recipes.tsx */
import "./../global.css";
import { Text, View, ScrollView } from 'react-native';
import Navbar, { Footer } from '../components/Commons';
import RecipeSearch from '../components/RecipeSearch';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function App() {
  const { search } = useLocalSearchParams();
  const searchValue = Array.isArray(search) ? search[0] : search ?? '';

  const [hasSearched, setHasSearched] = useState(false);

  return (
    <ScrollView className={`body`}>
      <Navbar />

      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Recipes</Text>
        </View>
      </View>

      <View className="p-std">
        <RecipeSearch doSearch={searchValue} showButton={true} onSearchPerformed={setHasSearched} />
        { !hasSearched && (
          <View className={`grid-5 gap-std`}>
          </View>
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}
