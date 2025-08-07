import { Image, Text, View } from 'react-native';
import { OLink, OText } from './Overrides';
import { ReactNode } from 'react';

export const RecipeLink = ({ recipe, children }: { recipe: { author: { username: string, name: string }, slug:string, title:string }; children: ReactNode }) => {
  return (
    <OLink
      href={'/@' + recipe.author.username + '/' + recipe.slug}
      key={recipe.slug}
      className="btn-np btn-primary grid gap-2">
      <Image
        source={{
          uri:
            'https://api.ourcookbook.org/storage/recipes/@' +
            recipe.author.username +
            '/' +
            recipe.slug +
            '.webp',
        }}
        className="h-40 rounded-t-md"
      />
      <View className="grid gap-2 px-4 py-3">
        <Text className="txt-2xl font-serif text-white">{recipe.title}</Text>
        {children}
        <OText className="txt-xl text-white">By {recipe.author.name}</OText>
      </View>
    </OLink>
  );
};