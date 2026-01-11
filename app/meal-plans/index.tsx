import "./../../global.css";
import { Text, View, ScrollView, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useLogto } from '@logto/rn';
import { InfoBox, Unauthed } from '../../components/Boxes';
import { getLastKnownAuth, setLastKnownAuth } from '../../utils/auth';
import { OLink, OPressable, OText } from '../../components/Overrides';
import { TextInput } from '../../components/Forms';
import RecipeSearch from '../../components/RecipeSearch';
import FeedbackButton from '../../components/SentryFeedback';
import { Footer, Navbar } from '../../components/Commons';

export default function App() {
  const [needsAuth, setNeedsAuth] = useState(false);
  const [mealPlans, setMealPlans] = useState<{
    id: string;
    uuid: string;
    author: string;
    text: string;
    link: string|null;
    date: string;
  }[]>([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [existingModalOpen, setExistingModalOpen] = useState(false);
  const [existingModalData, setExistingModalData] = useState<{
    id: string;
    uuid: string;
    author: string;
    text: string;
    link: string|null;
    date: string;
  } | null>(null);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newModalDate, setNewModalDate] = useState<Date | null>(null);
  const [modalRecipeOCB, setModalRecipeOCB] = useState(false);
  const [newMealText, setNewMealText] = useState('');
  const { isAuthenticated, getIdToken, signIn } = useLogto();

  useEffect(() => {
    setNeedsAuth(getLastKnownAuth());
    setModalRecipeOCB(true);

    if (isAuthenticated) {
      getMealPlans();
    } else {
      setNeedsAuth(true);
      setLastKnownAuth(false);
    }
  }, [isAuthenticated, getIdToken, signIn]);

  async function getMealPlans() {
    setLoading(true);
    setMealPlans([]);
    try {
      const token = await getIdToken();
      const res = await fetch("https://api.ourcookbook.org/meal-plans", {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (res.ok && res.status === 200) {
        const data = await res.json();
        setMealPlans(data.data || []);
        setNeedsAuth(false);
        setLastKnownAuth(true);
      } else if (res.status === 204) {
        setMealPlans([]);
        setNeedsAuth(false);
        setLastKnownAuth(true);
      } else {
        setLastKnownAuth(false);
        setNeedsAuth(true);
      }
    } catch (err) {
      console.error(err);
      setNeedsAuth(true);
    } finally {
      setLoading(false);
    }
  }

  async function addItem(isText:boolean, text:string|null, author:string|null, recipe:string|null) {
    let type;
    if (isText) {
      type = 'text';
    } else {
      type = 'recipe';
    }

    if (!newModalDate) {
      alert("No date selected!");
      return;
    }

    try {
      const token = await getIdToken();
      const res = await fetch("https://api.ourcookbook.org/meal-plans/item", {
        method: "POST",
        body: JSON.stringify({
          type: type,
          text: text,
          author: author,
          recipe: recipe,
          date: newModalDate.toISOString().split("T")[0]
        }),
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (res.ok && res.status === 201) {
        setNewModalOpen(false);
        setNewMealText('');
      } else {
        alert('Something went wrong.');
        console.error(await res.json());
      }
    } catch (err) {
      alert('Something went wrong.');
      console.error(err);
    } finally {
      getMealPlans();
      setNewModalOpen(false);
    }
  }

  async function deleteItem(id:string|number) {
    try {
      const token = await getIdToken();
      const res = await fetch("https://api.ourcookbook.org/meal-plans/item", {
        method: "DELETE",
        body: JSON.stringify({
          id: id
        }),
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (!res.ok || (res.status !== 200)) {
        if (res.status === 403 || res.status === 401) {
          alert('You do not have permission to delete this.');
        } else {
          alert('Something went wrong.');
        }
        console.error(await res.json());
      }
    } catch (err) {
      alert('Something went wrong.');
      console.error(err);
    } finally {
      getMealPlans();
      setExistingModalData(null);
      setExistingModalOpen(false);
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Shift getDay() so Monday = 0, ..., Sunday = 6
    let startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];

    // Add empty cells before the first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    // Pad the end so final week has 7 days
    let endingDayOfWeek = (lastDay.getDay() + 6) % 7;
    for (let i = endingDayOfWeek + 1; i <= 6; i++) {
      days.push(null);
    }

    return days;
  };

  const getMealPlanForDate = (day: number|null) => {
    if (!day) return null;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const dateStr = new Date(year, month, day).toISOString().split('T')[0];

    return mealPlans.find(plan => plan.date === dateStr);
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const CalendarGrid = () => {
    const days = getDaysInMonth(currentDate);

    return (
      <View className={`gap-std grid`}>
        {/* Calendar Header */}
        <View className={`flex-row`}>
          <OPressable onPress={() => navigateMonth(-1)} className={`btn btn-secondary`}>
            <OText className={`h3`}>←</OText>
          </OPressable>

          <Text className={`h3 flex-grow text-center font-serif`}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>

          <OPressable onPress={() => navigateMonth(1)} className={`btn btn-secondary`}>
            <OText className={`h3`}>→</OText>
          </OPressable>
        </View>

        {/* Day Names */}
        <View className={`flex-row`}>
          {dayNames.map((dayName) => (
            <View key={dayName} className={`flex-1 items-center py-2`}>
              <OText>{dayName}</OText>
            </View>
          ))}
        </View>

        {/* Calendar Days - Rendered week by week */}
        {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
          <View key={weekIndex} className={`flex-row gap-2`}>
            {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
              const mealPlan = getMealPlanForDate(day);
              const actualIndex = weekIndex * 7 + dayIndex;

              return (
                <View key={actualIndex} className={`flex-1`} style={{ minHeight: 80 }}>
                  {day ? (
                    <Pressable
                      onPress={() => {
                        const selectedDate = new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day
                        );
                        setNewModalDate(selectedDate);

                        if (mealPlan) {
                          setExistingModalData(mealPlan);
                          setNewModalOpen(false);
                          setExistingModalOpen(true);
                        } else {
                          setNewModalOpen(true);
                        }
                      }}
                      className={`btn btn-neutral flex-1 items-center justify-start`}
                    >
                      <Text className={`font-serif`}>{day}</Text>
                      <OText>{mealPlan && mealPlan.text}</OText>
                    </Pressable>
                  ) : (
                    <View className="flex-1" />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  // @ts-ignore
  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        <View className="grid gap-std">
          <Text className="h1 font-serif text-white">Meal Plans</Text>
        </View>
      </View>

      <View className="p-std">
        {needsAuth ? (
          <Unauthed />
        ) : (
          <View className="gap-std">
            {loading ? (
              <InfoBox>
                <OText>Loading meal plans...</OText>
              </InfoBox>
            ) : (
              <View className={`grid gap-std`}>
                <CalendarGrid />
                <View className={`grid-2-1 gap-std`}>
                  <View className={`bg-secondary p-sm grid gap-std`}>
                    <Text className={`font-serif h3`}>Sharing</Text>
                    <OText>You are not sharing your meal plan with anyone.</OText>
                    <OText>Nobody is sharing their meal plan with you.</OText>
                    <OText className={`font-bold`}>This feature is coming soon.</OText>
                  </View>
                  <InfoBox>
                    <View className={`grid gap-std`}>
                      <Text className={`font-serif h3`}>Feedback</Text>
                      <OText>This is a new feature, we&apos;d love to hear what you think.</OText>
                      <OText>Click the button below to send us feedback, it can be anything from a suggestion for a new feature to an issue you&apos;ve found.</OText>
                      <FeedbackButton className={`btn btn-info`} textClassName={`text-white`}/>
                    </View>
                  </InfoBox>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
      {(newModalOpen) && (
        <View className={`absolute top-0 left-0 right-0 bottom-0 bg-white z-50 p-std grid gap-std`}>
          {(modalRecipeOCB) ? (
            <View className={`grid gap-std`}>
              <Text className="h2 text-center font-serif">
                {newModalDate
                  ? newModalDate.toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  }) : ''
                }
              </Text>
              <RecipeSearch
                navigateToRecipe={false}
                onRecipePress={(recipe) => {
                  addItem(false, null, recipe.author.uuid, recipe.slug)
                }}
              ></RecipeSearch>

              <View className={`grid-2 gap-std`}>
                <OPressable className={`btn btn-primary`} onPress={() => setModalRecipeOCB(false)}>
                  <OText className={`text-center text-white`}>Something else</OText>
                </OPressable>
                <OPressable onPress={() => setNewModalOpen(false)} className={`btn btn-danger`}>
                  <OText className={`text-center text-white`}>Close</OText>
                </OPressable>
              </View>
            </View>
          ) : (
            <View className={`grid gap-std`}>
              <Text className="h2 text-center font-serif">
                {newModalDate
                  ? newModalDate.toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  }) : ''
                }
              </Text>
              <OPressable className={`btn btn-primary`} onPress={() => setModalRecipeOCB(true)}>
                <OText className={`text-center text-white`}>Search for Recipes</OText>
              </OPressable>

              <OText className={`text-center`}>or enter the meal name</OText>

              <TextInput
                value={newMealText}
                onChange={(e: any) => setNewMealText(e?.target ? e.target.value : e)}
              />

              <View className={`grid-2 gap-std`}>
                <OPressable onPress={() => addItem(true, newMealText, null, null)} className={`btn btn-primary`}>
                  <OText className={`text-center text-white`}>Add to meal plan</OText>
                </OPressable>
                <OPressable onPress={() => setNewModalOpen(false)} className={`btn btn-danger`}>
                  <OText className={`text-center text-white`}>Close</OText>
                </OPressable>
              </View>
            </View>
          )}
        </View>
      )}
      {(existingModalOpen && existingModalData) && (
        <View className={`absolute top-0 left-0 right-0 bottom-0 bg-white z-50 p-std grid gap-std`}>
          <View className={`grid gap-xl`}>
            <Text className="h2 text-center font-serif">
              {(existingModalData.date)
                ? new Date(existingModalData.date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                }) : ''
              }
            </Text>

            {existingModalData.author ? (
              <OText className={`h3 text-center`}>{existingModalData.text} by {existingModalData.author}</OText>
            ) : (
              <OText className={`h3 text-center`}>{existingModalData.text}</OText>
            ) }

            <View className={`w-full`}>
              {existingModalData.link ? (
                <OLink href={existingModalData.link} className={`btn btn-primary w-full`}>
                  <OText className={`text-center text-white`}>View the Recipe</OText>
                </OLink>
              ) : (
                <OText className={`text-center`}>Sorry, this meal doesn&apos;t have a recipe on OurCookbook.</OText>
              )}
            </View>

            <View className={`grid-2 gap-std`}>
              <OPressable onPress={() => deleteItem(existingModalData.id)} className={`btn btn-danger`}>
                <OText className={`text-center text-white`}>Delete</OText>
              </OPressable>
              <OPressable onPress={() => setExistingModalOpen(false)} className={`btn btn-primary`}>
                <OText className={`text-center text-white`}>Close</OText>
              </OPressable>
            </View>
          </View>
        </View>
      )}
      <Footer/>
    </ScrollView>
  );
}