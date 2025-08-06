import "./../../global.css";
import { Text, View, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import Navbar from "../../components/Navbar";
import { OLink, OText } from "../../components/Overrides";
import { useState, useEffect } from "react";
import { Desktop, Mobile } from 'components/Exclusions';

export default function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [collections, setCollections] = useState<
    {
      slug: string;
      name: string;
      author: {
        name: string;
      };
      description: string;
      featured: boolean;
    }[]
  >([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCollections(search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    fetchCollections(); // Initial load
  }, []);

  const fetchCollections = async (query = "") => {
    setCollections([]); // clear results immediately
    setLoading(true);
    setShowSpinner(false);

    // Only show spinner if it takes longer than 300ms
    const spinnerDelay = setTimeout(() => {
      setShowSpinner(true);
    }, 300);

    try {
      const url = `https://api.ourcookbook.org/collections${query ? `?query=${encodeURIComponent(query)}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data.data)) {
        setCollections(data.data);
      } else {
        setCollections([]);
        console.warn("No collections found:", data.status?.message || "Unknown issue");
      }
    } catch (err) {
      console.log("Error fetching collections:", err);
    } finally {
      clearTimeout(spinnerDelay);
      setLoading(false);
      setShowSpinner(false);
    }
  };

  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Collections</Text>
        </View>
      </View>

      <View className="grid gap-std p-std">
        <Text className="h2 font-serif text-center">Search</Text>
        <TextInput
          placeholder="Search collections..."
          placeholderTextColor="#ccc"
          value={search}
          onChangeText={setSearch}
          className="input"
          returnKeyType="search"
        />

        {showSpinner && (
          <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
        )}

        <Mobile>
          <View className="grid gap-std">
            {collections.map((collection) => (
              <OLink
                href={`/collections/${collection.slug}`}
                key={collection.slug}
                className="btn-np btn-primary flex flex-row space-x-2"
              >
                <View className="grid gap-2 px-4 py-2">
                  <Text className="font-serif txt-2xl text-white">{collection.name}</Text>
                  <OText className="txt-xl text-white">By {collection.author.name}</OText>
                  <OText className="txt-xl text-white">{collection.description}</OText>
                </View>
              </OLink>
            ))}
          </View>
        </Mobile>
        <Desktop>
          <View className="grid-2 gap-std">
            {collections.map((collection) => (
              <OLink
                href={`/collections/${collection.slug}`}
                key={collection.slug}
                className="btn-np btn-primary flex flex-row space-x-2"
              >
                <View className="grid gap-2 px-4 py-2">
                  <Text className="font-serif txt-2xl text-white">{collection.name}</Text>
                  <OText className="txt-xl text-white">By {collection.author.name}</OText>
                  <OText className="txt-xl text-white">{collection.description}</OText>
                </View>
              </OLink>
            ))}
          </View>
        </Desktop>

        {!loading && collections.length === 0 && (
          <Text className="txt-xl text-white text-center mt-4">No results found.</Text>
        )}
      </View>
    </ScrollView>
  );
}
