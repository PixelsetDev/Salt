import "./../../global.css";
import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Navbar, { Footer } from '../../components/Commons';
import { collectionType } from '../../utils/types';
import { API_BASE } from '../../utils/settings';
import { OLink, OText } from '../../components/Overrides.tsx';
import { FontAwesome } from '@expo/vector-icons';
import { ErrorBox, WarningBox } from '../../components/Boxes.tsx';

export default function App() {
  const [error, setError] = useState<string|null>(null);
  const [collections, setCollections] = useState<collectionType[]>([]);

  useEffect(() => { getCollections(); },[]);

  async function getCollections() {
    fetch(API_BASE + '/v1/collections/', { method: 'GET' })
      .then((response) => response.json())
      .then((body) => {
        setCollections(body.data);
      })
      .catch((err) => setError(err));
  }

  // noinspection PointlessBooleanExpressionJS
  return (
    <ScrollView className={`body`}>
      <Navbar/>
      <View className={`header grid-2`}>
        <View className={`grid gap-std`}>
          <Text className={`h1 font-serif text-white`} key={`user-header-name`}>Collections</Text>
        </View>
      </View>

      <View className={`p-std grid gap-xl`}>
        {error && (<ErrorBox message={error}/>)}

        {(collections && collections.length > 0) ? (
          <View className={`grid gap-std`}>
            <View className={`grid-3 gap-std`}>
              {collections?.map((collection) => (!!collection?.featured && (
                <OLink href={`/collections/${collection.slug}`} className={`grid gap-2 px-4 py-2 btn btn-primary relative`} key={collection.id}>
                  <Text className={`txt-2xl font-serif`}>{collection.name}</Text>
                  <OText className={`text-white`}>By {collection.author.name}</OText>
                  <OText className={`bg-yellow-500 absolute top-0 right-0 rounded-bl-md rounded-tr-md px-2 text-yellow-900`}>
                    <FontAwesome name={`star`} size={16}/>&nbsp;
                    Featured
                  </OText>
                </OLink>
              )))}
              {collections?.map((collection) => ((collection && !collection?.featured) && (
                  <OLink href={`/collections/${collection.slug}`} className={`grid gap-2 px-4 py-2 btn btn-primary`} key={collection.id}>
                    <Text className={`txt-2xl font-serif`}>{collection.name}</Text>
                    <OText className={`text-white`}>By {collection.author.name}</OText>
                  </OLink>
                )
              ))}
            </View>
          </View>
        ) : (<WarningBox message={`No collections found.`}/>)}
      </View>
      <Footer/>
    </ScrollView>
  );
}