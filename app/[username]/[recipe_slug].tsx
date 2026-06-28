import './../../global.css';
import { ImageBackground, Image, ScrollView, Text, View, TextInput, ActivityIndicator, } from 'react-native';
import Navbar, { Footer } from '../../components/Commons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { OLink, OPressable, OText } from '../../components/Overrides';
import { Difficulty } from '../../components/Scales';
import { API_BASE } from '../../utils/settings';
import { dietaryType, recipeIngredientsType, recipeType, reviewsType, stepsType } from '../../utils/types';
import { parseAmount, parseUnit } from '../../utils/parser';
import { FontAwesome } from '@expo/vector-icons';
import { useApiCall } from '../../utils/api.ts';
import { useUser } from '../../components/auth/UserProvider.tsx';
import { Modal } from '../../components/Modal.tsx';
import { StarRating } from '../../components/StarRating.tsx';
import { useToast } from '../../components/ToastProvider';
import { useLogto } from '@logto/rn';
import { Tooltip } from '../../components/Tooltip';
import { allergenList, dietaryColour, dietaryTooltip, VeganIcon, VegetarianIcon } from '../../utils/dietary.ts';

export default function App() {
  const { user } = useUser();
  const { isAuthenticated } = useLogto();
  const { username, recipe_slug } = useLocalSearchParams();
  const cleanUsername = (typeof username === 'string' ? username : '').replace(/^@/, '');
  const { showToast } = useToast();
  const [recipe, setRecipe] = useState<recipeType>(null);
  const [steps, setSteps] = useState<stepsType>(null);
  const [reviews, setReviews] = useState<reviewsType>(null);
  const [ingredients, setIngredients] = useState<recipeIngredientsType>(null);
  const [dietary, setDietary] = useState<dietaryType>(null);
  const [disclaimers, setDisclaimers] = useState<string[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [deletingReview, setDeletingReview] = useState<any>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);
  const apiCall = useApiCall();
  const baseServings = useRef<number | null>(null);
  const [showServingsModal, setShowServingsModal] = useState(false);

  const fetchReviews = () => {
    if (!recipe?.id) return;
    fetch(`${API_BASE}/v1/recipes/${recipe.id}/reviews`, { method: 'GET' })
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Failed to load reviews')))
      .then((data) => setReviews(data.data))
      .catch((err) => showToast({ type: 'error', message: err.message }));
  };

  const submitReview = async () => {
    if (!recipe?.id || loading) return;
    setLoading(true);
    try {
      const res = await apiCall(`${API_BASE}/v1/recipes/${recipe.id}/reviews`, true, { method: 'POST', body: JSON.stringify(newReview) });
      const data = await res.json().catch(() => ({ message: 'Server error occurred' }));
      if (res.status === 201) {
        showToast({ type: 'success', message: 'Review submitted successfully!' });
        setShowReviewModal(false);
        setNewReview({ rating: 5, comment: '' });
        fetchReviews();
      } else {
        showToast({ type: 'error', message: data.message || 'Submission failed' });
        setShowReviewModal(false);
      }
    } catch (err: any) { showToast({ type: 'error', message: err.message || 'Network error' }); } finally { setLoading(false); }
  };

  const confirmDelete = async () => {
    if (!deletingReview || !recipe || loading) return;
    setLoading(true);
    try {
      const res = await apiCall(API_BASE + `/v1/recipes/${recipe.id}/reviews`, true, { method: 'DELETE' });
      const data = await res.json().catch(() => ({ message: 'Deletion failed' }));
      if (res.status === 200) {
        setDeletingReview(null);
        showToast({ type: 'success', message: data.message || 'Review deleted successfully.' });
        fetchReviews();
      } else {
        showToast({ type: 'error', message: data.message || 'Could not delete review' });
        setDeletingReview(null);
      }
    } catch (err: any) { showToast({ type: 'error', message: err.message }); } finally { setLoading(false); }
  };

  const saveEdit = async () => {
    if (!editingReview || !recipe || loading) return;
    setLoading(true);
    try {
      const res = await apiCall(API_BASE + `/v1/recipes/${recipe.id}/reviews`, true, { method: 'PUT', body: JSON.stringify({ rating: editingReview.rating, comment: editingReview.comment }) });
      const data = await res.json().catch(() => ({ message: 'Update failed' }));
      if (res.status === 200) {
        setEditingReview(null);
        showToast({ type: 'success', message: data.message || 'Review updated successfully.' });
        fetchReviews();
      } else {
        showToast({ type: 'error', message: data.message || 'Update failed' });
        setEditingReview(null);
      }
    } catch (err: any) { showToast({ type: 'error', message: err.message }); } finally { setLoading(false); }
  };

  useEffect(() => {
    if (!cleanUsername || typeof recipe_slug !== 'string') return;
    apiCall(`${API_BASE}/v1/recipes/${cleanUsername}/${recipe_slug}`)
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Recipe not found')))
      .then((data) => {
          setRecipe(data.data);
          baseServings.current = data.data.servings;
      })
      .catch((err) => showToast({ type: 'error', message: err.message }));
  }, [cleanUsername, recipe_slug, isAuthenticated]);

  useEffect(() => {
    if (recipe?.id !== undefined) {
      fetch(`${API_BASE}/v1/recipes/${recipe?.id}/steps`, { method: 'GET' })
        .then((res) => res.ok ? res.json() : Promise.reject(new Error('Failed to load steps')))
        .then((data) => setSteps(data.data))
        .catch((err) => showToast({ type: 'error', message: err.message }));

      fetchReviews();

      fetch(`${API_BASE}/v1/recipes/${recipe?.id}/ingredients`, { method: "GET" })
        .then((res) => res.ok ? res.json() : Promise.reject(new Error('Failed to load ingredients')))
        .then((data) =>
          Promise.all(
            data.data.map((item: any) =>
              fetch(`${API_BASE}/v1/ingredients/${item.ingredient}`, { method: "GET" })
                .then((res) => res.ok ? res.json() : { data: { name: 'Unknown', dietary: null, disclaimer: null } })
                .then(({ data }) => ({ ...item, name: data.name, dietary: data.dietary, disclaimer: data.disclaimer }))
            )
          )
        )
        .then((ingredientsWithNames) => {
          setIngredients(ingredientsWithNames);
          const aggregatedDietary = { celery: 0, gluten: 0, crustaceans: 0, eggs: 0, fish: 0, lupin: 0, milk: 0, molluscs: 0, mustard: 0, peanuts: 0, sesame: 0, soybeans: 0, sulphites: 0, treenuts: 0, animal_products: 0, meat: 0 };
          const disclaimers = new Set<string>();
          ingredientsWithNames.forEach(({ dietary, disclaimer }) => {
            if (disclaimer) disclaimers.add(disclaimer);
            Object.keys(aggregatedDietary).forEach((key) => {
              const k = key as keyof typeof aggregatedDietary;
              const value = dietary?.[k] ?? 1; // missing = maybe
              if (value > aggregatedDietary[k]) aggregatedDietary[k] = value;
            });
          });
          setDietary(aggregatedDietary);
          setDisclaimers([...disclaimers]);
        })
        .catch((err) => showToast({ type: 'error', message: err.message }));
    }
  }, [recipe]);

  const userReview = reviews?.reviews?.find((r: any) => r.author.username === user?.username);
  const backgroundImage = { uri: 'https://api.ourcookbook.org/storage/recipes/' + username + '/' + recipe_slug + '.webp' };
  const scale = baseServings.current ? recipe.servings / baseServings.current : 1;

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <ImageBackground source={backgroundImage} className={`px-std py-sm`}>
        {recipe ? (
          <View className={`gap-sm p-sm grid`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="gap-sm flex-row items-center">
              <Text className={`h1 grow font-serif text-white`}>{recipe.name}</Text>
              {recipe.isOwned && (
                <OPressable
                  onPress={() => {
                    router.push(`/edit/recipe/${recipe.id}`);
                  }}
                  className="btn btn-info">
                  Edit
                </OPressable>
              )}
            </View>
            <View className={`gap-sm flex flex-row`}>
              <OText className="txt-2xl text-white">
                By{' '}
                <OLink
                  className={`txt-2xl text-white underline`}
                  href={`/@${recipe.author.username}`}>
                  {recipe.author.name}
                </OLink>
              </OText>
              <OText className="txt-2xl text-white">•</OText>
              <OText className="txt-2xl text-white">
                {new Date(recipe.created).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </OText>
              <OText className="txt-2xl text-white">•</OText>
              <OText className="txt-2xl text-white">{recipe.views} views</OText>
            </View>
            {reviews && reviews?.score !== -1 ? (
              <View className="gap-std flex flex-row items-center">
                <View className="flex flex-row gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FontAwesome
                      key={i}
                      name={
                        (reviews?.score - i + 1 >= 0.8
                          ? 'star'
                          : reviews?.score - i + 1 >= 0.3
                            ? 'star-half-o'
                            : 'star-o') as any
                      }
                      size={18}
                      color="#fff"
                    />
                  ))}
                </View>
                <OText className="text-white">{Number(reviews?.score).toFixed(1)} / 5.0</OText>
                <OText className="text-white">({reviews?.reviews?.length} reviews)</OText>
              </View>
            ) : (
              <OText className="txt-subtle">This recipe doesn&apos;t have any reviews yet.</OText>
            )}
          </View>
        ) : (
          <View className={`gap-std grid`}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </ImageBackground>

      <View className={`bg-green relative h-2 w-full`}></View>

      {recipe && (
        <View className={`gap-std p-std grid`}>
          <View className={`grid-3 gap-std`}>
            <View className={`gap-std span-2 bg-secondary p-xs grid`}>
              <Text className={`h2 font-serif`}>About this recipe</Text>
              <OText>
                {recipe.description?.trim() === ''
                  ? "Looks like the author didn't upload a description!"
                  : recipe.description}
              </OText>
              <OText>
                This recipe was created by {recipe.author.name}
                {recipe.edited && (
                  <OText>
                    {' '}
                    - last updated{' '}
                    {new Date(recipe.edited).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </OText>
                )}
                .
              </OText>
              <OText className={`txt-xs italic`}>
                Always follow proper food hygiene procedures when cooking. Recipe information
                uploaded by the author, OurCookbook cannot guarantee the accuracy or completeness of
                any information on this page.
              </OText>
            </View>
            <View className={`gap-std bg-secondary p-xs mobile-span-2 grid`}>
              <Text className={`h2 font-serif`}>Cooking</Text>
              <View className="flex-row items-center gap-2">
                <OText>This recipe serves {recipe.servings} people.</OText>
                <OPressable
                  onPress={() => setShowServingsModal(true)}
                  className="link-inline-subtle">
                  <OText className="txt-sm">Change</OText>
                </OPressable>
              </View>
              <Modal
                visible={showServingsModal}
                title="Adjust Servings"
                onClose={() => setShowServingsModal(false)}>
                <View className="gap-4">
                  <View className="gap-std flex-row items-center justify-center">
                    <OPressable
                      onPress={() =>
                        setRecipe((r) => (r ? { ...r, servings: Math.max(1, r.servings - 1) } : r))
                      }
                      className="btn btn-secondary">
                      −
                    </OPressable>
                    <OText className="txt-xl">{recipe.servings} servings</OText>
                    <OPressable
                      onPress={() => setRecipe((r) => (r ? { ...r, servings: r.servings + 1 } : r))}
                      className="btn btn-secondary">
                      +
                    </OPressable>
                  </View>
                  <OPressable
                    onPress={() => setShowServingsModal(false)}
                    className="btn btn-secondary">
                    Done
                  </OPressable>
                </View>
              </Modal>
              <OText>
                {recipe.author.name} estimates that this recipe takes {recipe.time.prep} minutes to
                prepare, and {recipe.time.cook} minutes to cook.
              </OText>
              <Difficulty
                currentStep={2}
                steps={['Beginner', 'Easy', 'Moderate', 'Difficult', 'Expert']}
              />
            </View>
            <View className={`gap-std mobile-span-2 flex`}>
              <View className={`gap-std bg-secondary p-xs grid ${!recipe.tips && `flex-grow`}`}>
                <Text className={`h2 font-serif`}>Ingredients</Text>
                {ingredients ? (
                  <View className={`flex-row divide-x-2 divide-neutral-200/75`}>
                    <View className={`grid flex-grow gap-1 divide-y-2 divide-neutral-300`}>
                      {ingredients.map((ingredient, index) => (
                        <OText key={'ingredient-name' + index} className={`flex-grow pt-1 pr-2`}>
                          {ingredient.name}
                        </OText>
                      ))}
                    </View>
                    <View className={`grid gap-1 divide-y-2 divide-neutral-300`}>
                      {ingredients.map((ingredient, index) => (
                        <OText key={'ingredient-amount' + index} className={`pt-1 pl-2`}>
                          {parseAmount(Math.round(ingredient.amount * scale * 100) / 100)}{' '}
                          {parseUnit(
                            Math.round(ingredient.amount * scale * 100) / 100,
                            ingredient.unit,
                            false
                          )}
                        </OText>
                      ))}
                    </View>
                  </View>
                ) : (
                  <>
                    <OText>
                      Looks like {recipe.author.name} didn&apos;t give us a list of ingredients...
                      that&apos;s awkward.
                    </OText>
                    <OText>
                      Try messaging them to ask, or see what&apos;s mentioned in the steps to the
                      right.
                    </OText>
                    <OText>Sorry for any inconvenience caused!</OText>
                  </>
                )}
                <View className={`mt-2 border-t border-neutral-200 text-xs`}></View>
                {scale !== 1 && (
                  <OText className={`txt-xs pt-2`}>
                    Servings have been adjusted from the author's original recipe, therefore
                    ingredient amounts may not be exact.
                  </OText>
                )}

                {dietary && (
                  <View className="mt-2 grid gap-2 xl:grid-cols-7 md:grid-cols-6 grid-cols-12">
                    {allergenList.map(({ key, label, Icon }) => {
                      const value = dietary[key as keyof typeof dietary] as number;
                      return (
                        <Tooltip key={key} text={dietaryTooltip(value, label)}>
                          <View className="aspect-square w-full">
                            <Image
                              source={Icon}
                              tintColor={dietaryColour(value)}
                              style={{ width: '100%', height: '100%' }}
                            />
                            </View>
                        </Tooltip>
                      );
                    })}
                    <Tooltip text={dietary.animal_products === 2 ? 'Not suitable for vegans' : dietary.animal_products === 1 ? 'May not be suitable for vegans' : 'Suitable for vegans'}>
                      <View className="aspect-square w-full">
                        <Image
                          source={VeganIcon}
                          tintColor={dietaryColour(dietary.animal_products)}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </View>
                    </Tooltip>
                    <Tooltip text={dietary.meat === 2 ? 'Not suitable for vegetarians' : dietary.meat === 1 ? 'May not be suitable for vegetarians' : 'Suitable for vegetarians'}>
                      <View className="aspect-square w-full">
                        <Image
                          source={VegetarianIcon}
                          tintColor={dietaryColour(dietary.meat)}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </View>
                    </Tooltip>
                  </View>
                )}

                <OText className={`txt-xs pt-2`}>
                  {disclaimers.map((disclaimer, index) =>
                    index === 0 ? disclaimer : ' ' + disclaimer
                  )}{' '}
                </OText>
              </View>
              {recipe.tips && (
                <View className={`mobile-span-2 gap-std bg-secondary p-xs grid flex-grow`}>
                  <Text className={`h2 font-serif`}>Chef&apos;s Tips</Text>
                  <OText>{recipe.tips}</OText>
                </View>
              )}
            </View>
            <View className={`span-2 gap-std bg-secondary p-xs`}>
              <Text className={`h2 font-serif`}>Steps</Text>
              {steps != null ? (
                steps.map((step, index) => (
                  <View key={step} className={`gap-std flex flex-row`}>
                    <Text className={`txt-4xl font-serif dark:text-white`}>
                      {index + 1}.&nbsp;&nbsp;
                    </Text>
                    <OText className={`self-center`}>{step}</OText>
                  </View>
                ))
              ) : (
                <OText>This recipe doesn&apos;t have any steps, is it even a recipe???</OText>
              )}
              <View className={`flex-grow`}></View>
            </View>
            <View className={`span-2 gap-std bg-secondary p-xs grid`}>
              <View className="gap-std flex-row">
                <Text className={`h2 grow font-serif`}>Reviews</Text>
                {user?.name &&
                  (userReview ? (
                    <View className="flex-row gap-2">
                      <OPressable
                        disabled={loading}
                        onPress={() => setEditingReview({ ...userReview })}
                        className="btn btn-info px-4">
                        Edit Review
                      </OPressable>
                      <OPressable
                        disabled={loading}
                        onPress={() => setDeletingReview({ ...userReview })}
                        className="btn btn-danger px-4">
                        Delete Review
                      </OPressable>
                    </View>
                  ) : (
                    <OPressable
                      onPress={() => setShowReviewModal(true)}
                      className="btn btn-secondary">
                      Post Review
                    </OPressable>
                  ))}
              </View>
              <View className={`grid-2 gap-std`}>
                {reviews?.reviews && reviews?.score !== -1 ? (
                  reviews.reviews.map((review, index) => (
                    <View
                      key={'review' + index}
                      className={`border-4 px-4 py-3 ${review.rating === 5 || review.rating === 4 ? 'border-green-800' : review.rating === 3 ? 'border-yellow-700' : 'border-red-800'}`}>
                      <View className={`flex flex-row gap-2`}>
                        <OLink
                          href={`/@${review.author.username}`}
                          className={`h3 font-serif underline`}>
                          {review.author.name}
                        </OLink>
                        <Text className={`h3 font-serif`}>{review.rating}/5</Text>
                      </View>
                      {review.comment ? (
                        <OText className={`italic`}>&quot;{review.comment}&quot;</OText>
                      ) : (
                        <OText className={`italic`}>They didn&apos;t leave a comment.</OText>
                      )}
                      <OText className="txt-xs txt-subtle">
                        Posted{' '}
                        {new Date(review.created.replace(' ', 'T')).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {review.edited &&
                          ` (Edited ${new Date(review.edited.replace(' ', 'T')).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })})`}
                      </OText>
                    </View>
                  ))
                ) : (
                  <View className={`span-2`}>
                    <OText>Nobody has reviewed this recipe, why not be the first?</OText>
                  </View>
                )}
              </View>
            </View>
            <View className={`mobile-span-2 gap-std bg-secondary p-xs grid`}>
              <Text className={`h2 font-serif`}>Recipes like this</Text>
              <OText className={`italic`}>Coming soon, check back later!</OText>
            </View>
          </View>
        </View>
      )}

      <Modal
        visible={showReviewModal}
        title="Leave Review"
        onClose={() => !loading && setShowReviewModal(false)}>
        <View className="gap-4">
          <StarRating
            rating={newReview.rating}
            disabled={loading}
            onRatingChange={(n) => setNewReview({ ...newReview, rating: n })}
          />
          <View>
            <TextInput
              multiline
              numberOfLines={4}
              maxLength={128}
              editable={!loading}
              className="input"
              placeholder="Share your thoughts (optional)..."
              style={{ textAlignVertical: 'top', minHeight: 100 }}
              value={newReview.comment}
              onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
            />
            <OText className="txt-xs mt-1 text-right opacity-60">
              {newReview.comment.length}/128
            </OText>
          </View>
          <View className="gap-std mt-2 flex-row">
            <OPressable disabled={loading} onPress={submitReview} className="btn btn-primary">
              {loading ? (
                <FontAwesome
                  name="circle-o-notch"
                  size={18}
                  color="white"
                  className="animate-spin"
                />
              ) : (
                'Submit Review'
              )}
            </OPressable>
            <OPressable
              disabled={loading}
              onPress={() => setShowReviewModal(false)}
              className="btn btn-secondary">
              Cancel
            </OPressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!editingReview}
        title="Edit Review"
        onClose={() => !loading && setEditingReview(null)}>
        <View className="gap-4">
          <StarRating
            rating={editingReview?.rating || 0}
            disabled={loading}
            onRatingChange={(n) => setEditingReview({ ...editingReview, rating: n })}
          />
          <View>
            <TextInput
              multiline
              numberOfLines={4}
              maxLength={128}
              editable={!loading}
              className="input"
              style={{ textAlignVertical: 'top', minHeight: 100 }}
              value={editingReview?.comment || ''}
              onChangeText={(text) => setEditingReview({ ...editingReview, comment: text })}
            />
            <OText className="txt-xs mt-1 text-right opacity-60">
              {(editingReview?.comment || '').length}/128
            </OText>
          </View>
          <View className="gap-std mt-2 flex-row">
            <OPressable disabled={loading} onPress={saveEdit} className="btn btn-primary">
              {loading ? (
                <FontAwesome
                  name="circle-o-notch"
                  size={18}
                  color="white"
                  className="animate-spin"
                />
              ) : (
                'Save Changes'
              )}
            </OPressable>
            <OPressable
              disabled={loading}
              onPress={() => setEditingReview(null)}
              className="btn btn-secondary">
              Cancel
            </OPressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!deletingReview}
        title="Delete Review"
        onClose={() => !loading && setDeletingReview(null)}>
        <View className="gap-4">
          <OText className="txt-xl text-center">
            Are you sure you want to delete your review for{' '}
            <OText className="font-bold">{recipe?.name}</OText>?
          </OText>
          <View className="gap-std mt-4 flex-row">
            <OPressable
              disabled={loading}
              onPress={confirmDelete}
              className="btn btn-danger flex-1 items-center justify-center">
              {loading ? (
                <FontAwesome
                  name="circle-o-notch"
                  size={18}
                  color="white"
                  className="animate-spin"
                />
              ) : (
                'Delete Forever'
              )}
            </OPressable>
            <OPressable
              disabled={loading}
              onPress={() => setDeletingReview(null)}
              className="btn btn-secondary flex-1 items-center">
              Keep It
            </OPressable>
          </View>
        </View>
      </Modal>

      <Footer />
    </ScrollView>
  );
}