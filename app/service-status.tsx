import "./../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../components/Commons';
import { ErrorBox, WarningBox } from '../components/Boxes.tsx';
import { OText } from '../components/Overrides.tsx';

export default function App() {
  return (
    <ScrollView className="body">
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Service Status</Text>
        </View>
      </View>

      <View className="p-std grid gap-lg">
        <View className="grid gap-sm">
          <Text className="h2 font-serif">Current Status</Text>
          <ErrorBox message="The following features are currently unavailable due to technical issues: Icons"/>
          <OText>
            We are aware of an issue resulting in icons not loading correctly on web and
            are working to fix it.
          </OText>
        </View>
        <View className="grid gap-sm">
          <Text className="h2 font-serif">Past Incidents</Text>
          <OText>
            8 March – 10 March 2026: Ingredient Creation, Shopping Lists, and Meal Plans were unavailable.
          </OText>
        </View>
        <View className="grid gap-sm">
          <Text className="h2 font-serif">Server Status</Text>
          <OText>For information about our servers, please visit status.pixelset.dev</OText>
        </View>
      </View>
      <Footer/>
    </ScrollView>
    );
}
