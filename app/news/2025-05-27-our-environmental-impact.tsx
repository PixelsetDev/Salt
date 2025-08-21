import "./../../global.css"
import {Text, View, ScrollView} from "react-native";
import { Footer, Navbar } from '../../components/Commons';
import { OText, OLink } from "../../components/Overrides"

export default function App() {
  return (
    <ScrollView>
      <Navbar/>
      <View className="header">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Our Environmental Impact</Text>
          <OText className={`h3 text-white`}>27th May 2025</OText>
        </View>
      </View>

      <View className={`grid gap-lg p-std`}>
        <View className={`grid gap-std`}>
          <OText>
            When we first started OurCookbook, our website had an <OText className={`font-bold`}>F</OText> rating for
            energy use and carbon emissions, releasing <OText className={`font-bold`}>213.24kg CO2e per 10,000 views</OText>,
            and using <OText className={`font-bold`}>556 kWh electricity per 10,000 views</OText>. That, to us, was not an
            acceptable position to be in.
          </OText>
          <OText>
            After one month of work, we bumped our rating up to <OText className={`font-bold`}>C</OText>, reduced our
            CO2e/kg per 10,000 views to <OText className={`font-bold`}>41.26kg</OText>, and reduced our electricity usage
            to <OText className={`font-bold`}>108 kWh per 10,000 views</OText>. We achieved this by ensuring that content
            served was the correct size for its purpose, compressed, and cached properly. The main change we made was
            optimising images across the site. We&apos;re proud of what we&apos;ve done so far, but we want to do more.
          </OText>
          <OText>
            We&apos;re making tweaks to systems, upgrading your experience and the experience of our planet alongside all
            other Pixelset websites and services. We&apos;re committed to bringing OurCookbook&apos;s environmental rating
            up to A. Through our parent project Pixelset, we&apos;re making changes and reducing our environmental impact.
            You can track our progress by clicking the link below.
          </OText>
          <OText>
            <OText className={`font-bold`}>Update:</OText> as of July 2025, we&apos;ve got our rating from F to C -
            it&apos;s great progress but we&apos;re not there yet!
          </OText>
          <OLink className={`text-center btn btn-primary`} href={`https://pixelset.dev/environment/`} target={`_blank`}>
            Learn more about our environmental impact
          </OLink>
        </View>

        <View className={`grid-3 gap-std`}>
          <OLink className={`text-center btn btn-secondary`} href={`/news/2025-02-19-go-ad-free-for-free`}>Previous Article</OLink>
          <OLink className={`text-center btn btn-secondary`} href={`/news`}>All News</OLink>
          <OLink className={`text-center btn btn-secondary`} href={`/news/2025-08-07-our-second-yearly-update`}>Next Article</OLink>
        </View>
      </View>
      <Footer/>
    </ScrollView>
  );
}
