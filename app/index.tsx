import "./../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar from "../components/Navbar";
import {OText} from "../components/Overrides";

export default function App() {
    return (
        <ScrollView>
            <Navbar></Navbar>
            <View className="header grid-2">
                <View className="gap-std">
                    <View className="grid">
                        <Text className="font-serif txt-7xl text-white">Let's cook</Text>
                        <Text className="font-serif txt-7xl text-white">Curry</Text>
                    </View>
                    <OText className="txt-4xl text-white">
                        Cook with recipes submitted by your friends and people around the world on OurCookbook.
                    </OText>
                </View>
            </View>
        </ScrollView>
    );
}


