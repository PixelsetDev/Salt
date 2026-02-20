import "./../global.css";
import { Text, View, ScrollView } from "react-native";
import { Footer, Navbar } from '../components/Commons';
import { OText } from '../components/Overrides';

export default function App() {

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Whoops!</Text>
        </View>
      </View>
      <View>
        <View className="p-std">
          <OText>Sorry, we couldn&apos;t find what you were looking for.</OText>
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}
