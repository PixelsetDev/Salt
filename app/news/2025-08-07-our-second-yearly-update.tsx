import "./../../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar from "../../components/Navbar";
import { OText, OLink } from "../../components/Overrides"

export default function App() {
  return (
    <ScrollView>
      <Navbar></Navbar>
      <View className="header">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Our Second Yearly Update</Text>
          <OText className={`h3 text-white`}>7th August 2025</OText>
        </View>
      </View>

      <View className={`grid gap-lg p-std`}>
        <View className={`grid gap-std`}>
          <OText>
            In August 2024 we released a news article talking about the changes we&apos; made to the website, we also
            just so happen to have some more things to share just under a year later so we thought we&apos;d make this a
            yearly tradition! Each year starting now, we&apos;ll talk about how the last year went and everything that
            we&apos;re planning for the year ahead.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Recap on last year.</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <View className={`flex flex-row gap-2`}>
                <Text className={`chip-red`}>Part Mid-Late 2025</Text>
                <Text className={`chip-yellow`}>Part on BETA</Text>
              </View>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            We&apos;re still committed to bringing the features we announced last year including the community gallery
            and improved account support, we&apos;re committing to bringing these new features alongside the app and new
            technology upgrades we&apos;ll discuss later.
          </OText>
          <OText>
            We&apos;re continuing to work on the Android app. Originally planned for early 2025, we unfortunately hit a
            slight bump in the road. We wanted to work on a single codebase, the app and website united. This would make
            it much easier to maintain and build on our website, however a combination of trying and failing with other
            tools and an incredible workload increase in my education life meant that we passed the deadline with no app
            ready. We have now decided on a technology and are working on it, the app and new smooth website will be
            released around the same time, hopefully towards September/October.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <Text className={`h2 font-serif`}>What&apos;s coming this year?</Text>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h3 font-serif`}>Tweaks and Changes.</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <View className={`flex flex-row gap-2`}>
                <Text className={`chip-red`}>Part Mid-Late 2025</Text>
                <Text className={`chip-yellow`}>Part on BETA</Text>
              </View>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            Pixelset (our server overlords) have recently upgraded literally everything which means we have much more
            capacity to do a lot more cool stuff. As a part of the new Android App, we&apos;ve been given a
            great opportunity to take a look at our technology and move towards a better way of working. This is a great
            opportunity to better refine how everything looks and feels - you&apos;ll soon notice things looking much
            better and it will be a lot easier to use our website, plus things will load faster too! We hope to be able
            to bring this new experience to you soon.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h3 font-serif`}>Adding to Recipes.</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <View className={`flex flex-row gap-2`}>
                <Text className={`chip-red`}>Part Mid-Late 2025</Text>
                <Text className={`chip-yellow`}>Part on BETA</Text>
              </View>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            We&apos;re adding new recognition systems to the website. Soon, you won&apos;t have to say what the dietary
            info is on your recipes as we&apos;ll be able to automatically detect it. We will still ask you to confirm
            it just to make sure, but it&apos;s one less thing to do when making new recipes! Since we know what&apos;s
            in each ingredient, we can also display additional information such as protein, carbohydrates, calories, and
            more on each recipe. This means we can display more information about your recipe without asking you a
            single extra question (except &quot;is this correct?&quot;). We hope this will make adding new recipes a
            little bit easier. As a part of this, we&apos;ll be adding more dietary options such as allergies and low
            calorie meals in the search menu to help you find recipes fit for you.
          </OText>
          <OText>
            Finally, the dreaded recipe editor is being thrown out of the window. It&apos;s a legacy bit of software
            from the old website and we&apos;re finally bringing it in line with the new recipe creator and giving it
            the update it deserves.
          </OText>
          <OText>
            We&apos;ve also overhauled the recipe viewer, moving some bits around to make it easier to read on both web
            and mobile. We hope you like the new look! As part of the changes, we&apos;re also adding tips which chefs
            can leave for those looking to cook their recipes, little extra bits of information like &quot;watch the
            times carefully, it burns easily!&quot; for example. We hope this will help that slight more in cooking your
            meals.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h3 font-serif`}>Making search work.</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-yellow`}>Now on BETA</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            We&apos;ve also made changes to your search experience, we&apos;ve improved the search algorithm to give
            more accurate and reliable results, and added more filters based on the new intelligent features we&apos;re
            adding for chefs to also benefit our readers.
          </OText>
          <OText>
            Finally, we&apos;ll begin recommending similar recipes based on the ones you&apos;ve seen around the site.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h3 font-serif`}>Opening up collections.</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-red`}>Mid-Late 2025</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            Collections have previously been curated by us, and saved recipes could be sorted into folders by any users.
            We wanted to make these saved recipes folders shareable and decided that the existing collections system
            would be a fantastic way to do it! We&apos;re keeping our existing collections and will keep them featured
            at the top, but now you can create your own in public, private, or unlisted. Existing saved recipes folders
            will be turned into private collections when we move across.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h3 font-serif`}>Meal plans and shopping lists.</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-red`}>Mid-Late 2025</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            Alongside our amazing catalogue of recipes, we&apos;re adding meal plans and shopping lists. Both will allow
            you to add recipes on OurCookbook, or something else we don&apos;t have. Shopping lists will automatically
            populate if you add one of our recipes to it.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex flex-row gap-2`}>
            <Text className={`h3 font-serif`}>Goodbye social, hello Chef&apos;s Feed!.</Text>
            <View className={`flex gap-2`}>
              <View className={`flex-grow`}></View>
              <Text className={`chip-red`}>Mid-Late 2025</Text>
              <View className={`flex-grow`}></View>
            </View>
          </View>
          <OText>
            OurCookbook social was our attempt at bringing more interactivity to the website, but it didn&apos;t really
            ever kick off. We&apos;re changing social into the &quot;Chef&apos;s Feed&quot; which will not only include
            posts from other chefs like social did but also their activity, so you&apos;ll be able to see when someone
            you&apos;re following posts something new. We hope that this extended functionality will bring a new lease
            of life to our sadly unused social tab.
          </OText>
        </View>

        <View className={`grid-3 gap-std`}>
          <OLink className={`text-center btn btn-secondary`} href={`/news/2025-05-27-our-environmental-impact`}>Previous Article</OLink>
          <OLink className={`text-center btn btn-secondary`} href={`/news`}>All News</OLink>
        </View>
      </View>
    </ScrollView>
  );
}
