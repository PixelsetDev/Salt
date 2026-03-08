import { Text, View } from 'react-native';
import { OLink, OText } from './Overrides.tsx';

export const NewsListItem = ({ name, date, summary, category, url }: { name: string, date: string, summary: string, category: string, url: string }) => {
  return (
    <View className={`btn-np px-4 py-2 btn-secondary grow h-full group`}>
      <OLink className={`grid gap-sm group-hover:text-white`} href={`/news/${url}`}>
        <View className={`flex-row`}>
          <OText className={`txt-sm grow`}>{date}</OText>
          <OText className={`txt-sm text-green-800 group-hover:text-white`}>{category}</OText>
        </View>
        <OText className={`h2 font-serif grow`}>{name}</OText>
        <OText className={`txt-sm`}>{summary}</OText>
      </OLink>
    </View>
  )
}