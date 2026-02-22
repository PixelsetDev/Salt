import "./../../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OLink, OText } from '../../components/Overrides';
import { Link } from 'expo-router';

export default function App() {

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">New Post</Text>
        </View>
      </View>
      <View className={`grid gap-lg p-std`}>
        <Text className={`h2 font-serif text-center`}>What would you like to post?</Text>
        <View className="grid-3 gap-std">
          <OLink href={`/new/recipe`} className={`btn btn-secondary font-serif txt-4xl`}>Recipe</OLink>
          <OLink href={`/new/collection`} className={`btn btn-secondary font-serif txt-4xl`}>Collection</OLink>
        </View>
        <Text className={`txt-subtle`}>By posting to OurCookbook you agree to our <Link href={`https://support.pixelset.dev/knowledgebase.php?article=19`} className={`link-inline-subtle`}>Community Guidelines</Link>.</Text>
      </View>
      <Footer/>
    </ScrollView>
  );
}
