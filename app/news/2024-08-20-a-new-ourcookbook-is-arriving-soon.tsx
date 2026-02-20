import "./../../global.css"
import {Text, View, ScrollView} from "react-native";
import { OText, OLink } from '../../components/Overrides';
import { Footer, Navbar } from '../../components/Commons';

export default function App() {
  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className="header">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">A new OurCookbook is coming soon.</Text>
          <OText className={`h3 text-white`}>20th August 2024</OText>
        </View>
      </View>

      <View className={`grid gap-lg p-std`}>
        <OText>
          We&apos;re super excited to announce that we&apos;re working on a whole host of improvements to OurCookbook,
          and you can try them today!
        </OText>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h2 font-serif`}>The new OurCookbook Website</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-green`}>Out now</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            We&apos;re currently working on a redesigned, faster, and more improved OurCookbook website. The new site
            will have a revised user experience, it&apos;ll be faster, smoother, and all round better.
          </OText>
          <OText>
            The current website is fine, but it has a number of visual inaccuracies. Some buttons look different, the
            padding and text sizing is all over the place, and certain elements exist in some places but not in others.
            We decided that this needed fixing, but thought we could take it one step further.
          </OText>
          <OText>
            The codebase for OurCookbook is currently a mishmash of different programming languages, with some pages
            being asynchronous (meaning certain bits of the website can load after the main content appears) and some
            aren&apos;t. We&apos;re working on fixing this too by rewriting the website from scratch with a brand new
            public API. We&apos;ll release documentation for this soon.
          </OText>
          <OText>
            The new website also has better error handling and recovery, as well as being more stable and faster
            overall. We&apos;ve achieved this be eliminating unnecessary calls to functions that we used before.
            We&apos;re still working on it, so some features are missing, but if you&apos;d like to you can try it out
            today at beta.ourcookbook.org
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h2 font-serif`}>New Recipe Editor</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-green`}>Out now</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            Creating a recipe isn&apos;t the easiest task, there&apos;s a whole page full of stuff to fill in -
            I&apos;ve personally finding myself taking way too long checking if everything is correct, so we&apos;re
            planning to split it up.
          </OText>
          <OText>
            Your recipe and ingredients will remain where they are, but we&apos;re moving some things around to make it
            a more seamless experience. You&apos;ll also (finally!) be able to upload pictures on the editing page
            instead of having to first save, then go back to your profile to upload an image.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Saved Recipes</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-green`}>Out now</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            Previously, if you liked a recipe, it would just contribute to it&apos;s rating. Now, your liked recipes are
            saved in a folder so you can come back to them later. You can also create your own folders to organise
            specific recipes.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Difficulty Scale</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-green`}>Out now</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            We wanted to add a way to mark how easy it is to cook a recipe, and we thought a difficulty scale would be
            perfect! You can now mark how difficult it is to cook your recipe so that others can make decisions based on
            their culinary skill.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h2 font-serif`}>From Ratings to Reviews</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-green`}>Out now</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            We love our rating system, but we thought it could do with an extra thing or two, so we&apos;re moving from
            ratings to reviews! You can now leave a comment alongside your review (previously rating) which will appear
            at the bottom of the recipe.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h2 font-serif`}>OurCookbook Android App
            </Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-red`}>Late 2025</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            We love our rating system, but we thought it could do with an extra thing or two, so we&apos;re moving from
            ratings to reviews! You can now leave a comment alongside your review (previously rating) which will appear
            at the bottom of the recipe.
          </OText>
          <OText>
            Unfortunately due to the high costs associated with developing an app for iOS devices, we&apos;re not yet
            planning to release one but are considering this for the future. iOS users will be able to add our website
            to their home screen as an app, but it may not always work offline.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Improved Account Support
            </Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-red`}>Late 2025</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            Currently, to manage your account you need to go to Portal&apos;s website. We&apos;re working with Portal to
            bring this functionality straight to OurCookbook! Soon, you&apos;ll be able to change certain bits of your
            profile directly on your account page here. Don&apos;t worry, we&apos;re still supporting Portal Account
            Data and you&apos;ll still be able to manage your account there if you&apos;d prefer.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Community Gallery
            </Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-red`}>Late 2025</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            We know that sometimes you&apos;ll see a picture for a recipe that won&apos;t quite turn out how you
            expected, or that sometimes there&apos;s no picture at all. We&apos;re working on adding a new Communiy
            Gallery feature that will allow anyone to upload pictures to any recipe. Any images uploaded can be selected
            by the author to be that recipe&apos;s main image.
          </OText>
          <OText>
            With more content comes more responsibility. We&apos;re making it easier to report content that may be
            inappropriate for our website. Thankfully we&apos;ve never had a case of this, but having the tools on-site
            rather than at our support centre will make it easier to remove bad content faster.
          </OText>
        </View>

        <View className={`grid-3 gap-std`}>
          <View></View>
          <OLink className={`text-center btn btn-secondary`} href={`/news`}>All News</OLink>
          <OLink className={`text-center btn btn-secondary`} href={`/news/2024-09-19-20-amazon-gift-card-prize-draw`}>Next Article</OLink>
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}
