import {View} from "react-native";
import {OLink, OPressable, OText} from "./Overrides";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {useState} from "react";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    return(
        <View>
            <View className="bg-green-d sm:flex hidden flex-row space-x-2 px-std py-1">
                <View className="py-1 self-center">
                    <OLink href="/" className="btn-nav-active font-serif">OurCookbook</OLink>
                </View>

                <View className="py-1 self-center"><OLink href="/chefs" className="btn-nav">Chefs</OLink></View>
                <View className="py-1 self-center"><OLink href="/collections" className="btn-nav">Collections</OLink></View>
                <View className="py-1 self-center"><OLink href="/news" className="btn-nav">News</OLink></View>

                <View className="flex-grow"/>

                <View className="py-1 self-center"><OLink href="/" className="btn-nav">Sign in</OLink></View>
                <View className="py-1 self-center"><OLink href="/" className="btn-nav">Join</OLink></View>
            </View>
            <View className="bg-green-d flex flex-row sm:hidden space-x-2 px-std py-1">
                <View className="py-1 self-center">
                    <OLink href="/" className="btn-nav-active font-serif">OurCookbook</OLink>
                </View>

                <View className="flex-grow"/>

                <View className="py-1 self-center">
                    <OPressable onPress={() => setVisible((prev) => !prev)} className="btn-nav">
                        <FontAwesome6 name="bars" size={16} color="white" />
                    </OPressable>
                </View>
            </View>
            {visible && (
                <View className="mt-4 p-4 bg-gray-200 rounded">
                    <View className="grid-3 gap-std p-std">
                        <OText>
                            Temporary mobile nav links
                        </OText>
                        <OLink
                            href="/chefs"
                            className="btn btn-primary"
                        >
                            Chefs
                        </OLink>
                    </View>
                </View>
            )}
        </View>
    );
}

export default Navbar;