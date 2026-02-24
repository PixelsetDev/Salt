import "./../global.css";
import { Text, View, ScrollView, Image } from "react-native";
import Navbar, { Footer } from '../components/Commons';
import {OLink, OText} from "../components/Overrides";
import { useState, useEffect } from "react";
import { usersType } from '../utils/types';
import { API_BASE } from '../utils/settings';

export default function App() {

  const [users, setUsers] = useState<usersType[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/v1/users`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Chefs</Text>
        </View>
      </View>

      <View className="p-std gap-std">
        <OLink
          href="/join"
          className="btn btn-primary text-center grid gap-2"
        >
          <Text className="font-serif txt-2xl text-white">Join OurCookbook</Text>
          <OText className="text-white">
            Join OurCookbook today and become one of our chefs. It&#39;s free and takes only a minute, and
            you&#39;ll get access to loads of exclusive member-only features!
          </OText>
        </OLink>

        <View className="grid-3 gap-std">
          {users.map((user) => (
            <OLink
              href={"/@"+user?.username}
              key={user?.username}
              className="btn-np btn-primary flex flex-row space-x-2"
            >
              <Image
                source={{ uri: `https://data.portalsso.com/avatar/${user?.uuid}.webp` }}
                className="h-full w-20"
              />
              <View className="grid gap-2 px-4 py-2">
                <Text className="font-serif txt-2xl text-white">{user?.name}</Text>
                <OText className="txt-xl text-white">@{user?.username}</OText>
              </View>
            </OLink>
          ))}
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}
