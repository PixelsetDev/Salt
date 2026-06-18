import "./../../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OLink } from '../../components/Overrides';

export default function App() {

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Moderate</Text>
        </View>
      </View>
      <View className={`grid gap-lg p-std`}>
        <Text className={`h2 font-serif text-center`}>Main menu</Text>
        <View className="grid-3 gap-std">
          <OLink href={`/moderate/health-check`} className={`btn btn-secondary font-serif txt-4xl`}>Health Check</OLink>
        </View>
        <Text className={`txt-subtle`}>Authorised use only.</Text>
      </View>
      <Footer/>
    </ScrollView>
  );
}
