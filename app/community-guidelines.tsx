/* This file is not licensed under the Apache License 2.0. Copyright Pixelset. All rights reserved. */

import "./../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../components/Commons';
import { OText } from '../components/Overrides';
import {WarningBox} from "../components/Boxes.tsx";

export default function App() {

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="gap-std grid">
          <Text className="h1 font-serif text-white">Community Guidelines</Text>
        </View>
      </View>
      <View>
        <View className="p-std gap-lg grid">
          <WarningBox
            message={
              'These community guidelines come into force on 16th July 2026. Until that date, the current Community Guidelines available at ourcookbook.org/old-guidelines apply.'
            }></WarningBox>
          <View className="gap-sm grid">
            <OText>
              By creating an account, posting, or otherwise contributing to OurCookbook, you agree
              to follow these Community Guidelines. These Guidelines apply to all content, features,
              and activity on OurCookbook, whether existing now or introduced in future, and
              regardless of content type, format, or visibility setting (public, friends-only,
              unlisted, or private).
            </OText>
            <OText>
              Private and unlisted content is subject to these Guidelines and may be reviewed by
              staff.
            </OText>
            <OText>
              The OurCookbook Terms of Service also apply to all users and visitors. Where there is
              any conflict between these Guidelines and the Terms of Service, the Terms of Service
              take precedence on legal matters, and these Guidelines take precedence on community
              standards and acceptable content.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Prohibited Content</Text>
            <OText>
              The following content is prohibited anywhere on OurCookbook, in any form, field,
              format, or feature, whether text, image, or otherwise:
            </OText>
            <View className="grid">
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Hate speech: content that promotes hatred, discrimination, or violence against
                  individuals or groups based on race, ethnicity, national origin, religion,
                  disability, sexual orientation, gender, gender identity, age, or any other
                  characteristic protected under UK law.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Sexual content: nudity, sexual acts, or sexually suggestive content of any kind.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Illegal content: content that facilitates, promotes, or depicts any illegal
                  activity including but not limited to content that threatens, promotes, glorifies,
                  or provides instructions for violence, terrorism, or criminal activity of any
                  kind.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Doxxing: sharing another person's private information without their consent.
                  Content listed as public on OurCookbook is considered public information and may
                  be shared.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Suicide and self-harm: content that promotes, instructs, or encourages suicide or
                  self-harm.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Dangerous activities and challenges: content promoting activities that pose a
                  serious risk of injury or harm.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Eating disorders and dangerous weight control: content promoting eating disorders,
                  dangerous rapid weight-loss methods, or the misuse of weight-loss or muscle-gain
                  substances.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Graphic content: content that is gratuitously violent, gory, or disturbing. This
                  does not include standard depictions of raw meat, fish, or food preparation that
                  would be expected in ordinary cooking content.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Animal abuse: content depicting or promoting cruelty to animals. This does not
                  include standard, lawful preparation of animal products for cooking.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>Misinformation: sharing false or misleading information.</OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Restricted goods: content promoting, advertising, or facilitating the sale of
                  gambling, tobacco, firearms, dangerous weapons, controlled substances, or other
                  illegal or age-restricted goods. This does not apply to alcohol used as a recipe
                  ingredient, subject to the conditions below.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Fraud, scams, and spam: fraudulent schemes, scams, phishing attempts, or spam
                  content.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Off-platform advertising and driving traffic elsewhere: advertising or promoting
                  websites, products, services, businesses, or causes not affiliated with
                  OurCookbook or Pixelset, or otherwise using the platform primarily to direct users
                  away from it. Advertisements or links to unrelated commercial services, affiliate
                  marketing links, or links to platforms primarily used for scraping or competing
                  services are not permitted. We do allow links to personal social media profiles or
                  websites showcasing your own cooking to be linked from your profile&apos;s links
                  field, provided the linked content itself complies with these Guidelines. We do
                  not allow such content elsewhere on the website.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Recruitment: recruitment of any kind, including for jobs, organisations,
                  multi-level marketing schemes, political movements, or other causes.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>Impersonation: impersonating another person, brand, or organisation.</OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Harassment: using any feature, including following, messaging, or commenting, to
                  harass, intimidate, or abuse other users.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  AI-generated content: content generated, modified, or synthesised by AI, including
                  but not limited to text written by AI writing assistants or large language models,
                  images or artwork generated or modified by AI image tools, and audio or video
                  generated or modified by AI.
                </OText>
              </View>
            </View>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Prohibited Individuals and Organisations</Text>
            <OText>
              The following are prohibited from holding an account or posting on OurCookbook:
            </OText>
            <View className="grid">
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Individuals, groups, or organisations that engage in or promote violence,
                  terrorism, hate, or criminal activity.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Individuals or organisations whose primary purpose is to advertise, recruit for,
                  or drive traffic to other platforms, services, businesses, or causes not
                  affiliated with OurCookbook or Pixelset.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Individuals or organisations attempting to scrape, harvest, or extract data from
                  OurCookbook for the purpose of training AI systems, building competing products,
                  or any other unauthorised purpose.
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  Anyone previously banned from OurCookbook, attempting to create a new account to
                  evade that ban. Where an account is banned for a serious or repeated violation of
                  these Guidelines, we reserve the right to also restrict that individual's access
                  to other websites and services owned and operated by Pixelset.
                </OText>
              </View>
            </View>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Recipes</Text>
            <OText>
              Recipes must be genuine. Recipes that are not real cooking instructions are not
              permitted.
            </OText>
            <OText>
              Recipes containing alcohol as an ingredient must clearly flag this by using the
              ingredients feature. Alcohol must not be promoted, advertised, or encouraged in any
              way beyond its function as a recipe ingredient, and we reserve the right to remove
              content that uses this exception to promote alcohol consumption, specific alcohol
              brands, or drinking culture more broadly.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Platform Manipulation</Text>
            <OText>
              Manipulating engagement through fake accounts, ratings/reviews manipulation,
              coordinated inauthentic behaviour, bot-driven activity, or similar is prohibited. We
              reserve the right to block users suspected of platform manipulation from OurCookbook
              and all other Pixelset websites and services.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Moderation and Reporting</Text>
            <OText>
              We moderate content across the platform and reserve the right to remove, restrict, or
              edit any content, and to suspend or terminate accounts, at any visibility level and
              without prior notice, where it violates these Guidelines. We may update these
              Guidelines from time to time. We will give at least 30 days&apos; notice of any
              changes via a notice on our website and by email. If you believe content or an account
              has been actioned in error, you may raise this in accordance with the &quot;Right to
              Challenge&quot; process set out in the Terms of Service.
            </OText>
            <OText>
              If you encounter content that violates these Guidelines, please use the report button
              available on the relevant content. If this isn't possible, you can also report it via
              https://support.pixelset.dev. Reports involving suspected illegal content will be
              handled in accordance with our legal obligations under the UK Online Safety Act 2023,
              as set out in the Terms of Service.
            </OText>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
