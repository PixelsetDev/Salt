import "./../../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OLink, OText } from '../../components/Overrides';

export default function App() {
  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">News</Text>
        </View>
      </View>
      <View className={`grid-2 gap-std p-std`}>
        <OLink className={`btn btn-primary grid`} href={`/news/2025-08-07-our-second-yearly-update`}>
          <Text className={`h3 font-serif`}>Our Second Yearly Update</Text>
          <OText>7th August 2025</OText>
        </OLink>
        <OLink className={`btn btn-primary grid`} href={`/news/2025-02-19-go-ad-free-for-free`}>
          <Text className={`h3 font-serif`}>Go Ad-free, for free!</Text>
          <OText>19th February 2025</OText>
        </OLink>
        <OLink className={`btn btn-primary grid`} href={`/news/2024-09-19-20-amazon-gift-card-prize-draw`}>
          <Text className={`h3 font-serif`}>£20 Amazon Gift Card Prize Draw</Text>
          <OText>19th September 2024</OText>
        </OLink>
        <OLink className={`btn btn-primary grid`} href={`/news/2024-08-20-a-new-ourcookbook-is-arriving-soon`}>
          <Text className={`h3 font-serif`}>A new OurCookbook is arriving soon.</Text>
          <OText>20th August 2024</OText>
        </OLink>
      </View>
      <Footer/>
    </ScrollView>
  );
}
