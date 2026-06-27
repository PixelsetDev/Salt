/* This file is not licensed under the Apache License 2.0. Copyright Pixelset. All rights reserved. */

import "./../../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OText, OLink } from '../../components/Overrides';
import { InfoBox, WarningBox } from '../../components/Boxes.tsx';
import { Table, Row } from '../../components/Table';
import { BulletItem, List } from '../../components/Lists.tsx';

export default function App() {

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="gap-std grid">
          <Text className="h1 font-serif text-white">Privacy Policy</Text>
        </View>
      </View>
      <View>
        <View className="p-std gap-lg grid">
          <WarningBox
            message={
              'This Privacy Policy comes into force on 27th July 2026. Until that date, the current Privacy Policy available at https://pixelset.dev/legal/privacy/?s=ourcookbook apply.'
            }></WarningBox>
          <InfoBox message={'Last updated 27 June 2026. Takes effect on 27 July 2026.'}></InfoBox>
          <View className="gap-sm grid">
              <OText>
                OurCookbook is a project operated by Pixelset. This policy explains what personal
                data we collect when you use OurCookbook (ourcookbook.org), why we collect it, and
                what your rights are.
              </OText>
              <OText>
                If you have any questions, please contact us at support@pixelset.dev.
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">1. Who We Are</Text>
              <OText>
                The data controller for OurCookbook is Pixelset. You can reach us at
                support@pixelset.dev.
              </OText>
              <OText>
                Pixelset is not a company, charity, or registered organisation - OurCookbook is a
                personal project. This policy reflects our obligations under the UK General Data
                Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">2. What Data We Collect and Why</Text>

              <Text className="h3 font-serif">2.1 Account Data (via Portal SSO)</Text>
              <OText>
                Accounts are handled by Portal, our single sign-on system, also operated by
                Pixelset. When you sign in, Portal provides us with:
              </OText>
              <Table headers={['Data', 'Purpose']}>
                <Row cells={['Name', 'Your profile and contributions']} />
                <Row cells={['Email address', 'Service notifications and support']} />
                <Row cells={['Username', 'Identifying you across the platform']} />
                <Row cells={['Profile picture', 'Your avatar']} />
                <Row cells={['Email verification status', 'Confirming your account is valid']} />
                <Row cells={['Account creation date', 'Internal record-keeping']} />
                <Row cells={['Roles', 'Staff access to admin tools (most users have no roles)']} />
              </Table>
              <OText>
                We process this data under the lawful basis of performance of a contract - it is
                necessary to provide you with an account and access to the Services.
              </OText>
              <OText>
                Portal has its own Privacy Policy covering how your credentials and identity are
                managed at the point of registration.
              </OText>

              <Text className="h3 font-serif">2.2 Content You Upload</Text>
              <OText>
                When you use OurCookbook you may create recipes, collections, meal plans, shopping
                lists, posts, comments, and reviews. This content is stored and associated with your
                account.
              </OText>
              <List>
                <BulletItem>
                  Public and unlisted content is accessible to other users and, where applicable, the
                  wider internet. Public recipes and profiles may be indexed by search engines. We
                  take steps to block AI crawlers but cannot guarantee this.
                </BulletItem>
                <BulletItem>
                  Private content (including meal plans and shopping lists, which are private by
                  default) is visible only to you unless you later change this setting.
                </BulletItem>
              </List>
              <OText>
                We store your content under the lawful basis of performance of a contract - doing so
                is necessary to provide the Services.
              </OText>

              <Text className="h3 font-serif">2.3 Usage Data and Abuse Prevention</Text>
              <OText>We collect limited usage data to keep the platform fair and functioning:</OText>
              <List>
                <BulletItem>
                  IP addresses are pseudonymised using a salted SHA-256 hash before storage and
                  retained for 24 hours to prevent view counter abuse, which affects ratings and
                  trending content. Pseudonymised IP addresses significantly reduce identifiability
                  but may still be considered personal data under UK GDPR.
                </BulletItem>
                <BulletItem>
                  Our web server produces standard access logs containing IP addresses,
                  request paths, and response codes. These are cleared monthly and are not used for
                  any purpose beyond diagnosing server issues.
                </BulletItem>
              </List>
              <OText>
                We process this data under the lawful basis of legitimate interests - maintaining the
                integrity of the platform and preventing abuse.
              </OText>

              <Text className="h3 font-serif">2.4 Error Logging</Text>
              <OText>
                We use Sentry to capture error reports when something goes wrong on the platform.
                Sentry is configured to avoid collecting personal data - it captures stack traces,
                error messages, and basic request context (method, URL, status code) but not IP
                addresses or user identifiers. Sentry processes data on servers in the EU.
              </OText>
              <OText>
                We process this data under the lawful basis of legitimate interests - diagnosing and
                fixing technical issues to keep the Services running correctly.
              </OText>

              <Text className="h3 font-serif">2.5 User Preferences and Settings</Text>
              <OText>
                We store your in-app preferences and settings to personalise your experience. We
                process this data under the lawful basis of performance of a contract - these
                settings are part of the service we provide to you.
              </OText>

              <Text className="h3 font-serif">2.6 Moderation Logs</Text>
              <OText>
                When content is removed by a moderator, we retain a minimal log for 12 months
                containing: the content title (not the content itself), the moderator, the date and
                reason for removal, and a record that you were notified. We retain these logs to meet
                our obligations under the UK Online Safety Act 2023 and to allow you to challenge
                moderation decisions as described in our Terms of Service.
              </OText>
              <OText>
                We process this data under the lawful basis of legal obligation and legitimate
                interests.
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">3. Cookies, Local Storage, and Tracking</Text>

              <Text className="h3 font-serif">Cookies</Text>
              <OText>
                OurCookbook uses cookies set by Cloudflare for security and performance (including
                the cf_clearance cookie). We do not set advertising or tracking cookies ourselves. A
                full list is available in our{' '}
                <OLink href="/policies/cookie-policy" className="link-inline">
                  Cookie Policy
                </OLink>
                .
              </OText>

              <Text className="h3 font-serif">Local Storage</Text>
              <OText>
                We use your browser&apos;s local storage to hold your authentication tokens and session
                data. This data is shared with Portal, our single sign-on system, to keep you logged
                in across Pixelset services.
              </OText>

              <Text className="h3 font-serif">Cloudflare Real User Monitoring (RUM)</Text>
              <OText>
                We use Cloudflare RUM to collect non-identifying performance data such as page load
                times. It does not use cookies, fingerprint your device, or track you across
                websites. See Cloudflare&apos;s{' '}
                <OLink href="https://www.cloudflare.com/privacypolicy/" className="link-inline">
                  Privacy Policy
                </OLink>{' '}
                for details.
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">4. Who We Share Your Data With</Text>
              <OText>We do not sell your personal data. We share it only as follows:</OText>
              <List>
                <BulletItem>
                  <Text className="font-semibold">Portal (Pixelset):</Text> Your account credentials
                  and identity are managed by Portal, also operated by us.
                </BulletItem>
                <BulletItem>
                  <Text className="font-semibold">Krystal:</Text> Our servers and databases are
                  hosted in the UK by Krystal. As our hosting provider, they have access to the
                  infrastructure on which your data is stored.
                </BulletItem>
                <BulletItem>
                  <Text className="font-semibold">Cloudflare:</Text> Our infrastructure, security,
                  and performance monitoring are provided by Cloudflare. To do this, your traffic may
                  pass through their global network of servers, some of which are located outside the
                  UK and EU. Cloudflare is certified under both the UK-US Data Bridge and the EU-US
                  Data Privacy Framework, which means they are legally required to protect your data
                  to the same standard as UK and EU law requires.
                </BulletItem>
                <BulletItem>
                  <Text className="font-semibold">Sentry:</Text> Error reports are sent to Sentry
                  for diagnostic purposes. Sentry is configured to minimise personal data collection
                  and processes data on EU servers.
                </BulletItem>
                <BulletItem>
                  <Text className="font-semibold">Purelymail and Freescout:</Text> Service emails are
                  sent via Purelymail and support requests are managed through Freescout. Your email
                  address and the content of any support communications are processed by these
                  services.
                </BulletItem>
                <BulletItem>
                  <Text className="font-semibold">Law enforcement or regulators:</Text> We may
                  disclose data where required by law, including under the UK Online Safety Act 2023,
                  or to protect the rights or safety of any person.
                </BulletItem>
              </List>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">5. How Long We Keep Your Data</Text>
              <Table headers={['Data', 'Retention period']}>
                <Row cells={['Account and profile data', 'For as long as your account exists']} />
                <Row cells={['Public uploaded content (recipes, collections, posts)', 'For as long as your account exists, or anonymised if you choose that option at deletion']} />
                <Row cells={['Private content (meal plans, shopping lists)', 'Deleted when your account is deleted']} />
                <Row cells={['Pseudonymised IP addresses', '24 hours']} />
                <Row cells={['Server access logs', 'Cleared monthly']} />
                <Row cells={['Moderation logs', '12 months']} />
                <Row cells={['Sentry error logs', '30 days']} />
              </Table>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">6. Account Deletion and Your Content</Text>
              <OText>
                You can request deletion of your account at any time by contacting
                support@pixelset.dev. When you do, you'll be given a choice:
              </OText>
              <List>
                <BulletItem>
                  <Text className="font-semibold">Delete everything:</Text> Your account and all
                  content (recipes, collections, posts, comments) will be permanently deleted.
                </BulletItem>
                <BulletItem>
                  <Text className="font-semibold">Anonymise your public recipes:</Text> Your account
                  and personal data will be deleted, but your public recipes will remain attributed
                  to &apos;Deleted User&apos;. Private content (meal plans and shopping lists) is always
                  deleted regardless of which option you choose.
                </BulletItem>
              </List>
              <OText>
                Some residual data may be retained after deletion where we have a legitimate reason
                to do so, such as preventing fraud, resolving disputes, or complying with legal
                obligations. Where this applies, it will be for the minimum period necessary.
                Moderation logs are retained for 12 months as described in section 5.
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">7. Service Communications</Text>
              <OText>
                We may send you emails that are necessary for the running of your account or the
                Services. These are not marketing emails and you cannot opt out of them, though we
                will only send them when genuinely needed. They may include:
              </OText>
              <List>
                <BulletItem>Notifications about actions taken on your account.</BulletItem>
                <BulletItem>Actions you need to take, such as completing your profile.</BulletItem>
                <BulletItem>Updates about outages or changes to the Services.</BulletItem>
                <BulletItem>Responses to support requests.</BulletItem>
              </List>
              <OText>
                Where it is possible to opt out of a specific type of message, we will tell you how
                to do so in the email itself.
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">8. Your Rights</Text>
              <OText>Under UK GDPR, you have the right to:</OText>
              <OText>1. Access - request a copy of the personal data we hold about you.</OText>
              <OText>2. Rectification - ask us to correct inaccurate data.</OText>
              <OText>3. Erasure - ask us to delete your personal data (see section 6).</OText>
              <OText>4. Restrict processing - ask us to limit how we use your data.</OText>
              <OText>5. Portability - request your data in a structured, machine-readable format. We will provide this on request.</OText>
              <OText>6. Object - object to processing based on legitimate interests.</OText>
              <OText>7. Automated decision-making - we do not make solely automated decisions with significant effects on you.</OText>
              <OText>
                To exercise any of these rights, contact us at support@pixelset.dev. We will respond
                within one month.
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">9. Children</Text>
              <OText>
                OurCookbook is for users aged 18 and over. We do not knowingly collect personal data
                from anyone under 18. If you believe a child has provided us with personal data,
                please contact support@pixelset.dev and we will delete it promptly.
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">10. Security</Text>
              <OText>
                We take reasonable technical and organisational measures to protect your data,
                including:
              </OText>
              <List>
                <BulletItem>Encryption of data in transit (HTTPS).</BulletItem>
                <BulletItem>
                  IP addresses are pseudonymised using a salted SHA-256 hash before storage.
                </BulletItem>
                <BulletItem>
                  Authentication tokens are stored in local storage on your device and shared only
                  with Portal to keep you logged in across Pixelset services.
                </BulletItem>
                <BulletItem>Infrastructure and DDoS protection via Cloudflare.</BulletItem>
                <BulletItem>Error monitoring via Sentry, configured to minimise personal data collection.</BulletItem>
              </List>
              <OText>
                No method of transmission or storage is completely secure. If you discover a
                vulnerability, please report it via our{' '}
                <OLink href="https://pixelset.dev/legal/security/" className="link-inline">
                  Security and Responsible Disclosure Policy
                </OLink>
                .
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">11. Changes to This Policy</Text>
              <OText>
                We may update this policy from time to time. We will notify registered users of
                material changes by email and by posting a notice on the site. The date at the top of
                this page shows when it was last updated.
              </OText>
            </View>

            <View className="gap-sm grid">
              <Text className="h2 font-serif">12. How to Complain</Text>
              <OText>
                If you are unhappy with how we have handled your personal data, you can lodge a
                complaint with the Information Commissioner&apos;s Office (ICO):
              </OText>
              <List>
                <BulletItem>
                  <OLink href="https://ico.org.uk" className="link-inline">
                    ico.org.uk
                  </OLink>
                </BulletItem>
                <BulletItem>Phone: 0303 123 1113</BulletItem>
              </List>
              <OText>
                We&apos;d appreciate the chance to resolve things first - please contact us at
                support@pixelset.dev before escalating to the ICO.
              </OText>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
