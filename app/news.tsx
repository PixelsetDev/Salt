import "./../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar from "../components/Navbar";

export default function App() {
    return (
        <ScrollView>
            <Navbar></Navbar>
            <View className="header grid-2">
                <View className="gap-std">
                    <View className="grid">
                        <Text className="font-serif txt-7xl text-white">News</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
