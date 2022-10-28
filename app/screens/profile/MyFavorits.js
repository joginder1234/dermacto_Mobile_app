import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import colors from "../../config/colors";
import CustomeAppbar from "../re_usable/Appbar";

function MyFavorits({ navigation }) {
  return (
    <View style={styles.screenStyle}>
      <CustomeAppbar navigation={navigation} title={"My Favorites"} />
      <View style={{ padding: 15 }}>
        <View style={styles.btnStyle}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Daily Affirmations
          </Text>
          <Image
            source={require("../../assets/icons/ios_rightArrow.png")}
            resizeMode={"contain"}
            style={styles.iconStyle}
          />
        </View>
        <View style={styles.btnStyle}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Meditations</Text>
          <Image
            source={require("../../assets/icons/ios_rightArrow.png")}
            resizeMode={"contain"}
            style={styles.iconStyle}
          />
        </View>
        <View style={styles.btnStyle}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Sounds</Text>
          <Image
            source={require("../../assets/icons/ios_rightArrow.png")}
            resizeMode={"contain"}
            style={styles.iconStyle}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    width: "100%",
    height: "100%",
  },
  btnStyle: {
    backgroundColor: colors.whiteColor,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconStyle: { height: 20, width: 20 },
});

export default MyFavorits;
