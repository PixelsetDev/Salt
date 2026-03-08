import "./../../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OText } from '../../components/Overrides';

export default function App() {

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Shopping List</Text>
        </View>
      </View>
      <View>
        <View className="p-std">
          <OText>
            Whoops, you caught us!
            We&apos;re still polishing this service up, and will release it soon.
            Apologies for the delay!
          </OText>
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}
