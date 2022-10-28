import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  ScrollView,
} from "react-native";

function TropicalTile(params) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="green" />
      {/* Appbar Items */}
      <View style={styles.appbarContainer}>
        <View style={styles.appbarFlexBox}>
          <Image
            source={require("../../../assets/navback.png")}
            style={{ width: 50, height: 27, tintColor: "white" }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "white",
            }}
          >
            Topicals (external application)
          </Text>
        </View>
      </View>

      {/* Body Items */}
      <ScrollView style={styles.scrollViewStyle}>
        <Image
          source={require("../../../assets/add.png")}
          style={{
            width: 40,
            height: 40,
            resizeMode: "cover",
            tintColor: "green",
            alignSelf: "center",
          }}
        />
        <Image
          source={require("../../../assets/cosmetics.png")}
          style={{
            width: 80,
            height: 80,
            resizeMode: "cover",
            alignSelf: "center",
            marginTop: 60,
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "green",
            marginBottom: 20,
          }}
        >
          List down all the skin and scalp care products you use for psoriasis
          healing.
        </Text>
        <Text style={{ fontSize: 19, fontWeight: "700", marginBottom: 20 }}>
          Add products by clicking the + button.
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "500" }}>
          During daily log, you will check adherence to this routine.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  appbarContainer: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "green",
  },
  appbarFlexBox: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  scrollViewStyle: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: "#eee",
  },
});

export default TropicalTile;
