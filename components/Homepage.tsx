import { Button, ImageBackground, ScrollView, Text, View } from 'react-native';
import Navbar from './Navbar';
import { Desktop, Mobile } from './Exclusions';
import { OLink, OText } from './Overrides';
import RecipeSearch from './RecipeSearch';

export const Homepage = () => {
  const featuredImageOne = { uri: 'https://ourcookbook.org/storage/images/recipes/@amy/chicken-leek-pie.webp', };
  const featuredImageTwo = { uri: 'https://ourcookbook.org/storage/images/recipes/@ella/lasagna-soup.webp', };
  const featuredImageThree = { uri: 'https://ourcookbook.org/storage/images/recipes/@ourcookbook/sweet-chilli-glazed-basa.webp', };
  const featuredImageFour = { uri: 'https://ourcookbook.org/storage/images/recipes/@lewis/chicken-curry.webp', };

  return (
    <ScrollView>
      <Navbar></Navbar>

      <Desktop className="nomobile">
        <View className="header grid-2 gap-std">
          <View className="grid">
            <View className="grid">
              <Text className="h1 font-serif text-white">Let&#39;s cook</Text>
              <Text className="h1 font-serif text-white">with OurCookbook</Text>
            </View>
            <OText className="h3 text-white">
              Cook with recipes submitted by your friends and people around the world on
              OurCookbook.
            </OText>
          </View>
        </View>
        <View className="grid-3">
          <ImageBackground source={featuredImageOne} resizeMode="cover" className="span-2 p-sm">
            <View className="bg-white p-8 grid gap-std">
              <Text className="h2 font-serif">Chicken and Leek Pie</Text>
              <OText>
                By Amy
              </OText>
              <OText>
                Pies are delicious meals suitable for any occasion, and this one is no different!
                Amy&apos;s Chicken and Leek Pie is an easy, versitile, and tasty weeknight meal.
                Plus, it&apos;s part of Amy&apos;s new Pies collection! This recipe takes 40 minutes
                in total and provides 3 servings.
              </OText>
              <OText>
                <OLink href="/@amy/chicken-leek-pie" className="btn btn-primary">
                  Let&apos;s get cooking!
                </OLink>
              </OText>
            </View>
          </ImageBackground>
          <ImageBackground source={featuredImageTwo} resizeMode="cover" className="p-sm">
            <View className="bg-white p-8 grid gap-std">
              <Text className="h2 font-serif">Lasagna Soup</Text>
              <OText>
                By Ella
              </OText>
              <OText>
                A new way of making Lasagna, in soup form! This recipe takes 50 minutes in total and
                provides 4 servings.
              </OText>
              <OText>
                <OLink href="/@ella/lasagna-soup" className="btn btn-primary">
                  Try something new!
                </OLink>
              </OText>
            </View>
          </ImageBackground>
          <ImageBackground source={featuredImageThree} resizeMode="cover" className="p-sm">
            <View className="bg-white p-8 grid gap-std">
              <Text className="h2 font-serif">Sweet Chilli Glazed Basa</Text>
              <OText>
                By OurCookbook
              </OText>
              <OText>
                A great meal for chippy day, a classic meal with a zingy twist. This recipe takes 35
                minutes in total and provides 2 servings.
              </OText>
              <OText>
                <OLink href="/@ourcookbook/sweet-chilli-glazed-basa" className="btn btn-primary">
                  Let&apos;s get cooking!
                </OLink>
              </OText>
            </View>
          </ImageBackground>
          <ImageBackground source={featuredImageFour} resizeMode="cover" className="span-2 p-sm">
            <View className="bg-white p-8 grid gap-std">
              <Text className="h2 font-serif">Chicken Curry</Text>
              <OText>
                By Lewis
              </OText>
              <OText>
                An adaptation of his Dad&apos;s recipe, this chicken curry is finger-lickin&apos;
                good! Somewhere between a Tikka and a Korma, this one is in a league of it&apos;s
                own. It&apos;s super easy to cook and feeds the whole family.
              </OText>
              <OText>
                This recipe takes 60
                minutes in total and provides 4 servings.
              </OText>
              <OText>
                <OLink href="/@lewis/chicken-curry" className="btn btn-primary">
                  Get started!
                </OLink>
              </OText>
            </View>
          </ImageBackground>
        </View>
      </Desktop>

      <Mobile>
        <View className="p-std">
          <ImageBackground source={featuredImageOne} resizeMode="cover" className="p-std">
            <View className="h-72">&nbsp;</View>
            <View className="bg-white p-8 grid gap-std">
              <Text className="h2 font-serif">Chicken and Leek Pie</Text>
              <OText>
                By Amy
              </OText>
              <OText>
                Amy&apos;s Chicken and Leek Pie is an easy, versitile, and tasty weeknight meal.
                This recipe takes 40 minutes in total and provides 3 servings.
              </OText>
              <OText>
                <OLink href="/@amy/chicken-leek-pie" className="btn btn-primary">
                  Let&apos;s get cooking!
                </OLink>
              </OText>
            </View>
          </ImageBackground>
        </View>
      </Mobile>

      <RecipeSearch />
    </ScrollView>
  );
};

export const WelcomeScreen = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <ScrollView>
      <View className="gap-xl p-std grid">
        <View className="grid">
          <Text className="h2 text-center font-serif">Welcome to the</Text>
          <Text className="h1 text-center font-serif">OurCookbook App</Text>
        </View>

        <View className="gap-std">
          <OText className="h3 text-center">
            This app is under active development and may not work as expected at this time.
          </OText>
          <OText className="h3 text-center">
            If you find any issues, please report them to ocb-app-issues@pixelset.dev
          </OText>
          <OText className="h3 text-center">
            You can always use our existing website at ourcookbook.org
          </OText>
        </View>

        <Button title="Continue" onPress={onContinue} />
      </View>
    </ScrollView>
  );
};