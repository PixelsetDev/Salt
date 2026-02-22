import "./../../global.css";
import { Text, View, ScrollView, Image, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { OLink, OText, OPressable } from "../../components/Overrides";
import Navbar, { Footer } from '../../components/Commons';
import { API_BASE } from '../../utils/settings';
import { userType } from '../../utils/types';
import { ErrorBox, SuccessBox } from '../../components/Boxes.tsx';
import { StarRating } from '../../components/StarRating.tsx';
import { FontAwesome } from '@expo/vector-icons';
import { RecipeLink } from '../../components/RecipeLink.tsx';
import { useApiCall } from '../../utils/api.ts';
import { Modal } from '../../components/Modal.tsx';

export default function App() {
  const { username } = useLocalSearchParams();
  const cleanId = (typeof username === 'string' ? username : '').replace(/^@/, '');
  const [editingReview, setEditingReview] = useState<any>(null);
  const [deletingReview, setDeletingReview] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<userType>(null);
  const apiCall = useApiCall();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const call = async () => {
      try {
        const res = await apiCall(API_BASE + '/v1/users/' + cleanId, false, { method: 'GET' });
        if (res.status === 404) {
          globalThis.location.href = '/404';
          setError('404: Page not found');
        } else {
          const data = await res.json();
          setUser(data.data);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    call();
  }, [cleanId, apiCall]);

  const confirmDelete = async () => {
    if (!deletingReview || !user || loading) return;
    setLoading(true);
    try {
      const res = await apiCall(API_BASE + `/v1/recipes/${deletingReview.recipe_id}/reviews`, true, {
        method: 'DELETE',
        body: JSON.stringify({ id: deletingReview.id })
      });
      if (res.ok) {
        setUser({ ...user, reviews: user.reviews.filter((r: any) => r.id !== deletingReview.id) });
        setDeletingReview(null);
        setToast({ type: 'success', message: 'Review deleted successfully.' });
      }
    } catch (err: any) { setToast({ type: 'error', message: err.message }); } finally { setLoading(false); }
  };

  const saveEdit = async () => {
    if (!editingReview || !user || loading) return;
    setLoading(true);
    try {
      const res = await apiCall(API_BASE + `/v1/recipes/${editingReview.recipe_id}/reviews`, true, {
        method: 'PUT',
        body: JSON.stringify({ id: editingReview.id, rating: editingReview.rating, comment: editingReview.comment })
      });
      if (res.ok) {
        setUser({ ...user, reviews: user.reviews.map((r: any) => r.id === editingReview.id ? editingReview : r) });
        setEditingReview(null);
        setToast({ type: 'success', message: 'Review updated successfully.' });
      }
    } catch (err: any) { setToast({ type: 'error', message: err.message }); } finally { setLoading(false); }
  };

  return (
    <ScrollView className="body">
      <Navbar />
      {toast && (
        <View className="fixed top-20 left-4 right-4 z-[100]">
          {toast.type === 'success' ? <SuccessBox message={toast.message} /> : <ErrorBox message={toast.message} />}
        </View>
      )}
      <View className="header grid-2">
        {user ? (
          <View className="gap-std flex-row">
            <Image
              source={{ uri: `https://data.portalsso.com/avatar/${user.uuid}.webp` }}
              className="h-20 w-20 rounded-full md:h-28 md:w-28 lg:h-36 lg:w-36" />
            <View className="gap-std grid self-center">
              <Text className="h1 font-serif text-white">{user.name}</Text>
              <Text className="h3 text-white">@{user.username}</Text>
            </View>
          </View>
        ) : (
          <View className="gap-std grid">
            <Text className="h1 font-serif text-white">Loading...</Text>
            <Text className="h3 text-white">Loading...</Text>
          </View>
        )}
      </View>

      <View className="p-std gap-xl grid">
        {error && <ErrorBox message={error} />}

        <View className="gap-std grid">
          <Text className="h2 text-center font-serif">Recipes</Text>
          {user?.recipes && user.recipes.length > 0 ? (
            <View className="grid-5 gap-std">
              {user.recipes.map((recipe) => (
                <RecipeLink
                  recipe={{
                    slug: recipe.slug,
                    name: recipe.name,
                    author: { username: user.username, name: user.name },
                    visibility: recipe.visibility
                  }}
                  key={recipe.slug}
                />
              ))}
            </View>
          ) : (
            <OText className="text-center">This user has no recipes.</OText>
          )}
        </View>

        <View className="gap-std grid">
          <Text className="h2 text-center font-serif">Collections</Text>
          {user?.collections && user.collections.length > 0 ? (
            <View className="gap-std grid">
              <View className="grid-3 gap-std">
                {user.collections.map((collection) => (
                  <OLink
                    href={`/collections/${collection.slug}`}
                    className={`btn btn-primary relative grid gap-2 px-4 py-2`}
                    key={collection.slug}>
                    <Text className="txt-2xl font-serif">{collection.name}</Text>
                    <OText>{collection.description}</OText>
                    {!!collection.featured && (
                      <OText className="absolute top-0 right-0 rounded-tr-md rounded-bl-md bg-yellow-500 px-2 text-yellow-900">
                        <FontAwesome name="star" size={16} />&nbsp; Featured
                      </OText>
                    )}
                    {collection.visibility === 0 && (<OText className="bg-red-700 absolute top-0 right-0 rounded-bl-md rounded-tr-md px-2 text-white">
                      <FontAwesome name="lock" size={16}/>&nbsp;Private
                    </OText>)}
                    {collection.visibility === 1 && (<OText className="bg-orange-500 absolute top-0 right-0 rounded-bl-md rounded-tr-md px-2 text-white">
                      <FontAwesome name="users" size={16}/>&nbsp;Friends Only
                    </OText>)}
                    {collection.visibility === 2 && (<OText className="bg-yellow-400 absolute top-0 right-0 rounded-bl-md rounded-tr-md px-2">
                      <FontAwesome name="eye" size={16}/>&nbsp;Unlisted
                    </OText>)}
                  </OLink>
                ))}
              </View>
            </View>
          ) : (
            <OText className="text-center">This user has no collections.</OText>
          )}
        </View>

        <View className="gap-std grid">
          <Text className="h2 text-center font-serif">Reviews</Text>
          {user?.reviews && user.reviews.length > 0 ? (
            <View className="grid-3 gap-std">
              {user.reviews.map((review, index) => (
                <View key={'review' + index} className={`relative border-4 px-4 py-3 ${review.rating >= 4 ? "border-green-800" : review.rating === 3 ? "border-yellow-700" : "border-red-800"} bg-white dark:bg-neutral-900`}>
                  {user.self && (
                    <View className="absolute right-2 top-2 z-10 flex-row gap-2">
                      <OPressable disabled={loading} onPress={() => setEditingReview({ ...review })} className="btn-sm btn-info"><FontAwesome name="pencil" size={14} color="white" /></OPressable>
                      <OPressable disabled={loading} onPress={() => setDeletingReview({ ...review })} className="btn-sm btn-danger"><FontAwesome name="trash" size={14} color="white" /></OPressable>
                    </View>
                  )}
                  <View className={`flex flex-row flex-wrap gap-2 ${user.self ? 'pr-20' : ''}`}>
                    <OLink href={`/@${review.recipe_author.username}/${review.recipe_slug}`} className="h3 font-serif underline">{review.recipe_name}</OLink>
                    <Text className="h3 font-serif">by</Text>
                    <OLink href={`/@${review.recipe_author.username}`} className="h3 font-serif underline">{review.recipe_author.name}</OLink>
                    <Text className="h3 font-serif">- {review.rating}/5</Text>
                  </View>
                  <OText className="italic">{review.comment ? `"${review.comment}"` : "They didn't leave a comment."}</OText>
                </View>
              ))}
            </View>
          ) : (
            <OText className="text-center text-neutral-500">This user hasn&apos;t left any reviews.</OText>
          )}

          <Modal visible={!!editingReview} title="Edit Review" onClose={() => !loading && setEditingReview(null)}>
            <View className="gap-4">
              <StarRating
                rating={editingReview?.rating || 0}
                disabled={loading}
                onRatingChange={(n) => setEditingReview({ ...editingReview, rating: n })}
              />
              <TextInput multiline numberOfLines={4} editable={!loading} className="input" style={{ textAlignVertical: 'top', minHeight: 100 }} value={editingReview?.comment || ''} onChangeText={(text) => setEditingReview({ ...editingReview, comment: text })} />
              <View className="mt-2 flex-row gap-std">
                <OPressable disabled={loading} onPress={saveEdit} className="btn btn-primary flex-1 items-center justify-center">
                  {loading ? <FontAwesome name="circle-o-notch" size={18} color="white" className="animate-spin" /> : "Save Changes"}
                </OPressable>
                <OPressable disabled={loading} onPress={() => setEditingReview(null)} className="btn btn-secondary flex-1 items-center">Cancel</OPressable>
              </View>
            </View>
          </Modal>

          <Modal visible={!!deletingReview} title="Delete Review" onClose={() => !loading && setDeletingReview(null)}>
            <View className="gap-4">
              <OText className="text-center txt-xl">Are you sure you want to delete your review for <OText className="font-bold">{deletingReview?.recipe_name}</OText>?</OText>
              <View className="mt-4 flex-row gap-std">
                <OPressable disabled={loading} onPress={confirmDelete} className="btn btn-danger flex-1 items-center justify-center">
                  {loading ? <FontAwesome name="circle-o-notch" size={18} color="white" className="animate-spin" /> : "Delete Forever"}
                </OPressable>
                <OPressable disabled={loading} onPress={() => setDeletingReview(null)} className="btn btn-secondary flex-1 items-center">Keep It</OPressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}