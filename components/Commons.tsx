import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { OLink, OPressable, OText } from './Overrides';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SignOutButton, SignInButton } from './auth/Auth';
import { useLogto } from '@logto/rn';
import { useUser } from './auth/UserProvider';
import { Helmet } from 'expo-router/vendor/react-helmet-async/lib';
import { WarningBox } from './Boxes.tsx';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { isAuthenticated } = useLogto();

  const { user } = useUser();

  const name = user?.name ?? 'Account';

  return (
    <View className={`dark:bg-black`}>
      <Helmet>
        <link rel={`preconnect`} href={`https://fonts.googleapis.com`} />
        <link rel={`preconnect`} href={`https://fonts.gstatic.com`} />
        <link
          href={`https://fonts.googleapis.com/css2?family=Merriweather:opsz@18..144&family=Roboto:ital@0;1&display=swap`}
          rel={`stylesheet`}
        />
      </Helmet>
      <View className={`px-std flex flex-row gap-2 bg-yellow-800 py-1`}>
        <Text className={`text-xs text-white`}>
          From 16th July 2026, our Terms and Conditions, Privacy Policy, and Community Guidelines are changing.
          For more information, visit <OLink href={"/new-terms"} className={"underline"}>ourcookbook.org/new-terms</OLink>.
        </Text>
      </View>
      <View className={`px-std flex flex-row gap-2 bg-red-800 py-1`}>
        <Text className={`text-xs text-white`}>
          You&apos;re on our BETA website, it&apos;s under active development and is likely to
          behave unexpectedly. Please report any bugs, crashes, or issues to
          ocb-app-issues@pixelset.dev
        </Text>
      </View>
      <View className={`bg-green-d px-std hidden flex-row gap-2 sm:flex`}>
        <OLink href={`/`} className={`link-nav font-serif py-1`}>
          OurCookbook
        </OLink>

        <View className={`flex-grow`} />

        {!isAuthenticated ? (
          <View className={`flex flex-row gap-2 py-1`}>
            <SignInButton className={`link-nav`} />
            <OLink href={`/join`} className={`link-nav`}>
              Join
            </OLink>
          </View>
        ) : (
          <View className={`flex flex-row gap-2 py-1`}>
            <OLink href={`/new`}>
              <FontAwesome6 name={"plus"} className={`btn-sm btn-primary`}/>
            </OLink>
            <OLink href={`/account`} className={`link-nav`}>
              {name}
            </OLink>
            <SignOutButton className={`link-nav`} />
          </View>
        )}
      </View>
      <View className={`px-std hidden flex-row bg-white sm:flex dark:bg-neutral-900 dark:text-white`}>
        <OLink href={`/recipes`} className={`btn-nav`}>
          Recipes
        </OLink>
        <OLink href={`/collections`} className={`btn-nav`}>
          Collections
        </OLink>
        {isAuthenticated && (
          <>
            <OLink href={`/meal-plans`} className={`btn-nav`}>
              Meal Plans
            </OLink>
            <OLink href={`/shopping-lists`} className={`btn-nav`}>
              Shopping Lists
            </OLink>
          </>
        )}
        <OLink href={`/chefs`} className={`btn-nav`}>
          Chefs
        </OLink>
        <OLink href={`/ingredients`} className={`btn-nav`}>
          Ingredients
        </OLink>
        <OLink href={`/news`} className={`btn-nav`}>
          News
        </OLink>

        <View className={`flex-grow`} />

        <OLink href={`/recipes`} className={`btn-nav`}>
          Search
        </OLink>
      </View>
      <View className={`bg-green-d px-std flex flex-row gap-2 py-1 sm:hidden`}>
        <OLink href={`/`} className={`link-nav font-serif`}>
          OurCookbook
        </OLink>
        <View className={`flex-grow`} />
        <OPressable onPress={() => setVisible((prev) => !prev)} className={`btn-nav`}>
          <FontAwesome6 name={`bars`} size={16} color={`white`} />
        </OPressable>
      </View>
      {visible && (
        <View className={`rounded bg-gray-200 p-2`}>
          <View className={`gap-2 grid`}>
            {isAuthenticated && (
              <OLink href={`/`} className={`btn btn-primary text-white`}>
                Feed
              </OLink>
            )}
            <OLink href={`/recipes`} className={`btn btn-primary text-white`}>
              Recipes
            </OLink>
            <OLink href={`/collections`} className={`btn btn-primary text-white`}>
              Collections
            </OLink>
            {isAuthenticated && (
              <>
                <OLink href={`/meal-plans`} className={`btn btn-primary text-white`}>
                  Meal Plans
                </OLink>
                <OLink href={`/shopping-lists`} className={`btn btn-primary text-white`}>
                  Shopping Lists
                </OLink>
              </>
            )}
            <OLink href={`/chefs`} className={`btn btn-primary text-white`}>
              Chefs
            </OLink>
            <OLink href={`/ingredients`} className={`btn btn-primary text-white`}>
              Ingredients
            </OLink>
            <OLink href={`/news`} className={`btn btn-primary text-white`}>
              News
            </OLink>
            {isAuthenticated ? (
              <View className={`gap-sm grid`}>
                <OLink href={`/@${user?.username}`} className={`btn btn-primary text-white`}>
                  {name}
                </OLink>
                <SignOutButton className={`btn btn-primary text-white`} />
              </View>
            ) : (
              <View className={`gap-sm grid`}>
                <SignInButton className={`btn btn-primary text-white`} />
                <OLink href={`/join`} className={`btn btn-primary text-white`}>
                  Join
                </OLink>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
export default Navbar

export const Footer = () => {
  return (
    <View className={`px-std py-sm border-t grid-3 gap-std bg-secondary`}>
      <View>
        <Text className={`font-serif h3`}>OurCookbook</Text>
        <OText>
          All recipes and images are CC-BY-SA 4.0 unless otherwise stated (except icons).
          <OLink target={`_blank`} href={`https://fontawesome.com`} className={`inline-link`}>Icons by FontAwesome</OLink>
        </OText>
      </View>
      <View>
        <Text className={`font-serif h3`}>Support</Text>
        <OLink href={`/service-status`} className={`link-inline`} target={`_blank`}>Service Status</OLink>
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