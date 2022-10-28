import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import Icon from "react-native-vector-icons/FontAwesome";

import CarauselView from "./CarauselView";

function BatterSleep({ navigation, route }) {
  const slider = [
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
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={styles.appbarContainer}>
        <View style={styles.appbarFlexBox}>
          <Icon
            name="arrow-left"
            color={"white"}
            size={20}
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.appbarTitle}>{route.params.title}</Text>
        </View>
      </View>

      <ScrollView style={{ padding: 15 }}>
        <View style={styles.tileBoxStyle}>
          <Text style={styles.titleStyle}>Meditation</Text>
          <CarauselView slider={slider} />
        </View>
        <View style={styles.tileBoxStyle}>
          <Text style={styles.titleStyle}>Affirmations</Text>
          <CarauselView slider={slider} />
        </View>
        <View style={styles.tileBoxStyle}>
          <Text style={styles.titleStyle}>Sounds</Text>
          <CarauselView slider={slider} />
        </View>
        <View style={styles.tileBoxStyle}>
          <Text style={styles.titleStyle}>Knowledge bytes</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ArticleView", { title: "Knowledge bytes" })
            }
          >
            <CarauselView slider={slider} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  tileBoxStyle: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "flex-start",
    marginBottom: 10,
  },
  titleStyle: { fontSize: 18, marginBottom: 10, fontWeight: "600" },
  carauselImageStyle: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 180,
    width: Dimensions.get("screen").width - 60,
  },
  carauselFooterStyle: {
    width: Dimensions.get("screen").width - 60,
    backgroundColor: "black",
    padding: 15,
  },

  playButtnContainer: {
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
    position: "absolute",
  },
  playtimeContainer: {
    alignSelf: "flex-end",
    justifyContent: "flex-start",
    height: "100%",
    position: "absolute",
  },
});

export default BatterSleep;
