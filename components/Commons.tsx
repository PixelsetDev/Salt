import { Text, View } from 'react-native';
import { useState } from "react";
import { OLink, OPressable, OText } from "./Overrides";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLogto } from '@logto/rn';
import { SignOutButton, SignInButton } from './Auth';

export const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const { isAuthenticated } = useLogto();

  return(
    <View>
      <View className="bg-red-800 flex flex-row gap-2 px-std py-1">
        <Text className={`text-white text-xs`}>
          You&apos;re on our BETA website, it&apos;s under active development and is likely to behave unexpectedly.
          Please report any bugs, crashes, or issues to ocb-app-issues@pixelset.dev
        </Text>
      </View>
      <View className="bg-green-d sm:flex hidden flex-row gap-2 px-std py-1">
        <View className="py-1 self-center">
          <OLink href="/" className="btn-nav-active font-serif">OurCookbook</OLink>
        </View>

        <View className="py-1 self-center"><OLink href="/recipes" className="btn-nav">Recipes</OLink></View>
        <View className="py-1 self-center"><OLink href="/collections" className="btn-nav">Collections</OLink></View>
        {(isAuthenticated) && (
          <View className={`flex flex-row gap-2`}>
            <View className="py-1 self-center"><OLink href="/meal-plans" className="btn-nav">Meal Plans</OLink></View>
            <View className="py-1 self-center"><OLink href="/shopping-list" className="btn-nav">Shopping List</OLink></View>
          </View>
        )}
        <View className="py-1 self-center"><OLink href="/chefs" className="btn-nav">Chefs</OLink></View>
        <View className="py-1 self-center"><OLink href="/news" className="btn-nav">News</OLink></View>

        <View className="flex-grow"/>

        {(!isAuthenticated) ? (
          <View className={`flex flex-row gap-2`}>
            <SignInButton/>
            <View className={`py-1 self-center`}><OLink href={`/join`} className={`btn-nav`}>Join</OLink></View>
          </View>
        ) : (
          <View className={`flex flex-row gap-2`}>
            <View className={`py-1 self-center`}><OLink href={`/account`} className={`btn-nav`}>Account</OLink></View>
            <SignOutButton/>
          </View>
        )}
      </View>
      <View className="bg-green-d flex flex-row sm:hidden gap-2 px-std py-1">
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
            <OLink href="/collections" className="btn btn-primary text-white">Collections</OLink>
            {(isAuthenticated) && (
              <View className="grid gap-std">
                <OLink href="/meal-plans" className="btn btn-primary text-white">Meal Plans</OLink>
                <OLink href="/shopping-list" className="btn btn-primary text-white">Shopping List</OLink>
              </View>
            )}
            <OLink href="/chefs" className="btn btn-primary text-white">Chefs</OLink>
            <OLink href="/news" className="btn btn-primary text-white">News</OLink>
            {(isAuthenticated) ? (
              <View className="grid gap-std">
                <OLink href={`/account`} className={`btn btn-primary text-white`}>Account</OLink>
                <SignOutButton className={`btn btn-primary text-white`}/>
              </View>
            ) : (
              <View className="grid gap-std">
                <SignInButton className={`btn btn-primary text-white`}/>
                <OLink href={`/join`} className={`btn btn-primary text-white`}>Join</OLink>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

export const Footer = () => {
  return (
    <View className="px-std py-sm border-t grid-3 gap-std relative bg-secondary nomobile">
      <View>
        <Text className={`font-serif h3`}>OurCookbook</Text>
        <OText>
          All recipes and images are CC-BY-SA 4.0 unless otherwise stated (except icons).
          <OLink target={`_blank`} href={`https://fontawesome.com`} className={`inline-link`}>Icons by FontAwesome</OLink>
        </OText>
      </View>
      <View>
        <Text className={`font-serif h3`}>Support</Text>
        <OLink href={`https://support.pixelset.dev/knowledgebase.php?category=7`} className={`link-inline`} target={`_blank`}>Articles and Guides</OLink>
        <OLink href={`https://support.pixelset.dev/index.php?a=add&amp;category=6`} className={`link-inline`} target={`_blank`}>Contact Support</OLink>
        <OLink href={`https://support.pixelset.dev/knowledgebase.php?article=19`} className={`link-inline`} target={`_blank`}>Community Guidelines</OLink>
      </View>
      <View>
        <Text className={`font-serif h3`}>Legal</Text>
        <OLink href={`https://pixelset.dev/legal/terms/?s=ourcookbook`} className={`link-inline`} target={`_blank`}>Terms and Conditions</OLink>
        <OLink href={`https://pixelset.dev/legal/privacy/?s=ourcookbook`} className={`link-inline`} target={`_blank`}>Privacy Policy</OLink>
        <OLink href={`https://pixelset.dev/legal/cookies/?s=ourcookbook`} className={`link-inline`} target={`_blank`}>Cookie Policy</OLink>
      </View>
    </View>
  )
}