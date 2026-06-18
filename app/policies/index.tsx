/* This file is not licensed under the Apache License 2.0. Copyright Pixelset. All rights reserved. */

import "./../../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OLink, OText } from '../../components/Overrides';
import { InfoBox, WarningBox } from '../../components/Boxes.tsx';

export default function App() {

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="gap-std grid">
          <Text className="h1 font-serif text-white">
            OurCookbook Policies
          </Text>
        </View>
      </View>
      <View>
        <View className="p-std gap-lg grid">
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Our new policies</Text>
            <OText>
              We&apos;re updating our Community Guidelines, Terms and Conditions, Privacy Policy, and
              Cookie Policy to reflect the platform as it exists today. Since these documents were
              last written, OurCookbook has grown to include a number of new features, including
              collections, meal plans, shopping lists, an expanded profile page, a social feed,
              following, and a richer recipe format with structured ingredients and allergen
              information, and these updates ensure our policies properly cover how each of these
              features can be used. We&apos;ve also taken the opportunity to clarify and simplify our
              existing guidelines, align our policies with the UK Online Safety Act 2023, and address
              a few areas that needed tightening up. We&apos;d encourage all users to review the
              updated documents before they come into effect.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Community Guidelines</Text>
            <InfoBox message={`Our new Community Guidelines come into effect on 19th July 2026.`}/>
            <OText>
              Some key changes include exceptions for graphic content and animal-related content
              such as raw meat in food preparation, an no-exceptions ban on AI-generated content,
              tighter rules on platform manipulation with cross-platform bans for serious offenders,
              a formal way to challenge moderation decisions, rules related to new and upcoming
              features and privacy settings, and a proper reporting process via the report button or
              support site. Security-related clauses have moved to the Terms of Service, where they
              more naturally belong.
            </OText>
            <OText>
              Please use the buttons below to read the full updated Community Guidelines.
            </OText>
            <View className="gap-sm grid-2">
              <OLink className={`btn btn-primary`} href={'/policies/community-guidelines'}>
                Our new Community Guidelines, in effect from 19th July 2026
              </OLink>
              <OLink className={`btn btn-primary`} href={'/old-guidelines'}>
                Our existing Community Guidelines, in effect until 19th July 2026
              </OLink>
            </View>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Terms and Conditions</Text>
            <InfoBox message={`Our new Terms and Conditions replace our existing Terms of Use on 19th July 2026.`}/>
            <OText>
              Please use the buttons below to read the full updated Terms and Conditions.
            </OText>
            <View className="gap-sm grid-2">
              <OLink className={`btn btn-primary`} href={'/policies/terms-and-conditions'}>
                Our new Terms and Conditions, in effect from 19th July 2026
              </OLink>
              <OLink className={`btn btn-primary`} href={'https://pixelset.dev/legal/terms/?s=ourcookbook'}>
                Our existing Terms of Use, in effect until 19th July 2026
              </OLink>
            </View>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Privacy Policy</Text>
            <InfoBox message={`Our new Privacy Policy comes into effect on 19th July 2026.`}/>
            <OText>
              Please use the buttons below to read the full updated Privacy Policy.
            </OText>
            <View className="gap-sm grid-2">
              <OLink className={`btn btn-primary`} href={'/policies/privacy-policy'}>
                Our new Privacy Policy, in effect from 19th July 2026
              </OLink>
              <OLink className={`btn btn-primary`} href={'https://pixelset.dev/legal/privacy/?s=ourcookbook'}>
                Our existing Privacy Policy, in effect until 19th July 2026
              </OLink>
            </View>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Cookie Policy</Text>
            <InfoBox message={`Our new Cookie Policy comes into effect on 19th July 2026.`}/>
            <OText>
              Please use the buttons below to read the full updated Cookie Policy.
            </OText>
            <View className="gap-sm grid-2">
              <OLink className={`btn btn-primary`} href={'/policies/cookie-policy'}>
                Our new Cookie Policy, in effect from 19th July 2026
              </OLink>
              <OLink className={`btn btn-primary`} href={'https://pixelset.dev/legal/cookies/?s=ourcookbook'}>
                Our existing Cookie Policy, in effect until 19th July 2026
              </OLink>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
