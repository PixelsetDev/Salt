import "./../../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar from "../../components/Navbar";
import { OText } from '../../components/Overrides';
import { useEffect, useState } from 'react';
import { useLogto } from '@logto/rn';
import NoAuth from '../../components/NoAuth';

export default function App() {
  const [needsAuth, setNeedsAuth] = useState(false);
  const { isAuthenticated, getIdToken, signIn } = useLogto();

  useEffect(() => {
    if (isAuthenticated) {
      const makeAuthenticatedRequest = async () => {
        try {
          const token = await getIdToken();
          const res = await fetch("https://api.ourcookbook.org/meal-plans", {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token }
          });

          if (res.ok) {
            const data = await res.json();
            console.log(data);
            setNeedsAuth(false); // Clear any auth prompts
          } else {
            // Don't auto-redirect, show a button instead
            setNeedsAuth(true);
          }
        } catch (err) {
          console.error(err);
          setNeedsAuth(true);
        }
      };
      makeAuthenticatedRequest();
    } else {
      setNeedsAuth(true);
    }
  }, [isAuthenticated, getIdToken, signIn]);

  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Meal Plans</Text>
        </View>
      </View>
      {needsAuth ? (
        <View>
          <View className="p-std">
            <NoAuth/>
          </View>
        </View>
      ) : (
        <View>
          <View className="p-std">
            <OText>Logged in.</OText>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
