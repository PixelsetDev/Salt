/* This file is not licensed under the Apache License 2.0. Copyright Pixelset. All rights reserved. */

import "./../../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OLink, OText } from '../../components/Overrides';
import { InfoBox, WarningBox} from "../../components/Boxes.tsx";
import { BulletItem, List } from '../../components/Lists.tsx';
import { Row, Table } from '../../components/Table.tsx';

export default function App() {

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="gap-std grid">
          <Text className="h1 font-serif text-white">Cookie Policy</Text>
        </View>
      </View>
      <View>
        <View className="p-std gap-lg grid">
          <WarningBox
            message={
              'This Cookie Policy comes into force on 27th July 2026. Until that date, the current Cookie Policy available at https://pixelset.dev/legal/cookies/?s=ourcookbook apply.'
            }></WarningBox>
          <InfoBox message={'Last updated 27 June 2026. Takes effect on 27 July 2026.'}></InfoBox>
          <View className="gap-sm grid">
            <OText>
              This policy explains what cookies OurCookbook (ourcookbook.org) uses, why, and what
              your options are. It should be read alongside our{' '}
              <OLink href="/policies/privacy-policy" className="link-inline">
                Privacy Policy
              </OLink>
              .
            </OText>
          </View>

          <View className="gap-sm grid">
            <Text className="h2 font-serif">1. What Are Cookies</Text>
            <OText>
              Cookies are small text files placed on your device by websites you visit. They are
              widely used to make websites work, remember your preferences, and provide information
              to site owners.
            </OText>
            <OText>
              OurCookbook uses a very small number of cookies. We do not use advertising cookies,
              tracking cookies, or any cookies that follow you across other websites.
            </OText>
          </View>

          <View className="gap-sm grid">
            <Text className="h2 font-serif">2. Cookies We Use</Text>
            <OText>
              All cookies on OurCookbook are strictly necessary for security purposes and are set
              by Cloudflare, our infrastructure and security provider. We do not set any cookies
              ourselves.
            </OText>
            <Table headers={['Cookie', 'Set by', 'Purpose', 'Duration']}>
              <Row cells={['cf_clearance', 'Cloudflare', 'Stores confirmation that you have passed a Cloudflare security challenge, so you are not asked to repeat it on every request.', '30 minutes (default)']} />
            </Table>
            <OText>
              For full details on how Cloudflare uses cookies, see their{' '}
              <OLink href="https://www.cloudflare.com/privacypolicy/" className="link-inline">
                Privacy Policy
              </OLink>
              .
            </OText>
          </View>

          <View className="gap-sm grid">
            <Text className="h2 font-serif">3. What We Don&apos;t Use</Text>
            <OText>We do not use:</OText>
            <List>
              <BulletItem>Advertising or targeting cookies.</BulletItem>
              <BulletItem>Analytics cookies (our analytics tool, Cloudflare RUM, does not use cookies).</BulletItem>
              <BulletItem>Social media cookies.</BulletItem>
              <BulletItem>Any cookies that track you across other websites.</BulletItem>
            </List>
          </View>

          <View className="gap-sm grid">
            <Text className="h2 font-serif">4. Local Storage</Text>
            <OText>
              In addition to cookies, we use your browser&apos;s local storage to hold your
              authentication tokens and session data. This is not a cookie - it is stored on your
              device and is not sent to our servers with every request. It is shared with Portal,
              our single sign-on system, to keep you logged in across Pixelset services.
            </OText>
            <OText>
              You can clear local storage at any time through your browser settings, though doing
              so will log you out of OurCookbook.
            </OText>
          </View>

          <View className="gap-sm grid">
            <Text className="h2 font-serif">5. Do I Need to Consent?</Text>
            <OText>
              The only cookie we use (cf_clearance) is strictly necessary for the security of the
              platform. Under UK PECR (Privacy and Electronic Communications Regulations), strictly
              necessary cookies do not require consent. We therefore do not show a cookie consent
              banner.
            </OText>
            <OText>
              If you would like to verify this or have any concerns, please contact us at
              support@pixelset.dev.
            </OText>
          </View>

          <View className="gap-sm grid">
            <Text className="h2 font-serif">6. Managing Cookies</Text>
            <OText>
              You can control and delete cookies through your browser settings. Be aware that
              blocking the cf_clearance cookie may prevent OurCookbook from loading correctly, as
              it is required to pass Cloudflare&apos;s security checks.
            </OText>
            <OText>
              For guidance on managing cookies in your browser, visit{' '}
              <OLink href="https://www.aboutcookies.org" className="link-inline">
                aboutcookies.org
              </OLink>
              .
            </OText>
          </View>

          <View className="gap-sm grid">
            <Text className="h2 font-serif">7. Changes to This Policy</Text>
            <OText>
              We may update this policy from time to time, for example if we add new features that
              use cookies. The date at the top of this page shows when it was last updated.
            </OText>
          </View>

          <View className="gap-sm grid">
            <Text className="h2 font-serif">8. Contact</Text>
            <OText>
              If you have any questions about this policy, please contact us at
              support@pixelset.dev.
            </OText>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
