import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import CustomRatingBar from "../custom_classes/custom_rating_bar";
import InDeCount from "../custom_classes/idCount";
import Slider from "@react-native-community/slider";
import FlatButton from "../custom_classes/FlatButton";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getRoutinefunction,
  postRoutineHandler,
  updateRoutinefunction,
} from "../../backend/data_handler";
import CustomeLoaderState from "../custom_classes/custome_loader";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/AppDataContext";
import { CheckBox } from "react-native-btr";

function DailyRoutine({ navigation }) {
  const routineDataCtx = useContext(DataContext);

  const [sliderValue, setSliderValue] = useState();

  const [wellSleepLastNightvalue, setwellSleepLastNight] = useState(1);
  const [stressLevelvalue, setstressLevel] = useState(1);
  const [digestiveDiscomfortvalue, setdigestiveDiscomfort] = useState(1);
  const [itchingIntensityvalue, setitchingIntensity] = useState(1);
  const [psoriasisScalingvalue, setpsoriasisScaling] = useState(1);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  // Timing state
  const [sleepingHoursLastNightvalue, setSleepingHoursLastNight] = useState(1);
  const [ExerciseTimeTodayvalue, setExerciseTimeToday] = useState(1);
  const [amountOfWaterTodayvalue, setamountOfWaterToday] = useState(1);
  const [bowelMovementsTodayvalue, setbowelMovementsToday] = useState(1);

  const [isChecked, setChecked] = useState(false);
  const [isbowelChecked, setBowelChecked] = useState(false);

  if (sleepingHoursLastNightvalue < 0) {
    setSleepingHoursLastNight(1);
  }
  if (ExerciseTimeTodayvalue < 0) {
    setExerciseTimeToday(1);
  }
  if (amountOfWaterTodayvalue < 0) {
    setamountOfWaterToday(1);
  }
  if (bowelMovementsTodayvalue < 0) {
    setbowelMovementsToday(1);
  }

  /* Loader Handler */
  const [isLoading, setLoading] = useState(false);

  const dailyRoutinedata = {
    wellSleepLastNight: wellSleepLastNightvalue,
    sleepingHoursLastNight: sleepingHoursLastNightvalue,
    stressLevel: stressLevelvalue,
    ExerciseTimeToday: ExerciseTimeTodayvalue,
    workoutIntensity: sliderValue,
    amountOfWaterToday: amountOfWaterTodayvalue,
    bowelMovementsToday: bowelMovementsTodayvalue,
    digestiveDiscomfort: digestiveDiscomfortvalue,
    itchingIntensity: itchingIntensityvalue,
    psoriasisScaling: psoriasisScalingvalue,
  };

  useEffect(() => {
    async function getRoutineData() {
      let D = routineDataCtx.routineData;
      setwellSleepLastNight(D.wellSleepLastNight);
      setSleepingHoursLastNight(D.sleepingHoursLastNight);
      setstressLevel(D.stressLevel);
      setExerciseTimeToday(D.ExerciseTimeToday);
      setSliderValue(D.workoutIntensity);
      setamountOfWaterToday(D.amountOfWaterToday);
      setbowelMovementsToday(D.bowelMovementsToday);
      setdigestiveDiscomfort(D.digestiveDiscomfort);
      setitchingIntensity(D.itchingIntensity);
      setpsoriasisScaling(D.psoriasisScaling);
    }
    getRoutineData();
  }, []);

  async function postRoutine() {
    setLoading(true);
    try {
      const response = await getRoutinefunction(
        routineDataCtx,
        routineDataCtx.routineDay
      );
      if (
        (routineDataCtx.routineDay == "today" ||
          routineDataCtx.routineDay == "yesterday") &&
        response.routine.length == 0
      ) {
        await postRoutineHandler(dailyRoutinedata).then((v) =>
          ToastAndroid.show(v.message, ToastAndroid.SHORT)
        );
      } else {
        await updateRoutinefunction(
          dailyRoutinedata,
          response.routine[0]._id
        ).then((v) => ToastAndroid.show(v.message, ToastAndroid.SHORT));
      }
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }

  const getSliderTag = () => {
    if (sliderValue > 0 && sliderValue <= 1) {
      return "Light";
    } else if (sliderValue > 1 && sliderValue <= 2) {
      return "Moderate";
    } else if (sliderValue > 2 && sliderValue <= 3) {
      return "Vigorous";
    } else if (sliderValue > 3 && sliderValue <= 4) {
      return "Very Vigorous";
    } else {
      return "No workout";
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="green" />
      {/* Appbar Items */}
      <View style={styles.appbarContainer}>
        <View style={styles.appbarFlexBox}>
          <Icon
            name="arrow-left"
            color={"white"}
            size={20}
            onPress={() => navigation.goBack()}
          />

          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "white",
              }}
            >
              Daily Routine Log
            </Text>
            <Text style={{ fontSize: 12, color: "white" }}>
              Questions 1 out of 10
            </Text>
          </View>
        </View>
      </View>
      {/* Body Items */}

      <ScrollView style={styles.scrollViewStyle}>
        {/* Question One */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q1: </Text>
            <Text style={styles.question}>
              How well did you sleep last night?
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Insights", { routeType: "Exercise" })
              }
            >
              <View style={styles.detailIconBoxStyle}>
                <Image
                  source={require("../../assets/ques.png")}
                  style={styles.detailIconStyle}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.ratingBarBox}>
            {maxRating.map((item, key) => {
              return (
                <CustomRatingBar
                  moods={[
                    "Awesome",
                    "Good",
                    "Just okay\n(average)",
                    "Poor",
                    "Extremely\npoor",
                  ]}
                  callBack={() => setwellSleepLastNight(item)}
                  item={item}
                  defaultRating={wellSleepLastNightvalue}
                  moodKey={key}
                />
              );
            })}
          </View>
        </View>
        {/* Question Two */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q2: </Text>
            <Text style={styles.question}>
              How many hours of sleep did you get last night?
            </Text>
          </View>
          <View style={styles.ratingBarBox}>
            <InDeCount
              itemValue={"Hours"}
              onMinus={() =>
                setSleepingHoursLastNight(sleepingHoursLastNightvalue - 1)
              }
              onPlus={() =>
                setSleepingHoursLastNight(sleepingHoursLastNightvalue + 1)
              }
              quantity={sleepingHoursLastNightvalue}
            />
          </View>
          <View style={styles.ratingBarBox}>
            <Text style={styles.recomendedStyle}>Recommended - 8 hours</Text>
            <Image
              source={require("../../assets/ques.png")}
              style={styles.detailIconStyle}
            />
          </View>
        </View>
        {/* Question Three */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q3: </Text>
            <Text style={styles.question}>
              What is your stress level like today?
            </Text>
            <View style={styles.detailIconBoxStyle}>
              <Image
                source={require("../../assets/ques.png")}
                style={styles.detailIconStyle}
              />
            </View>
          </View>
          <View style={styles.ratingBarBox}>
            {maxRating.map((item, key) => {
              return (
                <CustomRatingBar
                  moods={[
                    "Not at all\nstressed",
                    "Little bit\nstressed",
                    "Moderately\nstressed",
                    "Very\nstressed",
                    "Extremely\nstressed",
                  ]}
                  callBack={() => setstressLevel(item)}
                  item={item}
                  defaultRating={stressLevelvalue}
                  moodKey={key}
                />
              );
            })}
          </View>
        </View>
        {/* Question Four */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q4: </Text>
            <Text style={styles.question}>
              For how long did you exercise today?
            </Text>
            <View style={styles.detailIconBoxStyle}>
              <Image
                source={require("../../assets/ques.png")}
                style={styles.detailIconStyle}
              />
            </View>
          </View>
          <View style={styles.ratingBarBox}>
            <InDeCount
              itemValue={"minutes"}
              onMinus={() => {
                isChecked === true
                  ? null
                  : setExerciseTimeToday(ExerciseTimeTodayvalue - 1);
              }}
              onPlus={() => {
                isChecked === true
                  ? null
                  : setExerciseTimeToday(ExerciseTimeTodayvalue + 1);
              }}
              quantity={ExerciseTimeTodayvalue}
            />
          </View>
          <View style={styles.ratingBarBox}>
            <Text style={styles.recomendedStyle}>
              Recommended - 30-40 minutes
            </Text>
            <Image
              source={require("../../assets/ques.png")}
              style={styles.detailIconStyle}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: 25,
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              <CheckBox
                checked={isChecked}
                onPress={() => {
                  setChecked(!isChecked);
                  setExerciseTimeToday(0);
                }}
              />
            </View>
            <Text style={{ fontWeight: "500" }}>Didn't Exercise</Text>
          </View>
        </View>
        {/* Question Five */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q5: </Text>
            <Text style={styles.question}>How intense was your workout?</Text>
            <View style={styles.detailIconBoxStyle}>
              <Image
                source={require("../../assets/ques.png")}
                style={styles.detailIconStyle}
              />
            </View>
          </View>
          <View>
            <Slider
              style={{
                width: "90%",
                height: 40,
                alignSelf: "center",
              }}
              onValueChange={(v) => setSliderValue(v)}
              minimumValue={0}
              maximumValue={4}
              value={sliderValue}
              minimumTrackTintColor="#75c98a"
              maximumTrackTintColor="#000000"
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ alignItems: "center", color: "red" }}>
              {getSliderTag()}
            </Text>
          </View>
        </View>
        {/* Question Six */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q6: </Text>
            <Text style={styles.question}>
              How much water did you drink today?
            </Text>
            <View style={styles.detailIconBoxStyle}>
              <Image
                source={require("../../assets/ques.png")}
                style={styles.detailIconStyle}
              />
            </View>
          </View>
          <View style={styles.ratingBarBox}>
            <InDeCount
              itemValue={"glasses"}
              onMinus={() => setamountOfWaterToday(amountOfWaterTodayvalue - 1)}
              onPlus={() => setamountOfWaterToday(amountOfWaterTodayvalue + 1)}
              quantity={amountOfWaterTodayvalue}
            />
            {/* <InDeCount itemValue={"glasses"} /> */}
          </View>
          <View style={styles.ratingBarBox}>
            <Text style={styles.recomendedStyle}>
              1 Glass = 240 ml (8 fl oz)
            </Text>
            <Image
              source={require("../../assets/ques.png")}
              style={styles.detailIconStyle}
            />
          </View>
        </View>
        {/* Question Seven */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q7: </Text>
            <Text style={styles.question}>
              How many bowel movements you have today?
            </Text>
            <View style={styles.detailIconBoxStyle}>
              <Image
                source={require("../../assets/ques.png")}
                style={styles.detailIconStyle}
              />
            </View>
          </View>
          <View style={styles.ratingBarBox}>
            <InDeCount
              itemValue={""}
              onMinus={() => {
                isbowelChecked === true
                  ? null
                  : setbowelMovementsToday(bowelMovementsTodayvalue - 1);
              }}
              onPlus={() => {
                isbowelChecked === true
                  ? null
                  : setbowelMovementsToday(bowelMovementsTodayvalue + 1);
              }}
              quantity={bowelMovementsTodayvalue}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: 25,
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              <CheckBox
                checked={isbowelChecked}
                onPress={() => {
                  setBowelChecked(!isbowelChecked);
                  setbowelMovementsToday(0);
                }}
              />
            </View>
            <Text style={{ fontWeight: "500" }}>No bowel movements</Text>
          </View>
        </View>

        {/* Question Eight */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q8: </Text>
            <Text style={styles.question}>
              Did you experience digestive discomfort such as bloating, gas, &
              abdominal pain?
            </Text>
            <View style={styles.detailIconBoxStyle}>
              <Image
                source={require("../../assets/ques.png")}
                style={styles.detailIconStyle}
              />
            </View>
          </View>
          <View style={styles.ratingBarBox}>
            {maxRating.map((item, key) => {
              return (
                <CustomRatingBar
                  moods={[
                    "Not at all",
                    "Somewhat",
                    "Moderately",
                    "Very\nhigh",
                    "Extremely\nHigh",
                  ]}
                  callBack={() => setdigestiveDiscomfort(item)}
                  item={item}
                  defaultRating={digestiveDiscomfortvalue}
                  moodKey={key}
                />
              );
            })}
            {/* <CustomRatingBar
              moods={[
                "Not at all",
                "Somewhat",
                "Moderately",
                "Very\nhigh",
                "Extremely\nHigh",
              ]}
            /> */}
          </View>
        </View>
        {/* Question Nine */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q9: </Text>
            <Text style={styles.question}>
              How would you rate today's itching intensity?
            </Text>
            <View style={styles.detailIconBoxStyle}>
              <Image
                source={require("../../assets/ques.png")}
                style={styles.detailIconStyle}
              />
            </View>
          </View>
          <View style={styles.ratingBarBox}>
            {maxRating.map((item, key) => {
              return (
                <CustomRatingBar
                  moods={[
                    "No itch",
                    "Little bit",
                    "Moderately",
                    "High",
                    "Very high",
                  ]}
                  callBack={() => setitchingIntensity(item)}
                  item={item}
                  defaultRating={itchingIntensityvalue}
                  moodKey={key}
                />
              );
            })}
            {/* <CustomRatingBar
              moods={[
                "No itch",
                "Little bit",
                "Moderately",
                "High",
                "Very high",
              ]}
            /> */}
          </View>
        </View>

        {/* Question Ten */}
        <View style={styles.Q_tileStyle}>
          <View style={styles.questioBoxStyle}>
            <Text style={styles.questionNO}>Q10: </Text>
            <Text style={styles.question}>
              How about psoriasis scaling and flaking?
            </Text>
            <View style={styles.detailIconBoxStyle}>
              <Image
                source={require("../../assets/ques.png")}
                style={styles.detailIconStyle}
              />
            </View>
          </View>
          <View style={styles.ratingBarBox}>
            {maxRating.map((item, key) => {
              return (
                <CustomRatingBar
                  moods={[
                    "No flaking",
                    "Little bit",
                    "Moderately",
                    "High",
                    "Very high",
                  ]}
                  callBack={() => setpsoriasisScaling(item)}
                  item={item}
                  defaultRating={psoriasisScalingvalue}
                  moodKey={key}
                />
              );
            })}
            {/* <CustomRatingBar
              moods={[
                "No flaking",
                "Little bit",
                "Moderately",
                "High",
                "Very high",
              ]}
            /> */}
          </View>
        </View>

        <FlatButton btnName={"Save"} callBack={postRoutine} />
      </ScrollView>
      {isLoading ? <CustomeLoaderState /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    flex: 1,

    alignItems: "flex-start",
  },

  Q_tileStyle: {
    borderRadius: 15,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
  },

  questioBoxStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  detailIconStyle: { height: 15, width: 15 },
  detailIconBoxStyle: { width: 40, alignSelf: "center", alignItems: "center" },

  appbarContainer: {
    width: "100%",
    // flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "green",
  },

  recomendedStyle: {
    fontSize: 13,
    fontWeight: "600",
    color: "green",
    marginRight: 10,
  },

  ratingBarBox: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  appbarFlexBox: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },

  scrollViewStyle: { width: "100%", padding: 5, backgroundColor: "#eee" },

  questionNO: {
    fontSize: 16,
    width: 45,
    fontWeight: "600",
    color: "green",
    marginTop: 10,
  },

  question: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "justify",
    marginTop: 10,
  },
});

export default DailyRoutine;
