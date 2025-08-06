import { Image, Text, View } from 'react-native';
import { OLink, OText } from './Overrides';
import { ReactNode } from 'react';

export const RecipeLink = ({ recipe, children }: { recipe: object; children: ReactNode }) => {
  return (
    <OLink
      href={"/@"+recipe.author.username+"/"+recipe.slug}
      key={recipe.slug}
      className="btn-np btn-primary grid gap-2"
    >
      <Image
        source={{ uri: "https://api.ourcookbook.org/storage/recipes/@"+recipe.author.username+"/"+recipe.slug+".webp" }}
        className="rounded-t-md h-40"
      />
      <View className="grid gap-2 px-4 py-3">
        <Text className="font-serif txt-2xl text-white">{recipe.title}</Text>
        {children}
        <OText className="txt-xl text-white">By {recipe.author.name}</OText>
      </View>
    </OLink>
  )
}