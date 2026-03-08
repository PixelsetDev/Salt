import { Image, Text, View } from 'react-native';
import { OLink, OText } from './Overrides';
import { ReactNode } from 'react';

export const RecipeLink = ({ recipe, children }: { recipe: { author: { username: string, name: string }, slug:string, name:string, visibility:number; }; children: ReactNode|undefined }) => {
  return (
      <OLink
        href={'/@' + recipe.author.username + '/' + recipe.slug}
        key={recipe.slug}
        className="btn-np btn-primary grid gap-2 relative flex-grow"
        passthroughClassName="h-full"
      >
        <View className="flex-1">
          <Image
            source={{
              uri: `https://api.ourcookbook.org/storage/recipes/@${recipe.author.username}/${recipe.slug}.webp`,
            }}
            className="h-40"
          />
          <View className="grid gap-2 px-4 py-3">
            <Text className="txt-2xl font-serif text-white">{recipe.name}</Text>
            {children}
            <OText className="txt-xl text-white">By {recipe.author.name}</OText>
          </View>
        </View>
        { recipe.visibility === 0 && (
          <OText className="absolute bg-red-700 text-white top-0 left-0 right-0 txt-xs p-1 text-center">Private</OText>
        )}
        { recipe.visibility === 1 && (
          <OText className="absolute bg-orange-500 text-white top-0 left-0 right-0 txt-xs p-1 text-center">Friends Only</OText>
        )}
        { recipe.visibility === 2 && (
          <OText className="absolute bg-yellow-500 top-0 left-0 right-0 txt-xs p-1 text-center">Unlisted</OText>
        )}
      </OLink>
  );
};