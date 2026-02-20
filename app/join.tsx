import "./../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../components/Commons';
import { OText } from '../components/Overrides';

export default function App() {
  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Join OurCookbook</Text>
        </View>
      </View>

      <View className="p-std grid gap-std">
        <OText>It&apos;s not currently possible to join OurCookbook on our BETA website.</OText>
        <OText>To join, please visit ourcookbook.org</OText>
      </View>
      <Footer/>
    </ScrollView>
    );
}
