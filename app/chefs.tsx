import "./../global.css";
import { Text, View, ScrollView, Image } from "react-native";
import { Footer, Navbar } from '../components/Commons';
import {OLink, OText} from "../components/Overrides";
import { useState, useEffect } from "react";

export default function App() {

  const [users, setUsers] = useState<{
    name: string;
    username: string;
    avatar: string;
  }[]>([]);

  useEffect(() => {
    fetch("https://api.ourcookbook.org/users", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ScrollView>
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
              href={"/@"+user.username}
              key={user.username}
              className="btn-np btn-primary flex flex-row space-x-2"
            >
              <Image
                source={{ uri: user.avatar }}
                className="h-full rounded-l-md w-20"
              />
              <View className="grid gap-2 px-4 py-2">
                <Text className="font-serif txt-2xl text-white">{user.name}</Text>
                <OText className="txt-xl text-white">@{user.username}</OText>
              </View>
            </OLink>
          ))}
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}
