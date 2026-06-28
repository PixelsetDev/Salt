import "./../../global.css"
import {Text, View, ScrollView} from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OText, OLink } from "../../components/Overrides"

export default function App() {
  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header">
        <View className="gap-std grid">
          <Text className="h1 font-serif text-white">
            Scalable Servings, Pictures galore, and more!
          </Text>
          <OText className={`h3 text-white`}>28th June 2026</OText>
        </View>
      </View>

      <View className={`gap-lg p-std grid`}>
        <OText>
          We&apos;ve been hard at work bringing some new features to OurCookbook, this update we
          wanted to focus on improving what we already have.
        </OText>

        <View className={`gap-std grid`}>
          <Text className={`h2 font-serif`}>Scalable Servings</Text>
          <OText>
            When an author uploads a recipe they are asked to provide an estimated number of
            servings that the recipe provides. With this data, we&apos;ve been able to add a new
            button on the recipe page that lets users scale the ingredient amounts in recipes to
            match the amount they actually need.
          </OText>
          <OText>
            For example, if a recipe lists 4 servings but a user only needs 2, they can now click
            &quot;Change&quot; next to the servings amount and reduce it to 2. This will
            automatically halve the amounts needed in ingredients, with no additional input required
            from recipe authors. This works for any amount, even going from even to odd numbers of
            servings.
          </OText>
        </View>

        <View className={`gap-std grid`}>
          <Text className={`h2 font-serif`}>Pictures, glorious Pictures!</Text>
          <OText>
            Since moving to our new system, image uploads were temporarily disabled. They&apos;re
            back! You can now upload images for your recipe. We&apos;ve also added the ability to
            upload images to reviews as well. Recipe authors can also choose a review image to be
            used as the recipe&apos;s main photo.
          </OText>
          <OText>
            But why stop at one picture? You can now upload multiple for each recipe. If your recipe
            has more than one image, they will be displayed in a &quot;gallery&quot; below the
            ingredients and steps.
          </OText>
          <OText>
            Thought we were done? Think again! You can also now upload pictures to posts on the
            social feed.
          </OText>
        </View>

        <View className={`gap-std grid`}>
          <Text className={`h2 font-serif`}>Homepage Redesign</Text>
          <OText>
            We have also given our homepage a slight redesign, with more focus being placed on the
            recipes currently trending on the site. The placement of these recipes are randomised,
            and one recipe is placed in the &quot;hero&quot; slot at the top of the screen which
            previously said &quot;Let&apos;s Cook with OurCookbook&quot;. Whilst this has been the
            site&apos;s hero text since we started, we figured it was time to give our authors the
            spotlight.
          </OText>
          <OText>
            Recipes on the homepage are from the &quot;Trending: This week&quot; collection, to be
            eligible for the hero slot on the website, recipes must contain an image. Speaking of
            images...
          </OText>
        </View>

        <View className={`gap-std grid`}>
          <Text className={`h2 font-serif`}>Social Feed gets a boost</Text>
          <OText>
            The social feed provided an automatically generated &quot;twitter&quot;-style feed for
            posts. Now, you can post whatever you want, whenever you want!
          </OText>
        </View>

        <View className={`gap-std grid`}>
          <Text className={`h2 font-serif`}>Dietary Information</Text>
          <OText>
            Dietary Icons now display in recipes as red, orange, or green depending on if the recipe
            contains ingredients that may have them. If dietary information is missing, any
            ingredients that are not already confirmed as including specific allergens or dietary
            preferences will be displayed as &quot;maybe including&quot; them. Dietary information
            is collected automatically by the ingredients system, and chefs do not need to add this
            information when creating recipes.
          </OText>
          <OText>
            We&apos;ve now added most of the dietary information to ingredients, so search filters
            should now work as expected. Remember to check the information on the ingredient's own
            packaging as our dietary information is only for guidance and may be incorrect.
          </OText>
        </View>

        <View className={`gap-std grid`}>
          <Text className={`h2 font-serif`}>Everything else</Text>
          <OText>
            We&apos;ve added a new report button in the footer of our website, so you can now report
            content on any page for moderation. If your content receives a moderation action, you
            will receives a notification informing you of this action. You can also appeal any
            moderation decisions from the notification.
          </OText>
          <OText>
            OurCookbook is also now available on ourcookbook.co.uk, ourcookbook.uk, and
            ourcookbook.net, we&apos;re slowly expanding across the cookbook internet!
            ourcookbook.org will remain our primary domain, the others will redirect here.
          </OText>
          <OText>
            We have completed improvements to our API to make it more stable, which should hopefully
            reduce errors on our website.
          </OText>
          <OText>
            Finally, the Collections page will now display the first recipe&apos;s picture.
          </OText>
        </View>

        <View className={`gap-std grid`}>
          <Text className={`h2 font-serif`}>What next?</Text>
          <OText>
            We are continuing to bring new features and improve existing ones, our upcoming plans
            include improving the mobile website&apos;s user experience, and bringing an Android
            App to the Google Play store. We&apos;ll post an update on ourcookbook.org when we have
            any news about those.
          </OText>
        </View>

        <View className={`grid-3 gap-std`}>
          <OLink
            className={`btn btn-secondary text-center`}
            href={`/news/2026-03-07-spice-up-ya-life`}>
            Previous Article
          </OLink>
          <OLink className={`btn btn-secondary text-center`} href={`/news`}>
            All News
          </OLink>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
