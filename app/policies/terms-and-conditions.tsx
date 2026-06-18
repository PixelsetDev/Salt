/* This file is not licensed under the Apache License 2.0. Copyright Pixelset. All rights reserved. */

import "./../../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../../components/Commons';
import { OLink, OText } from '../../components/Overrides';
import {WarningBox} from "../../components/Boxes.tsx";
import { BulletItem, List } from '../../components/Lists.tsx';

export default function App() {

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="gap-std grid">
          <Text className="h1 font-serif text-white">Terms and Conditions</Text>
        </View>
      </View>
      <View>
        <View className="p-std gap-lg grid">
          <WarningBox
            message={
            'These Terms and Conditions replace our existing Terms of Use on 19th July 2026. Until that date, the current Terms of Use available at https://pixelset.dev/legal/terms/?s=ourcookbook apply.'
            }></WarningBox>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">Agreement to These Terms</Text>
            <OText>
              OurCookbook is a service owned and operated by Pixelset (&apos;OurCookbook&apos;,
              &apos;Pixelset&apos;, &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;). We operate
              the websites ourcookbook.org and any subdomain thereof (including but not limited to
              www.ourcookbook.org and beta.ourcookbook.org) (the &apos;Site&apos;).
            </OText>
            <OText>
              You can contact us by email at support@pixelset.dev.These Terms of Service
              (&apos;Terms&apos;), together with our{' '}
              <OLink href={`/policies/community-guidelines`} className={`link-inline`}>
                Community Guidelines
              </OLink>
              , constitute a legally binding agreement between you and Pixelset regarding your
              access to and use of the Services. By accessing or using the Services in any way, you
              confirm that you have read, understood, and agreed to be bound by these Terms. IF YOU
              DO NOT AGREE WITH THESE TERMS, YOU MUST STOP USING THE SERVICES IMMEDIATELY.
            </OText>
            <OText>
              We may update these Terms from time to time. We will give at least 30 days&apos;
              notice of any material changes via a notice on the Site and by email to registered
              users. Your continued use of the Services after the effective date of any changes
              constitutes acceptance of the updated Terms.
            </OText>
            <OText>
              The Services are intended for users aged 18 or over. Persons under 18 are not
              permitted to use or register for the Services.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">1. Account Registration and Portal SSO</Text>
            <OText>
              Account creation and management for OurCookbook is handled by Portal, our single
              sign-on (SSO) system, which is operated by Pixelset. By creating a Portal account to
              access OurCookbook, you are also subject to Portal&apos;s own Terms of Service and
              Privacy Policy, which are presented to you at the point of registration. These Terms
              govern your use of OurCookbook specifically; Portal&apos;s terms govern your account
              credentials and identity.
            </OText>
            <OText>By registering, you agree that:</OText>
            <List>
              <BulletItem>
                all registration information you submit will be true, accurate, current, and
                complete;
              </BulletItem>
              <BulletItem>
                you will maintain the accuracy of that information and update it promptly if it
                changes;
              </BulletItem>
              <BulletItem>you have the legal capacity to enter into these Terms;</BulletItem>
              <BulletItem>you are at least 18 years of age;</BulletItem>
              <BulletItem>
                you will keep your credentials confidential and are responsible for all activity
                under your account;
              </BulletItem>
              <BulletItem>
                you will not access the Services through automated or non-human means unless
                expressly permitted by us;
              </BulletItem>
              <BulletItem>
                your use of the Services will not violate any applicable law or regulation.
              </BulletItem>
            </List>
            <OText>
              Your public profile information — including your username, display name, and profile
              picture — will be visible to other users of the Services. You consent to this by
              registering.
            </OText>
            <OText>
              We reserve the right to close, suspend, or terminate any account for any reason,
              including inactivity of more than 12 months, without prior notice.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">2. The Services</Text>
            <OText>
              OurCookbook is a community cooking platform that allows users to create, share, and
              discover recipes and related content, including collections, meal plans, shopping
              lists, and social features. The specific features available may vary over time.
            </OText>
            <OText>
              Certain features allow users to set content visibility to public, unlisted,
              friends-only, or private. All content on the Services, regardless of visibility
              setting, remains subject to these Terms and the Community Guidelines.
            </OText>
            <OText>
              Some ingredient and recipe content on the Services may include dietary and allergen
              information contributed by staff or users. This information is provided as a
              convenience only and cannot be guaranteed to be accurate, complete, or up to date. You
              must not rely on the Services for allergen or dietary decisions affecting health or
              safety.
            </OText>
            <OText>
              We reserve the right to modify, suspend, or discontinue any feature of the Services at
              any time without notice or liability to you.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">3. Community Guidelines</Text>
            <OText>
              Your use of the Services is subject to our Community Guidelines, which are
              incorporated into these Terms by reference. The Community Guidelines set out what
              content and behaviour is permitted on OurCookbook. By using the Services, you agree to
              comply with the Community Guidelines at all times.
            </OText>
            <OText>
              Where there is any conflict between these Terms and the Community Guidelines, these
              Terms take precedence on legal matters, and the Community Guidelines take precedence
              on community standards and acceptable content.
            </OText>
            <OText>
              We may update the Community Guidelines from time to time. We will give at least 30
              days' notice of material changes.
            </OText>
            <OText>
              Our Community Guidelines can be found online at{' '}
              <OLink href={`/policies/community-guidelines`} className={`link-inline`}>
                ourcookbook.org/policies/community-guidelines
              </OLink>
              .
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">4. User Contributions</Text>
            <Text className="h3 font-serif">4.1. Your Responsibilities</Text>
            <OText>
              The Services allow you to create, post, upload, and share content and materials
              (&apos;Contributions&apos;), including recipes, collections, meal plans, shopping
              lists, social feed posts, comments, reviews, and other materials. You are solely
              responsible for your Contributions.
            </OText>
            <OText>By posting Contributions, you represent and warrant that:</OText>
            <View className="grid">
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  you are the creator and owner of the Contribution, or you have all necessary
                  rights, licences, consents, and permissions to post it;
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  the Contribution does not infringe any third party&apos;s intellectual property
                  rights, privacy rights, or any other rights;
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>the Contribution is accurate and not misleading;</OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  the Contribution complies with these Terms, the Community Guidelines, and all
                  applicable laws and regulations;
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  you have the written consent of any identifiable individual featured in the
                  Contribution, to the extent required by law.
                </OText>
              </View>
            </View>
            <Text className="h3 font-serif">4.2. License You Grant Us</Text>
            <OText>
              By posting any Contribution, you grant Pixelset an unrestricted, unlimited,
              irrevocable, perpetual, non-exclusive, transferable, royalty-free, worldwide licence
              to use, copy, reproduce, distribute, publish, broadcast, reformat, translate, create
              derivative works of, and otherwise exploit your Contributions for any purpose, in any
              media format and through any media channels.
            </OText>
            <OText>
              This licence includes the right to use your name, username, and any trademarks or
              logos you provide in connection with your Contributions. You waive any moral rights in
              your Contributions to the extent permitted by law.
            </OText>
            <OText>
              You retain ownership of your Contributions. We do not claim ownership of what you
              post.
            </OText>
            <Text className="h3 font-serif">4.3. Public Content Licence (CC-BY-SA 4.0)</Text>
            <OText>
              By uploading any content to the Services, you confirm that you have the right to do so
              and agree to release it under the Creative Commons Attribution-ShareAlike 4.0
              International Licence (CC-BY-SA 4.0). This means anyone may use, share, and adapt your
              Contributions in accordance with the terms of that licence.
            </OText>
            <Text className="h3 font-serif">4.4. AI-Generated Content</Text>
            <OText>
              You must not upload, submit, publish, or otherwise make available any content that is
              generated in whole or in part by artificial intelligence (AI), including but not
              limited to:
            </OText>
            <View className="grid">
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  text written, modified, or synthesised by AI writing assistants or large language
                  models;
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>
                  images, artwork, or designs generated, modified, or synthesised using AI image
                  tools;
                </OText>
              </View>
              <View className="flex-row gap-2">
                <OText>•</OText>
                <OText>audio or video content generated, modified, or synthesised by AI.</OText>
              </View>
            </View>
            <OText>
              Exceptions apply only where you have received prior written permission from Pixelset.
              Any permitted AI-generated content must be clearly disclosed as AI-generated at the
              point of posting.
            </OText>
            <OText>
              We reserve the right to determine, in our sole discretion, whether submitted content
              violates this policy. We may use automated tools and human moderation to identify and
              remove AI-generated material without notice. Violations may result in content removal,
              account suspension, permanent account termination, or other remedies.
            </OText>
            <Text className={`h3 font-serif`}>4.5. Our Right to Remove Content</Text>
            <OText>
              Although we have no obligation to monitor Contributions, we reserve the right to
              remove, edit, or restrict any Contribution at any time and without notice, where we
              reasonably consider it to be in breach of these Terms or the Community Guidelines, or
              where required by law. We may suspend or terminate accounts associated with violating
              content and may report matters to relevant authorities where required.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">5. Prohibited Activities</Text>
            <OText>
              You may not use the Services for any purpose other than those for which they are made
              available. In addition to the restrictions in the Community Guidelines, you must not:
            </OText>
            <List>
              <BulletItem>
                systematically retrieve data or other content from the Services to create or
                compile, directly or indirectly, a collection, compilation, database, or directory
                without our prior written permission;
              </BulletItem>
              <BulletItem>
                use the Services or any content obtained from them to train, fine-tune, or
                otherwise develop artificial intelligence systems, machine learning models, or
                similar technologies, without our express prior written consent;
              </BulletItem>
              <BulletItem>
                use any automated tools, bots, scrapers, spiders, or similar mechanisms to access,
                index, or harvest data from the Services for any purpose, including building
                competing products, except that recognised search engines may crawl and index
                publicly accessible content in accordance with our robots.txt file;
              </BulletItem>
              <BulletItem>
                trick, defraud, or mislead us or other users, including any attempt to access
                sensitive account information;
              </BulletItem>
              <BulletItem>
                circumvent, disable, or interfere with any security or access-control features of
                the Services;
              </BulletItem>
              <BulletItem>
                upload or transmit viruses, malware, or other malicious code;
              </BulletItem>
              <BulletItem>
                engage in any automated use of the Services, including using scripts to post,
                comment, or interact;
              </BulletItem>
              <BulletItem>
                attempt to impersonate another user, person, or organisation;
              </BulletItem>
              <BulletItem>
                use the Services to harass, abuse, intimidate, or threaten any person;
              </BulletItem>
              <BulletItem>
                engage in platform manipulation, including using fake accounts, coordinated
                inauthentic behaviour, or artificially inflating engagement metrics;
              </BulletItem>
              <BulletItem>
                post false or misleading reviews, ratings, or engagement;
              </BulletItem>
              <BulletItem>
                use the Services to advertise, promote, or sell goods and services not affiliated
                with OurCookbook or Pixelset;
              </BulletItem>
              <BulletItem>
                use the Services primarily to drive traffic to external websites, platforms, or
                services;
              </BulletItem>
              <BulletItem>
                use the Services for recruitment, multi-level marketing, or solicitation of any kind;
              </BulletItem>
              <BulletItem>
                share misinformation or content intended to mislead;
              </BulletItem>
              <BulletItem>
                use the Services&apos; underlying software in a manner inconsistent with the Apache
                License 2.0 under which it is released;
              </BulletItem>
              <BulletItem>
                use the Services in a manner inconsistent with any applicable law or regulation;
              </BulletItem>
              <BulletItem>
                perform penetration testing or attempt to exploit vulnerabilities in the Services
                except in accordance with our Security and Responsible Disclosure Policy, available
                at <OLink href={`https://pixelset.dev/legal/security/`} className={`link-inline`}>https://pixelset.dev/legal/security/</OLink>.
              </BulletItem>
            </List>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">6. Prohibition on AI Training Data Collection</Text>
            <OText>
              The collection, scraping, harvesting, or extraction of any data, content, or materials
              from the Services for the purpose of training artificial intelligence or machine
              learning systems, or for building competing products or services, is strictly and
              unconditionally prohibited.
            </OText>
            <OText>
              This prohibition applies to all content on the Services regardless of visibility
              setting, including public, unlisted, friends-only, and private content. It applies to
              all methods of data collection, including but not limited to automated scraping tools,
              bots, APIs accessed without authorisation, and manual collection at scale.
            </OText>
            <OText>
              We actively work to detect and block known AI scrapers and data harvesting tools.
              While we cannot guarantee that all such activity will be intercepted, any user,
              bot, or automated system exhibiting scraping behaviour may be blocked without
              notice. Individuals or organisations whose primary purpose is to scrape, harvest,
              or extract data from the Services are prohibited from holding an account or
              accessing the Services in any capacity.
            </OText>
            <OText>
              Where we identify such activity, we reserve the right to terminate access to the
              Services and all other Pixelset websites and services, and to pursue legal remedies.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">7. Premium Subscription</Text>
            <OText>
              We offer an optional Premium subscription tier that provides access to additional
              features not available on the free tier (&apos;Premium Features&apos;). By purchasing
              a Premium subscription, you agree to the following:
            </OText>
            <Text className="h3 font-serif">7.1. Billing and Payment</Text>
            <OText>
              Premium subscriptions are billed on a recurring basis (monthly or annually, as
              selected at the time of purchase). Payment is processed at the start of each billing
              period. You authorise us to charge the payment method you provide on a recurring
              basis until you cancel.
            </OText>
            <Text className="h3 font-serif">7.2. Cancellation</Text>
            <OText>
              You may cancel your Premium subscription at any time through your account settings or
              by contacting us at support@pixelset.dev. Cancellation takes effect at the end of the
              current billing period. You will retain access to Premium Features until the end of
              the period for which you have paid.
            </OText>
            <Text className="h3 font-serif">7.3. Refunds</Text>
            <OText>
              Subscription fees are non-refundable except where required by applicable law,
              including the UK Consumer Contracts Regulations 2013, or where we determine at our
              absolute discretion that a refund or credit is warranted. To request a refund,
              contact us at support@pixelset.dev.
            </OText>
            <Text className="h3 font-serif">7.4. Changes to Pricing</Text>
            <OText>
              We reserve the right to change subscription prices. We will give at least 30 days'
              notice of any price changes by email. Your continued subscription after the effective
              date of a price change constitutes your acceptance of the new price.
            </OText>
            <Text className="h3 font-serif">7.5. Free Tier</Text>
            <OText>
              The free tier of OurCookbook remains available to all registered users. We reserve the
              right to modify which features are available on the free tier at any time.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">8. Intellectual Property</Text>
            <Text className="h3 font-serif">8.1. Our Intellectual Property</Text>
            <OText>
              Pixelset owns or is licensed to use all intellectual property in the Services,
              including databases, functionality, website designs, audio, video, text, photographs,
              and graphics (collectively, the &apos;Content&apos;), as well as any trademarks,
              service marks, and logos (the &apos;Marks&apos;). The Content and Marks are protected
              by copyright, trademark, and other intellectual property laws in the United Kingdom
              and internationally. Where the Services include software released under an open source
              licence, including the Apache License 2.0, your rights in respect of that software are
              governed by the relevant open source licence rather than these Terms.
            </OText>
            <OText>
              We grant you a limited, non-exclusive, non-transferable, revocable licence to access
              and use the Services for your personal, non-commercial purposes only, subject to these
              Terms. No other rights in the Content or Marks are granted to you.
            </OText>
            <Text className="h3 font-serif">8.2. Copyright Infringement</Text>
            <OText>
              We respect the intellectual property rights of others. If you believe that any content
              on the Services infringes your copyright, please notify us at support@pixelset.dev
              with the following information:
            </OText>
            <List>
              <BulletItem>your name and contact details;</BulletItem>
              <BulletItem>identification of the copyrighted work you believe has been infringed;</BulletItem>
              <BulletItem>identification of the infringing content and its location on the Services;</BulletItem>
              <BulletItem>a statement that you have a good faith belief that the use is not authorised;</BulletItem>
              <BulletItem>a statement that the information in your notice is accurate;</BulletItem>
              <BulletItem>your physical or electronic signature.</BulletItem>
            </List>
            <OText>
              We will investigate notices and take appropriate action, which may include removing
              the content. Repeated infringement by a user may result in account termination.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">9. Reviews and Ratings</Text>
            <OText>
              You may post reviews and ratings of recipes and other content on the Services. When
              posting a review, you must:
            </OText>
            <List>
              <BulletItem>have genuine firsthand experience with the subject of the review;</BulletItem>
              <BulletItem>not use profane, abusive, racist, or hateful language;</BulletItem>
              <BulletItem>not include references to illegal activity;</BulletItem>
              <BulletItem>not make false or misleading statements;</BulletItem>
              <BulletItem>not organise, incentivise, or coordinate campaigns to post reviews (positive or negative).</BulletItem>
            </List>
            <OText>
              We may accept, reject, or remove reviews at our discretion. Reviews do not represent
              our views. By posting a review, you grant us the same licence described in section 4.2
              in relation to that content.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">10. Third-Party Websites and Content</Text>
            <OText>
              The Services may contain links to third-party websites or content. We do not
              investigate, monitor, or endorse such websites or content, and we are not responsible
              for them. Your use of any third-party website is at your own risk and subject to that
              site&apos;s terms and policies.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">11. Privacy</Text>
            <OText>
              We are committed to protecting your personal data. Our Privacy Policy, available at
              <OLink href={`/privacy-policy`} className={`link-inline`}>ourcookbook.org/privacy-policy</OLink>,
              explains how we collect, use, and store your data. By using the Services, you agree to
              our Privacy Policy.
            </OText>
            <OText>
              The Services and their underlying databases are hosted in the United Kingdom. We use
              Cloudflare&apos;s global network for performance and security purposes, which means
              your traffic may be routed through servers in various countries as part of that
              service. By using the Services, you consent to this processing. For further
              information on how your data is handled, please see our Privacy Policy.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">12. Online Safety (UK Online Safety Act 2023)</Text>
            <OText>
              We comply with the UK Online Safety Act 2023. We implement a combination of automated
              and human moderation, including keyword filtering and hash-matching against known
              illegal content databases, to detect and remove illegal or harmful content. Moderation
              may occur before publication, immediately after publication, or on a recurring basis.
            </OText>
            <Text className="h3 font-serif">12.1. Terrorism Content</Text>
            <OText>
              Content that incites, encourages, glorifies, or depicts terrorism or violent extremism
              is strictly prohibited and will be reported to relevant authorities.
            </OText>
            <Text className="h3 font-serif">12.2. Child Sexual Exploitation and Abuse (CSEA)</Text>
            <OText>
              We operate a zero-tolerance policy on CSEA content. Any such material will be removed
              immediately, accounts will be permanently suspended, and the matter will be reported
              to the National Crime Agency, the Internet Watch Foundation, or other appropriate
              authorities.
            </OText>
            <Text className="h3 font-serif">12.3. Other Harmful Content</Text>
            <OText>
              Content designated as &apos;primary priority&apos; or &apos;priority harmful&apos;
              under the Online Safety Act — including but not limited to pornography, suicide and
              self-harm content, content promoting eating disorders, content encouraging bullying,
              hate speech, and dangerous challenges — is strictly prohibited and will be removed
              immediately.
            </OText>
            <Text className="h3 font-serif">12.4. Reporting</Text>
            <OText>
              If you encounter content you believe is illegal or harmful, please use the report
              button on the relevant content, email support@pixelset.dev, or report at
              https://support.pixelset.dev. Reports of suspected illegal content will be handled in
              accordance with our obligations under the Online Safety Act 2023.
            </OText>
            <Text className="h3 font-serif">12.5. Right to Challenge</Text>
            <OText>
              If you believe that your content has been removed, or your account suspended or
              banned, in breach of these Terms, you have the right to raise this with us. Please
              contact support@pixelset.dev. You may also seek independent legal advice regarding
              your rights.
            </OText>
            <OText>
              This right to challenge does not apply to: emails, private one-to-one communications,
              comments and replies, or content that identifies you as a user (such as usernames and
              profile pictures).
            </OText>
            <OText>
              Whether a contractual relationship exists between you and us is a question of fact. If
              no such relationship exists, a breach of contract claim cannot apply. Any such claim
              is subject to the limitations of liability in section 15 and the governing law
              provisions in section 17.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">13. Moderation and Enforcement</Text>
            <OText>
              We reserve the right to moderate content across the Services at any time and without
              notice. This includes the right to:
            </OText>
            <List>
              <BulletItem>remove, restrict, or edit any content at any visibility level;</BulletItem>
              <BulletItem>suspend or terminate accounts;</BulletItem>
              <BulletItem>restrict access to the Services (including by blocking IP addresses);</BulletItem>
              <BulletItem>report users to law enforcement or regulatory authorities where required or appropriate.</BulletItem>
            </List>
            <OText>
              We have no obligation to monitor all content but may do so. Moderation decisions are
              made at our reasonable discretion. Where we have terminated or suspended an account
              for a serious or repeated violation, we reserve the right to also restrict that
              individual&apos;s access to other Pixelset websites and services.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">14. Disclaimers</Text>
            <OText>
              THE SERVICES ARE PROVIDED ON AN &apos;AS IS&apos; AND &apos;AS AVAILABLE&apos; BASIS
              WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO W
              ARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT,
              TO THE FULLEST EXTENT PERMITTED BY LAW.
            </OText>
            <OText>In particular:</OText>
            <List>
              <BulletItem>
                Allergen and dietary information on the Services is provided as a convenience only
                and is not guaranteed to be accurate, complete, or up to date. You must not rely on
                this information for health or safety decisions.
              </BulletItem>
              <BulletItem>
                We do not warrant that the Services will be uninterrupted, error-free, or free from
                viruses or other harmful components.
              </BulletItem>
              <BulletItem>
                We are not responsible for user-generated content, including its accuracy or
                legality.
              </BulletItem>
              <BulletItem>
                Links to third-party websites are provided for convenience only; we do not endorse
                their content or services.
              </BulletItem>
            </List>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">15. Limitation of Liability</Text>
            <OText>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, PIXELSET AND ITS OFFICERS,
              EMPLOYEES, AGENTS, AND AFFILIATES WILL NOT BE LIABLE TO YOU FOR ANY INDIRECT,
              INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING OUT OF OR
              IN CONNECTION WITH YOUR USE OF THE SERVICES.
            </OText>
            <OText>
              Our total aggregate liability to you for any and all claims arising out of or in
              connection with these Terms or the Services is limited to the greater of: (a) the
              total subscription fees you have paid to us in the 12 months preceding the claim, or
              (b) £100.
            </OText>
            <OText>
              Nothing in these Terms limits or excludes our liability for: death or personal injury
              caused by our negligence; fraud or fraudulent misrepresentation; any liability that
              cannot be limited or excluded under applicable law.
            </OText>
            <OText>
              If you are a consumer in the UK or EU, you may have statutory rights that cannot be
              excluded or limited. These Terms do not affect those rights.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">16. Indemnification</Text>
            <OText>
              You agree to defend, indemnify, and hold harmless Pixelset and its officers, agents,
              partners, and employees from and against any claims, liabilities, damages, losses, and
              expenses (including reasonable legal fees) arising out of or in connection with:
            </OText>
            <List>
              <BulletItem>your Contributions;</BulletItem>
              <BulletItem>your use of the Services;</BulletItem>
              <BulletItem>your breach of these Terms;</BulletItem>
              <BulletItem>your breach of any third party&apos;s rights, including intellectual property rights;</BulletItem>
              <BulletItem>any harmful act you take toward another user.</BulletItem>
            </List>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">17. Governing Law and Disputes</Text>
            <Text className="h3 font-serif">17.1. Governing Law</Text>
            <OText>
              These Terms are governed by and construed in accordance with the laws of England and
              Wales. The UN Convention on Contracts for the International Sale of Goods does not
              apply.
            </OText>
            <Text className="h3 font-serif">17.2. Consumer Rights (EU)</Text>
            <OText>
              If you are a consumer habitually resident in the European Union, you may also benefit
              from the mandatory consumer protection provisions of the law of your country of
              residence. You may bring a claim in the courts of your country of residence.
            </OText>
            <Text className="h3 font-serif">17.3. Dispute Resolution</Text>
            <OText>
              We encourage you to contact us at support@pixelset.dev in the first instance to
              resolve any dispute informally. If a dispute cannot be resolved informally, it shall
              be subject to the exclusive jurisdiction of the courts of England and Wales, except as
              provided above for EU consumers.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">18. Term and Termination</Text>
            <OText>
              These Terms remain in effect for as long as you use the Services. We reserve the right
              to terminate or suspend your access to the Services at any time, for any reason,
              without notice or liability.
            </OText>
            <OText>
              If your account is terminated for any reason, you are prohibited from creating a new
              account without our prior written consent. We reserve the right to take appropriate
              legal action in response to violations of these Terms.
            </OText>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">19. General</Text>
            <List>
              <BulletItem>
                These Terms, together with the Community Guidelines and any other policies posted on
                the Services, constitute the entire agreement between you and Pixelset regarding the
                Services.
              </BulletItem>
              <BulletItem>
                Our failure to enforce any provision of these Terms does not waive our right to
                enforce it later.
              </BulletItem>
              <BulletItem>
                If any provision of these Terms is found to be unlawful or unenforceable, it will be
                severed and the remaining provisions will continue in full force.
              </BulletItem>
              <BulletItem>
                We may assign our rights and obligations under these Terms to a third party at any
                time. You may not assign your rights or obligations without our prior written
                consent.
              </BulletItem>
              <BulletItem>
                These Terms do not create any partnership, joint venture, employment, or agency
                relationship between you and Pixelset.
              </BulletItem>
              <BulletItem>
                Notices to us should be sent to support@pixelset.dev.
              </BulletItem>
            </List>
          </View>
          <View className="gap-sm grid">
            <Text className="h2 font-serif">20. Contact</Text>
            <OText>
              If you have any questions about these Terms or the Services, please contact us:
            </OText>
            <OText className="font-bold">Pixelset</OText>
            <OText>Email: support@pixelset.dev</OText>
            <OText>Support: https://support.pixelset.dev</OText>
            <OText>Website: https://pixelset.dev</OText>
            <OText className="font-bold">OurCookbook</OText>
            <OText>Email: support@pixelset.dev</OText>
            <OText>Support: https://support.pixelset.dev</OText>
            <OText>Website: https://ourcookbook.org</OText>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
