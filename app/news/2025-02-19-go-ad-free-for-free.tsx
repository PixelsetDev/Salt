import "./../../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar, { Footer } from "../../components/Commons";
import { OText, OLink } from "../../components/Overrides"

export default function App() {
  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className="header">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Go Ad-free, for free!</Text>
          <OText className={`h3 text-white`}>19th February 2025</OText>
        </View>
      </View>

      <View className={`grid gap-lg p-std`}>
        <View className={`grid gap-std`}>
          <OText className={`font-bold`}>
            We&apos;re bringing Ad-free OurCookbook to everyone!
          </OText>

          <OText>
            Recently we introduced advertisements to our website to help fund further development and ongoing server
            costs. We&apos;ve decided to add a new feature that allows you to &apos;refer&apos; them, and you&apos;ll both
            get a week of ad-free cooking!
          </OText>

          <OText>
            You can refer as many people as you&apos;d like to get as many weeks as you want. Weeks do not stack, but
            referring someone person will reset the countdown for when your ad-free usage expires.
          </OText>
        </View>

        <View className={`grid gap-lg`}>
          <View className={`grid gap-std`}>
            <View className={`flex flex-row gap-2`}>
              <Text className={`h2 font-serif`}>Refer a Friend</Text>
              <View className={`flex gap-2`}>
                <View className={`flex-grow`}></View>
                <Text className={`chip-green`}>Out now</Text>
                <View className={`flex-grow`}></View>
              </View>
            </View>
            <OText>
              Every user has been given a unique 6-digit referral code, you can find yours here. If you have a friend
              tell them about us and give them your code, when they enter it into the first-login screen you&apos;ll
              both get ad-free access for a week!
            </OText>
            <OLink href={`https://support.pixelset.dev/knowledgebase.php?article=48`} className={`link-inline`}>
              Terms and Conditions apply, click here for more information.
            </OLink>
          </View>

          <View className={`grid gap-std`}>
            <View className={`flex flex-row gap-2`}>
              <Text className={`h2 font-serif`}>Welcome Gift</Text>
              <View className={`flex gap-2`}>
                <View className={`flex-grow`}></View>
                <Text className={`chip-green`}>Out now</Text>
                <View className={`flex-grow`}></View>
              </View>
            </View>
            <OText>
              All new members to OurCookbook will receive 1 week of Ad-free browsing. Simply create an account, or
              activate an existing Portal account on OurCookbook to get started!
            </OText>
            <OLink href={`https://support.pixelset.dev/knowledgebase.php?article=49`} className={`link-inline`}>
              New users only, Terms and Conditions apply, click here for more information.
            </OLink>
          </View>

          <View className={`grid gap-std`}>
            <View className={`flex flex-row gap-2`}>
              <Text className={`h2 font-serif`}>How do I go ad-free for longer?</Text>
              <View className={`flex gap-2`}>
                <View className={`flex-grow`}></View>
                <Text className={`chip-yellow`}>Coming soon</Text>
                <View className={`flex-grow`}></View>
              </View>
            </View>
            <OText>
              We&apos;re currently working on adding a monthly subscription which will remove advertisements. We&apos;ll
              update you when we have more information about this.
            </OText>
            <OText>
              Currently, we plan to price this at £0.99 GBP per month.
            </OText>
          </View>

          <View className={`grid gap-std`}>
            <Text className={`h2 font-serif`}>Why ads?</Text>
            <OText>
              Simply put, we need money! Servers cost money, domains cost money, it all costs money! We don&apos;t make
              much from ads, but every little helps! However, we value people more than anything, which is why
              we&apos;re running this promotion.
            </OText>
          </View>
        </View>

        <View className={`grid-3 gap-std`}>
          <OLink className={`text-center btn btn-secondary`} href={`/news/2024-09-19-20-amazon-gift-card-prize-draw`}>Previous Article</OLink>
          <OLink className={`text-center btn btn-secondary`} href={`/news`}>All News</OLink>
          <OLink className={`text-center btn btn-secondary`} href={`/news/2025-05-27-our-environmental-impact`}>Next Article</OLink>
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}
