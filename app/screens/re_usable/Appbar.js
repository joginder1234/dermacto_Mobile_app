import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../config/colors";

function CustomeAppbar({ navigation, title }) {
  return (
    <View style={styles.appbarContainer}>
      <View style={styles.appbarFlexBox}>
        <Icon
          name="arrow-left"
          color={"white"}
          size={20}
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.appbarTitle}>{title}</Text>
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
});

export default CustomeAppbar;
