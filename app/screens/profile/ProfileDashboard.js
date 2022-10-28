import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
} from "react-native";
import colors from "../../config/colors";
import ProfileButton from "../re_usable/ProfileButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { useContext } from "react";
import { DataContext } from "../../context/AppDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileDashboard({ navigation }) {
  async function LogoutHandler() {
    await AsyncStorage.removeItem("authToken");
    navigation.navigate("Onboarding");
  }

  const dataContext = useContext(DataContext);
  let myProfile = dataContext.userProfile;
  return (
    <View>
      <View style={styles.appbarContainer}>
        <View style={styles.appbarFlexBox}>
          <Icon
            name="arrow-left"
            color={"white"}
            size={20}
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.appbarTitle}>Profile View</Text>
        </View>
      </View>

      <View style={styles.screenStyle}>
        <View style={[styles.cardTile, { flexDirection: "row" }]}>
          <View
            style={[styles.AvatarStyle, styles.centerItems, styles.addBorder]}
          >
            <ImageBackground
              resizeMode="cover"
              borderRadius={100}
              source={require("../../assets/avatar.jpg")}
              style={styles.AvatarStyle}
            />
          </View>
          <View style={styles.userInfoStyle}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {myProfile.username}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>
              {myProfile.email}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.cardTile}>
            <ProfileButton
              title={"My Profile"}
              showBottom={true}
              icon={require("../../assets/icons/icon_profile.png")}
              callBack={() => navigation.navigate("MyProfileScreen")}
            />
            <ProfileButton
              title={"My Treatment Routine"}
              showBottom={true}
              icon={require("../../assets/icons/icon_treatment.png")}
              callBack={() => navigation.navigate("TreatmentRoutine")}
            />
            <ProfileButton
              title={"My Favorite"}
              showBottom={true}
              icon={require("../../assets/icons/favorite.png")}
              callBack={() => navigation.navigate("Favorites")}
            />
            <ProfileButton
              title={"My Reminders"}
              showBottom={true}
              icon={require("../../assets/icons/reminder.png")}
              callBack={() => navigation.navigate("ReminderView")}
            />
            <ProfileButton
              title={"Contact Us / Feedback"}
              showBottom={true}
              icon={require("../../assets/icons/feedback.png")}
              callBack={() => navigation.navigate("ContactView")}
            />
            <ProfileButton
              title={"About Us"}
              showBottom={true}
              icon={require("../../assets/icons/about.png")}
            />
            <ProfileButton
              title={"Privacy Policy"}
              showBottom={true}
              icon={require("../../assets/icons/privacy.png")}
            />
            <ProfileButton
              title={"Terms of Service"}
              showBottom={true}
              icon={require("../../assets/icons/terms.png")}
            />
            <ProfileButton
              title={"Logout"}
              icon={require("../../assets/icons/logout.png")}
              callBack={LogoutHandler}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appbarContainer: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primaryColor,
  },

  appbarTitle: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "700",
    color: "white",
  },
  appbarFlexBox: {
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  screenStyle: {
    width: "100%",
    height: "100%",
    padding: 15,
  },
  cardTile: {
    width: "100%",
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: colors.whiteColor,
  },
  AvatarStyle: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },

  centerItems: {
    alignItems: "center",
    justifyContent: "center",
  },
  addBorder: {
    borderWidth: 1,
  },
  userInfoStyle: {
    flex: 1,
    marginLeft: 20,
    paddingVertical: 20,
    justifyContent: "space-evenly",
  },
});

export default ProfileDashboard;
