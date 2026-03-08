import "./../../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OLink, OText } from '../../components/Overrides';
import { NewsListItem } from '../../components/News.tsx';

export default function App() {
  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">News</Text>
        </View>
      </View>
      <View className={`grid-2-1 gap-std p-std`}>
        <NewsListItem name={`Spice up ya life!`} date={`7th March 2026`} summary={`Welcome to the new OurCookbook experience.`} category={`Updates`} url={`2026-03-07-spice-up-ya-life`} />
        <NewsListItem name={`Our Second Yearly Update`} date={`7th August 2025`} summary={`OurCookbook's annual update for 2025.`} category={`Updates`} url={`2025-08-07-our-second-yearly-update`} />
        <NewsListItem name={`£20 Amazon Gift Card Prize Draw`} date={`19th September 2024`} summary="" category={`Competitions`} url={`2024-09-19-20-amazon-gift-card-prize-draw`} />
        <NewsListItem name={`A new OurCookbook is arriving soon.`} date={`20th August 2024`} summary="" category={`Updates`} url={`2024-08-20-a-new-ourcookbook-is-arriving-soon`} />
      </View>
      <Footer/>
    </ScrollView>
  );
}
