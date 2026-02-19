import { Text, View } from 'react-native';
import { useState } from "react";
import { OLink, OPressable, OText } from "./Overrides";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SignOutButton, SignInButton } from './Auth';
import { useAuthenticatedFetch } from '../utils/api';

export const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const authFetch = useAuthenticatedFetch();

  const loadRecipes = async () => {
    const res = await authFetch(
      'https://api.ourcookbook.org/recipes'
    );

    const data = await res.json();
  };

  return(
    <View>
      <View className="bg-red-800 flex flex-row gap-2 px-std py-1">
        <Text className={`text-white text-xs`}>
          You&apos;re on our BETA website, it&apos;s under active development and is likely to behave unexpectedly.
          Please report any bugs, crashes, or issues to ocb-app-issues@pixelset.dev
        </Text>
      </View>
      <View className="bg-green-d sm:flex hidden flex-row gap-2 px-std">
        <OLink href="/" className="link-nav font-serif">OurCookbook</OLink>

        <View className="flex-grow"/>

        {(!authenticated) ? (
          <View className={`flex flex-row gap-2 pt-1`}>
            <SignInButton className={`link-nav`}/>
            <OLink href={`/join`} className={`link-nav`}>Join</OLink>
          </View>
        ) : (
          <View className={`flex flex-row gap-2 pt-1`}>
            <OLink href={`/account`} className={`link-nav`}>Account</OLink>
            <SignOutButton className={`link-nav`}/>
          </View>
        )}
      </View>
      <View className="bg-white sm:flex hidden flex-row px-std">
        <OLink href="/recipes" className="btn-nav">Recipes</OLink>
        <OLink href="/collections" className="btn-nav">Collections</OLink>
        {(authenticated) && (
          <View className={`flex flex-row`}>
            <OLink href="/meal-plans" className="btn-nav">Meal Plans</OLink>
            <OLink href="/shopping-list" className="btn-nav">Shopping List</OLink>
          </View>
        )}
        <OLink href="/chefs" className="btn-nav">Chefs</OLink>
        <OLink href="/news" className="btn-nav">News</OLink>

        <View className="flex-grow"/>

        <OLink href="/recipes" className="btn-nav">Search</OLink>
      </View>
      <View className="bg-green-d flex flex-row sm:hidden gap-2 px-std py-1">
        <OLink href="/" className="btn-nav-active font-serif">OurCookbook</OLink>
        <View className="flex-grow"/>
        <OPressable onPress={() => setVisible((prev) => !prev)} className="btn-nav">
          <FontAwesome6 name="bars" size={16} color="white" />
        </OPressable>
      </View>
      {visible && (
        <View className="p-4 bg-gray-200 rounded">
          <View className="grid gap-std p-std">
            <OLink href="/recipes" className="btn btn-primary text-white">Recipes</OLink>
            <OLink href="/collections" className="btn btn-primary text-white">Collections</OLink>
            {(authenticated) && (
              <View className="grid gap-std">
                <OLink href="/meal-plans" className="btn btn-primary text-white">Meal Plans</OLink>
                <OLink href="/shopping-list" className="btn btn-primary text-white">Shopping List</OLink>
              </View>
            )}
            <OLink href="/chefs" className="btn btn-primary text-white">Chefs</OLink>
            <OLink href="/news" className="btn btn-primary text-white">News</OLink>
            {(authenticated) ? (
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