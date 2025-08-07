import { Text, View } from "react-native";
import { OLink, OPressable } from "./Overrides";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return(
    <View>
      <View className="bg-red-800 flex flex-row space-x-2 px-std py-1">
        <Text className={`text-white text-xs`}>
          You&apos;re on our BETA website, it&apos;s under active development and is likely to behave unexpectedly.
          Please report any bugs, crashes, or issues to ocb-app-issues@pixelset.dev
        </Text>
      </View>
      <View className="bg-green-d sm:flex hidden flex-row space-x-2 px-std py-1">
        <View className="py-1 self-center">
          <OLink href="/" className="btn-nav-active font-serif">OurCookbook</OLink>
        </View>

        <View className="py-1 self-center"><OLink href="/recipes" className="btn-nav">Recipes</OLink></View>
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
        <View className="p-4 bg-gray-200 rounded">
          <View className="grid gap-std p-std">
            <OLink href="/recipes" className="btn btn-primary text-white">Recipes</OLink>
            <OLink href="/chefs" className="btn btn-primary text-white">Chefs</OLink>
            <OLink href="/collections" className="btn btn-primary text-white">Collections</OLink>
            <OLink href="/news" className="btn btn-primary text-white">News</OLink>
          </View>
        </View>
      )}
    </View>
  );
}

export default Navbar;