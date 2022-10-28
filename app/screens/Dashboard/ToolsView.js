import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import colors from "../../config/colors";

function ToolsView({ navigation }) {
  return (
    <View style={styles.screenViewStyle}>
      <View style={styles.appbarStyle}>
        <View style={styles.appbarTitleContainerStyle}>
          <Text style={styles.appbarTitleStyle}>Dermacto Tools</Text>
        </View>
      </View>
      <ScrollView style={{ padding: 15 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Batter Sleep", { title: "Batter Sleep" })
          }
        >
          <View style={styles.tileBoxStyle}>
            <Image
              source={require("../../assets/moon.png")}
              resizeMode={"contain"}
              style={styles.tileImageStyle}
            />
            <Text style={styles.titleStyle}>Better Sleep</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Batter Sleep", { title: "Stress Management" })
          }
        >
          <View style={styles.tileBoxStyle}>
            <Image
              source={require("../../assets/meditation.png")}
              resizeMode={"contain"}
              style={styles.tileImageStyle}
            />
            <Text style={styles.titleStyle}>Stress Managerment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SkinPositive", { title: "Skin Positivity" })
          }
        >
          <View style={styles.tileBoxStyle}>
            <Image
              source={require("../../assets/muscle.png")}
              resizeMode={"contain"}
              style={styles.tileImageStyle}
            />
            <Text style={styles.titleStyle}>Skin Positivity</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.tileBoxStyle}>
          <Image
            source={require("../../assets/gut.png")}
            resizeMode={"contain"}
            style={styles.tileImageStyle}
          />
          <Text style={styles.titleStyle}>Gut Health (Comming Soon)</Text>
        </View>
        <View style={styles.tileBoxStyle}>
          <Image
            source={require("../../assets/diet.png")}
            resizeMode={"contain"}
            style={styles.tileImageStyle}
          />
          <Text style={styles.titleStyle}>Diet (Comming Soon)</Text>
        </View>
      </ScrollView>
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

  tileBoxStyle: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },

  tileImageStyle: { height: 70, marginBottom: 5 },

  titleStyle: { fontSize: 18 },
  appbarTitleStyle: { fontSize: 18, fontWeight: "700", color: "white" },
});

export default ToolsView;
