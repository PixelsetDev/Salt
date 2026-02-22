import "./../../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar, { Footer } from "../../components/Commons";
import { OText, OLink } from "../../components/Overrides"

export default function App() {
  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className="header">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">£20 Amazon Gift Card Prize Draw</Text>
          <OText className={`h3 text-white`}>19th September 2024</OText>
        </View>
      </View>

      <View className={`grid gap-lg p-std`}>
        <OText className={`font-bold`}>
          This Prize Draw has now ended. No further entries are being accepted.
        </OText>

        <View className={`grid-3 gap-std`}>
          <OLink className={`text-center btn btn-secondary`} href={`/news/2024-08-20-a-new-ourcookbook-is-arriving-soon`}>Previous Article</OLink>
          <OLink className={`text-center btn btn-secondary`} href={`/news`}>All News</OLink>
          <OLink className={`text-center btn btn-secondary`} href={`/news/2025-08-07-our-second-yearly-update`}>Next Article</OLink>
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}
