import "./../../global.css"
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import { OText } from '../../components/Overrides';


type Item = { id: string; name: string; done?: boolean };

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState('');

  const add = () => {
    const name = text.trim();
    if (!name) return;
    setItems((prev) => [{ id: String(Date.now()), name, done: false }, ...prev]);
    setText('');
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const toggle = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  return (
    <ScrollView>
      <Navbar></Navbar>
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Shopping List</Text>
        </View>
      </View>
      <View className={`p-std grid gap-std`}>
        <View className={`flex-row gap-std`}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Add an item"
            className={`input w-full`}
            onSubmitEditing={add}
            returnKeyType="done"
          />
          <Pressable onPress={add} className={`btn btn-primary`}>
            <OText className={`text-white`}>Add</OText>
          </Pressable>
        </View>

        <View className={`grid gap-std`}>
        {items.length === 0 ? (
          <OText>No items yet. Add your first one above.</OText>
        ) : (
          items.map((item) => (
            <View key={item.id} className={`flex-row text-center border-2 border-neutral-200 p-2`}>
              <Pressable onPress={() => toggle(item.id)} className={`flex-1`}>
                <OText className={`px-1`}>
                  {item.name}
                </OText>
              </Pressable>
              <Pressable onPress={() => remove(item.id)} className={`btn btn-danger`}>
                <Text className={`text-white`}>Remove</Text>
              </Pressable>
            </View>
          ))
        )}
        </View>
      </View>
    </ScrollView>
  );
}
