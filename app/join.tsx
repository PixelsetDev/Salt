import "./../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../components/Commons';
import { OText } from '../components/Overrides';
import { SignInButton, SignUpButton } from '../components/auth/Auth.tsx';

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
        <OText>OurCookbook uses Portal to login. You&apos;ll need to create a Portal account to use OurCookbook.</OText>
        <OText>Portal allows you to use one account for all Pixelset websites and services.</OText>
        <View className="grid-2 gap-std">
          <SignUpButton/>
          <SignInButton/>
        </View>
      </View>
      <Footer/>
    </ScrollView>
    );
}
