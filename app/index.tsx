import "./../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar from "../components/Navbar";
import {OText} from "../components/Overrides";

export default function App() {
    return (
        <ScrollView>
            <Navbar></Navbar>
            <View className="header grid-2">
                <View className="grid gap-std">
                    <View className="grid">
                        <Text className="h1 font-serif text-white">Let&#39;s cook</Text>
                        <Text className="h1 font-serif text-white">Curry</Text>
                    </View>
                    <OText className="h3 text-white">
                        Cook with recipes submitted by your friends and people around the world on OurCookbook.
                    </OText>
                </View>
            </View>
        </ScrollView>
    );
}


