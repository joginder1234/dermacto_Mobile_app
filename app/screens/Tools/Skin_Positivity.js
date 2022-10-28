import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import colors from "../../config/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import CarauselView from "./CarauselView";

function Skin_Positivity({ navigation, route }) {
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
    <View style={{ width: "100%", height: "100%" }}>
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
          <Text style={styles.titleStyle}>Voice Affirmations</Text>
          <CarauselView slider={slider} />
        </View>
        <View style={styles.tileBoxStyle}>
          <Text style={styles.titleStyle}>Text Affirmations</Text>
          <CarauselView slider={slider} />
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
});

export default Skin_Positivity;
