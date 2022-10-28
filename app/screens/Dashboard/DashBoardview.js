import React, { useContext, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  number,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ColorPlate from "../../config/colors";
import Icon_mat from "react-native-vector-icons/MaterialCommunityIcons";
import Fa_Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../config/colors";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { DataContext } from "../../context/AppDataContext";
import { getRoutinefunction } from "../../backend/data_handler";
import CustomeLoaderState from "../custom_classes/custome_loader";
import { useEffect } from "react";

function DashBoardview({ navigation }) {
  const AppData = useContext(DataContext);
  const stressData = [
    {
      id: 1,
      URL: "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2019/06/11/17/48/yoga-8col-widenshot_6_-110.jpg",
    },
    {
      id: 2,
      URL: "https://www.anahana.com/hs-fs/hubfs/workplace-stress-management-concept-calm-man-practicing-yoga-700.jpg?width=740&name=workplace-stress-management-concept-calm-man-practicing-yoga-700.jpg",
    },
    {
      id: 3,
      URL: "https://extension.usu.edu/relationships/images/why-stress-management-strategies-work.jpg",
    },
  ];
  const carauselRef =
    useRef < FlatList < { id: number, URL: String } > null > null;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isloading, setLoading] = useState(false);
  /* Routine States :: Full, Edit, Restricted */
  const [showRoutineState, setRoutineState] = useState("Full");
  const [isEdit, setIsEdit] = useState(false);
  const [getDate, setDate] = useState("");
  const onViewRef = useRef(({ changed }) => {
    if (changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    }
  });

  useEffect(() => {
    function getinitDate() {
      let date = new Date().toDateString();
      setDate(date);
      AppData.setroutineDay("today");
    }
    getinitDate();
  }, []);

  const EditBtn = () => {
    switch (showRoutineState) {
      case "Restricted":
        return (
          <TouchableOpacity
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginRight: 25,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              alert(
                "Sorry! You cannot submit the entries for any older day beyond yesterday."
              );
            }}
          >
            <Ionicons name="warning" size={30} color="red" />
          </TouchableOpacity>
        );
      case "Edit":
        return isEdit ? (
          <TouchableOpacity
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginRight: 25,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("DailyRoutine");
            }}
          >
            <Text style={{ fontSize: 13, color: "grey", fontWeight: "500" }}>
              Details
            </Text>
            <Ionicons
              name="arrow-forward"
              size={15}
              color="grey"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsEdit(true);
            }}
            style={{ justifyContent: "center" }}
          >
            <View style={styles.appLeadingStyle}>
              <Fa_Icon name="edit" size={20} />
            </View>
          </TouchableOpacity>
        );
      case "Full":
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DailyRoutine");
            }}
            style={{ justifyContent: "center" }}
          >
            <View style={styles.appLeadingStyle}>
              <Fa_Icon name="edit" size={20} />
            </View>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  function Answers() {
    switch (AppData.routineData.wellSleepLastNight) {
      case 1:
        return "Awesome";
      case 2:
        return "Good";
      case 3:
        return "Just okay";
      case 4:
        return "Poor";
      default:
        return "Extremely poor";
    }
  }

  async function onDaySelection(day) {
    setLoading(true);
    await getRoutinefunction(AppData, day).then((_) => setLoading(false));
  }
  return (
    <View style={styles.pageViewStyle}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={colors.primaryColor}
      />
      {/*App Bar Setup */}
      <View style={styles.appbarStyle}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileView")}>
          <View style={styles.appLeadingStyle}>
            <Fa_Icon name="user" size={20} style={{ color: "white" }} />
          </View>
        </TouchableOpacity>
        <View style={styles.appbarTitleContainerStyle}>
          <Text style={styles.appbarTitleStyle}>
            Hello! {AppData.userProfile.username}
          </Text>
        </View>
        <View style={styles.appLeadingStyle}>
          <Fa_Icon
            name="user"
            size={20}
            style={{ color: colors.primaryColor }}
          />
        </View>
      </View>

      {/* Body Setup */}
      <ScrollView style={{ padding: 20 }}>
        <CalendarStrip
          iconLeftStyle={{ marginRight: 10 }}
          iconRightStyle={{ marginLeft: 10 }}
          style={{ height: 70 }}
          onDateSelected={(date) => {
            let selectedDate = new Date(date);
            if (selectedDate.getDate() === new Date().getDate()) {
              onDaySelection("today");
              setRoutineState("Full");
              AppData.setroutineDay("today");
              setIsEdit(false);
            } else if (selectedDate.getDate() === new Date().getDate() - 1) {
              onDaySelection("yesterday");
              setRoutineState("Edit");
              AppData.setroutineDay("yesterday");
            } else {
              null;
              setRoutineState("Restricted");
              setIsEdit(false);
            }
            setDate(selectedDate.toDateString());
          }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: "black",
          }}
          datesWhitelist={[
            {
              start: moment().clone().startOf("month").format("YYYY-MM-DD"),
              end: moment().clone().endOf("day").format("YYYY-MM-DD"),
            },
            moment(),
          ]}
        />

        <View style={{ marginTop: 20 }} />

        <Text
          style={{
            fontSize: 16,
            alignSelf: "center",
            marginBottom: 10,
            fontWeight: "500",
            color: colors.primaryColor,
          }}
        >
          {showRoutineState === "Full"
            ? "Today, " + getDate
            : showRoutineState === "Edit"
            ? "Yesterday, " + getDate
            : getDate}
        </Text>

        {/* Daily routine log tile */}
        <View style={[styles.activityTileStyle, { alignItems: "center" }]}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.appLeadingStyle}>
              <Fa_Icon name="sun-o" size={20} />
            </View>
            <View style={styles.activityTitleStyle}>
              <Text style={{ fontSize: 18 }}>Daily routine log</Text>
            </View>

            <EditBtn />
          </View>
          {isEdit && (
            <View
              style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 5 }}
            >
              <Text style={{ fontSize: 12, color: "grey", fontWeight: "500" }}>
                How well did you sleep last night?
              </Text>
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                <Answers />
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontWeight: "500",
                  marginTop: 5,
                }}
              >
                How many of hours of sleep did you get last night?
              </Text>
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                {AppData.routineData.sleepingHoursLastNight + " hours"}
              </Text>
            </View>
          )}
        </View>
        {/* Skincare Treatment Tile */}
        <View
          style={[
            styles.activityTileStyle,
            { flexDirection: "row", height: 50 },
          ]}
        >
          <View style={styles.appLeadingStyle}>
            <Icon_mat name="spray" size={20} />
          </View>
          <View style={styles.activityTitleStyle}>
            <Text style={{ fontSize: 18 }}>Skincare treatment log</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("TreatmentRoutine")}
            style={{ justifyContent: "center" }}
          >
            <View style={styles.appLeadingStyle}>
              <Fa_Icon name="edit" size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.activityTileStyle,
            { flexDirection: "row", height: 50 },
          ]}
        >
          <View style={styles.appLeadingStyle}>
            <Icon_mat name="noodles" size={20} />
          </View>
          <View style={styles.activityTitleStyle}>
            <Text style={{ fontSize: 18 }}>Daily diet log</Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Text>Comming</Text>
            <Text>Soon</Text>
          </View>
        </View>
        {/* Stress Management Carausel Slider Setup */}
        <View style={styles.carauselContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.carauselTitle}>
              <Icon_mat name="meditation" size={20} />
            </View>
            <View style={styles.activityTitleStyle}>
              <Text style={{ fontSize: 18 }}>Stress management</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Batter Sleep", {
                  title: "Stress Management",
                })
              }
            >
              <View style={styles.viewAllContainer}>
                <Text>View all</Text>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={stressData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // initialScrollIndex={{ activeIndex }}
            renderItem={({ item, i }) => {
              return (
                <ImageBackground
                  source={{ uri: item.URL }}
                  resizeMode={"cover"}
                  style={styles.carauselImageStyle}
                >
                  <View style={styles.carauselFooterStyle}>
                    <Text style={{ fontSize: 16 }}>
                      Mindfulness meditations to reduce stress
                    </Text>
                  </View>
                </ImageBackground>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            pagingEnabled={true}
          />
          <View style={styles.slideBtncontainer}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.slideBtnStyle}>
                <Fa_Icon name="arrow-left" size={15} color={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.slideBtnStyle}>
                <Fa_Icon name="arrow-right" size={15} color={"white"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Better Sleep Carausel Slider Setup */}
        <View style={styles.carauselContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.carauselTitle}>
              <Icon_mat name="power-sleep" size={20} />
            </View>
            <View style={styles.activityTitleStyle}>
              <Text style={{ fontSize: 18 }}>Better Sleep</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Batter Sleep", { title: "Batter Sleep" })
              }
            >
              <View style={styles.viewAllContainer}>
                <Text>View all</Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={stressData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, i }) => {
              return (
                <ImageBackground
                  source={{ uri: item.URL }}
                  resizeMode={"cover"}
                  style={styles.carauselImageStyle}
                >
                  <View style={styles.carauselFooterStyle}>
                    <Text style={{ fontSize: 16 }}>
                      Guided meditations for better sleep
                    </Text>
                  </View>
                </ImageBackground>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            pagingEnabled={true}
          />
          <View style={styles.slideBtncontainer}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.slideBtnStyle}>
                <Fa_Icon name="arrow-left" size={15} color={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.slideBtnStyle}>
                <Fa_Icon name="arrow-right" size={15} color={"white"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Skin Positivity Carausel Slider Setup */}
        <View style={styles.carauselContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.carauselTitle}>
              <Icon_mat name="human-scooter" size={20} />
            </View>
            <View style={styles.activityTitleStyle}>
              <Text style={{ fontSize: 18 }}>Skin Positivity</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SkinPositive", {
                  title: "Skin Positivity",
                })
              }
            >
              <View style={styles.viewAllContainer}>
                <Text>View all</Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={stressData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, i }) => {
              return (
                <ImageBackground
                  source={{ uri: item.URL }}
                  resizeMode={"cover"}
                  style={styles.carauselImageStyle}
                >
                  <View style={styles.carauselFooterStyle}>
                    <Text style={{ fontSize: 16 }}>
                      Affirmations - Your daily dose of self-love and confidence
                    </Text>
                  </View>
                </ImageBackground>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            pagingEnabled={true}
          />
          <View style={styles.slideBtncontainer}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.slideBtnStyle}>
                <Fa_Icon name="arrow-left" size={15} color={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.slideBtnStyle}>
                <Fa_Icon name="arrow-right" size={15} color={"white"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 10}}/>
      </ScrollView>
      {isloading ? <CustomeLoaderState /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pageViewStyle: {
    width: "100%",
    height: "100%",
  },
  appbarStyle: {
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: ColorPlate.primaryColor,
    position: "relative",
  },

  appLeadingStyle: {
    borderRadius: 100,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  appbarTitleContainerStyle: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  appbarTitleStyle: { fontSize: 18, fontWeight: "700", color: "white" },

  activityTileStyle: {
    shadowRadius: 20,
    shadowColor: "#7F8487",
    marginBottom: 10,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 15,
  },
  activityTitleStyle: {
    flex: 3,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  carauselContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },

  slideBtnStyle: {
    backgroundColor: "black",
    borderRadius: 500,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
  },

  slideBtncontainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    position: "absolute",
  },

  carauselTitle: {
    borderRadius: 100,
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  viewAllContainer: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    height: 30,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  carauselImageStyle: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 200,
    width: Dimensions.get("screen").width - 60,
  },

  carauselFooterStyle: {
    width: Dimensions.get("screen").width - 60,
    backgroundColor: "white",
    padding: 15,
  },
});

export default DashBoardview;
