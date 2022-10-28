import React from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../../config/colors";

function InsightView(props) {
  return (
    <View style={styles.screenViewStyle}>
      <View style={styles.appbarStyle}>
        <View style={styles.appbarTitleContainerStyle}>
          <Text style={styles.appbarTitleStyle}>Insights</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>This is Dermacto Insights View</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenViewStyle: {
    width: "100%",
    height: "100%",
  },
  appbarStyle: {
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: colors.primaryColor,
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
});

export default InsightView;
