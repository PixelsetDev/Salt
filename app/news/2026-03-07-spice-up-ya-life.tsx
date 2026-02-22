import "./../../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OText, OLink } from "../../components/Overrides"

export default function App() {
  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className="header">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Spice up ya life!</Text>
          <OText className={`h3 text-white`}>7th March 2026</OText>
        </View>
      </View>

      <View className={`grid gap-lg p-std`}>
        <OText>
          Welcome to Salt - our new UI. Powered by our revolutionary new Pepper server (see what
          we did there), we&apos;re ready to propel OurCookbook into a new era. We have been
          very busy, here&apos;s what we have been up to:
        </OText>

        <View className={`flex-row gap-sm flex-wrap`}>
          <OText className={`chip-green`}>Smart Search</OText>
          <OText className={`chip-green`}>Meal Plans</OText>
          <OText className={`chip-green`}>Shopping Lists</OText>
          <OText className={`chip-green`}>Recipe Categories</OText>
          <OText className={`chip-green`}>Dietary Information</OText>
          <OText className={`chip-green`}>Open Ingredients API</OText>
          <OText className={`chip-green`}>Profile Customisation</OText>
          <OText className={`chip-green`}>Private Collections</OText>
          <OText className={`chip-green`}>Annoying ads, goodbye!</OText>
          <OText className={`chip-green`}>Chef+</OText>
        </View>

        <View className={`grid gap-std`}>
          <Text className={`h2 font-serif`}>Search and Categorisation</Text>
          <OText>
            When we first made OurCookbook, it had a few recipes that were all simple dinner meals.
            That has since grown to include lunch sandwiches, a wide array of meals, and even
            margaritas! We figured that the existing search system could do with an overhaul, so we
            have introduced categories to OurCookbook.
          </OText>
          <OText>
            Searching is now easier than ever, you can search everything or narrow down to specific
            meal types such as Desserts, or how about going even deeper to Cakes? You can do that
            too! You can also search for meals that are gluten free, or nut free, or meat free, or
            free of many more common allergens, intolerances, or meat free!
          </OText>
          <OText>
            Pepper's new Smart Search system is fantastic, and can really help you to find meals
            that work for you. Whilst we don&apos;t have the biggest selection right now, we hope
            that this helps as we continue to grow.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Meal Plans</Text>
            <Text className={`chip-yellow self-center`}>Chef+</Text>
          </View>
          <Text className={`txt-subtle`}>
            Some parts of this feature require a Chef+ subscription.
          </Text>
          <OText>
            With Chef+, you can export your meal plans as a shopping list, getting every ingredient
            you need to make your food shop a breeze!
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Shopping Lists</Text>
            <Text className={`chip-yellow self-center`}>Chef+</Text>
          </View>
          <Text className={`txt-subtle`}>
            Some parts of this feature require a Chef+ subscription.
          </Text>
          <OText>
            With Chef+, you can export your shopping lists into other formats including PDFs.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <Text className={`h2 font-serif`}>Ingredients, Allergens, and Dietary Requirements</Text>
          <OText>
            One of the biggest complaints we received was how long it took to upload new recipes,
            and with the new categorisation step we figured it would be a good idea to try and cut
            a step out. We also received feedback that the most painful step was the dietary
            information step, as many recipe creators didn&apos;t know the answer and were worried
            that they would provide incorrect dietary advice.
          </OText>
          <OText>
            That led us down a path to figure out the best way to resolve this, and after a few
            months of work it resulted in the creation of a database of over 600 ingredients,
            which we call the Open Ingredients API.
          </OText>
          <OText>
            Using this API, which is powered by our new Pepper server, we&apos;re able to provide
            dietary information for hundreds (and hopefully soon thousands) of ingredients across
            all of our recipes. We&apos;re also able to provide localisation of ingredient names
            (no more eggplant vs aubergine, we&apos;ll show you whichever is local to you!)
          </OText>
          <OText>
            The best part is, this actually takes less work than the previous system, since we load
            in all the dietary information in the background, we&apos;re able to provide readers
            with an allergen overview and filter for dietary requirements (such as vegan and
            vegetarian) automatically!
          </OText>
          <OText>
            This system is new and is still being rolled out, so some recipes may not have dietary
            information fully available just yet. We hope to have more dietary information over the
            coming weeks. It is also important to always check the labels of packing, this is just
            guidance and may be incorrect.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Profile Customisation</Text>
            <Text className={`chip-yellow self-center`}>Chef+</Text>
          </View>
          <Text className={`txt-subtle`}>
            Some of these features requires a Chef+ subscription.
          </Text>
          <OText>
            We&apos;re expanding how you can make your profile look by adding bios and the ability
            to add links to your other social media accounts.
          </OText>
          <OText>
            With Chef+, you&apos;ll also be able to change the background image used on your profile
            page!
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <Text className={`h2 font-serif`}>Goodbye saved recipes, hello private collections!</Text>
          <OText>
            You could previously save recipes to a &quot;reading list&quot; style folder in OurCookbook,
            almost like a playlist of recipes. These were private to you and could not be shared
            with others. On the other hand we also had collections, which were basically the same
            thing but public and curated by us.
          </OText>
          <OText>
            We thought it was silly to have both, so now we don&apos;t! We&apos;ve merged them
            together, all of your existing saved recipe folders are now Collections (we have set
            them to private by default, you can chose to make them public if you&apos;d like), and
            you can find them in the Collections tab from now on. They work in the exact same way,
            but you can now share them publicly, with friends, or via a direct unlisted link.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <Text className={`h2 font-serif`}>Going smoooooooth</Text>
          <OText>
            A while back we announced that we were moving to a new API system that would speed up
            our website a lot, it was fantastic and did exactly what we wanted but it didn&apos;t
            quite cover everything due to limitations in our old server implementation. Well we have
            fixed that, and increased our API endpoint count from 17 to almost 50, meaning more
            pages will load faster than before!
          </OText>
          <OText>
            This also means that features such as search will be more responsive and flexible,
            allowing us to implement new ideas faster than ever before!
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <Text className={`h2 font-serif`}>About those ads...</Text>
          <OText>
            Wow were they annoying. We&apos;ve toned down the ads, a lot. Shockingly, our developers
            used ad blockers, so were unaware. We&apos;re sorry!
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Chef+</Text>
            <Text className={`chip-red self-center`}>Coming soon</Text>
          </View>
          <OText>
            We previously had a 99p a month subscription to make OurCookbook ad-free, we have
            decided to expand the subscription and add a bunch of new features, making the new Chef+
          </OText>
          <OText>
            Chef+ supports the development of OurCookbook and allows us to release new and exciting
            features with your love! All of the main features of OurCookbook will always be free,
            but Chef+ will unlock additional functionality within them. For example, with Chef+
            you can export your meal plan as a shopping list, but without it you can still use them
            both separately. You will also get a profile badge which allows you to show off your
            support for OurCookbook.
          </OText>
          <OText>
            As we&apos;re adding new features, we will be revisiting the price, increasing it by
            50p to £1.49 a month, which is still a bargain!
          </OText>
          <OText>
            Chef+ is coming soon, for now we&apos;re giving everyone free Chef+ access as a welcome
            gift to our new website experience!
          </OText>
        </View>

        <View className={`grid-3 gap-std`}>
          <OLink className={`text-center btn btn-secondary`} href={`/news/2025-05-27-our-second-yearly-update`}>Previous Article</OLink>
          <OLink className={`text-center btn btn-secondary`} href={`/news`}>All News</OLink>
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}
