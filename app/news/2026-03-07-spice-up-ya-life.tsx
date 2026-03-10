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
          <Text className={`chip-green txt-xl`}>Salt and Pepper</Text>
          <Text className={`chip-green txt-xl`}>Smart Search</Text>
          <Text className={`chip-green txt-xl`}>Meal Plans</Text>
          <Text className={`chip-green txt-xl`}>Shopping Lists</Text>
          <Text className={`chip-green txt-xl`}>Recipe Categories</Text>
          <Text className={`chip-green txt-xl`}>Dietary Information</Text>
          <Text className={`chip-green txt-xl`}>Open Ingredients API</Text>
          <Text className={`chip-green txt-xl`}>New Chef&apos;s Feed</Text>
          <Text className={`chip-green txt-xl`}>Profile Customisation</Text>
          <Text className={`chip-green txt-xl`}>Private Collections</Text>
          <Text className={`chip-green txt-xl`}>More Badges</Text>
          <Text className={`chip-green txt-xl`}>Annoying ads, goodbye!</Text>
          <Text className={`chip-green txt-xl`}>Chef+</Text>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Salt and Pepper</Text>
            <Text className={`chip-green self-center`}>Out now!</Text>
          </View>
          <OText>
            You&apos;ve probably heard us waffling on about those two seasonings for a while now and
            thought &quot;what on earth are they talking about?&quot;. Salt and Pepper are the names
            of our new frontend (what you see) and backend (what you don&apos;t see) services.
          </OText>
          <OText>
            Salt is the frontend - that is what you are looking at now! It is the website and soon
            to be app. We&apos;ve made significant upgrades in terms of visuals, accessibility, and
            functionality. Making it easier to use than ever before.
          </OText>
          <OText>
            Pepper is the server that powers OurCookbook - and wow has it been improved! The server
            now runs faster than ever before, hosting a database with thousands of rows of data
            which it is capable of querying in a matter of milliseconds! You will notice in this
            post the amount of features we have improved and added, it&apos;s all thanks to Pepper!
          </OText>
          <OText>
            Another benefit of the new server is redundancy and stability. You&apos;ll notice some
            features feeling smoother and more stable. For example, if you forget to save your
            recipe, you&apos;ll now only lose whatever you just did - previously you&apos;d lose it
            all! Pepper can now autosave data mid-use, meaning that if something goes wrong it&apos;
            pretty good at making it better again.
          </OText>
          <OText>
            The new Salt and Pepper digital experience is all-round improved, feeling smoother and
            more feature-rich than ever before! We&apos;re still making changes and would love to
            hear any feedback - we&apos;re also planning to Open Source our software soon, so keep
            an eye on our Git repository if you&apos;re interested.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Search and Categorisation</Text>
            <Text className={`chip-green self-center`}>Out now!</Text>
          </View>
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
            <Text className={`chip-green self-center`}>Out now!</Text>
            <Text className={`chip-yellow self-center`}>Some features require Chef+</Text>
          </View>
          <OText>
            You can now create Meal Plans on OurCookbook. Meal not on here? No problem - you can add
            non-OurCookbook meals too!
          </OText>
          <OText>
            You can export your meal plans to a Shopping List, getting every ingredient you need to
            make your food shop a breeze!
          </OText>
          <Text className={`txt-xs txt-subtle`}>
            Chef+ required to export meal plans to shopping lists.
          </Text>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>New Chef&apos;s Feed</Text>
            <Text className={`chip-green self-center`}>Out now!</Text>
          </View>
          <OText>
            We have introduced a new Chef&apos;s feed so you can keep up-to-date with all things
            going on with your friends. To visit the feed, click the button in the navigation bar
            above.
          </OText>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Shopping Lists</Text>
            <Text className={`chip-green self-center`}>Out now!</Text>
            <Text className={`chip-yellow self-center`}>Some features require Chef+</Text>
          </View>
          <OText>
            You can now create shopping lists based on the ingredients found in recipes on
            OurCookbook! Simply select the recipes you&apos;d like to buy, or import a Meal Plan to
            get started!
          </OText>
          <OText>
            You&apos;ll soon also be able to export shopping lists to text, PDF, and other formats!
          </OText>
          <Text className={`txt-xs txt-subtle`}>
            Chef+ required to import meal plans and export shopping lists to other formats.
          </Text>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Ingredients, Allergens, and Dietary Requirements</Text>
            <Text className={`chip-green self-center`}>Out now!</Text>
          </View>
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
            <Text className={`chip-red self-center`}>Coming Soon</Text>
            <Text className={`chip-yellow self-center`}>Some features require Chef+</Text>
          </View>
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
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Goodbye saved recipes, hello collections!</Text>
            <Text className={`chip-green self-center`}>Out now!</Text>
          </View>
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
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>Going smoooooooth</Text>
            <Text className={`chip-green self-center`}>Out now!</Text>
          </View>
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
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>More Badges</Text>
            <Text className={`chip-red self-center`}>Coming Soon</Text>
          </View>
          <OText>
            If you remember, some profiles had small tags below their names to say if they&apos;ve
            done cool stuff, for example our OG users had &quot;Early Contributor&quot; there.
            We&apos;ve since added more profile badges so even more people have the chance to earn
            them.
          </OText>
          <OText>
            New badges include awards for uploading a certain number of recipes, leaving a certain
            number of reviews, and more! Visit your profile for more information.
          </OText>
          <Text className="txt-xs txt-subtle">
            Profile badges may take some time to appear as our new Pepper server is still indexing
            past profile activity.
          </Text>
        </View>

        <View className={`grid gap-std`}>
          <View className={`flex-row gap-2`}>
            <Text className={`h2 font-serif`}>About those ads...</Text>
            <Text className={`chip-green self-center`}>Out now!</Text>
          </View>
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
