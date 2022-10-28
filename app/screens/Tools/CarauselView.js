import React from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

function CarauselView({ slider }) {
  return (
    <FlatList
      data={slider}
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
              <Text style={{ fontSize: 16, color: "white" }}>
                Mindfulness meditations to reduce stress
              </Text>
            </View>
            <View style={styles.playButtnContainer}>
              <Image
                source={require("../../assets/play.png")}
                resizeMode={"contain"}
                style={{ height: 50 }}
              />
            </View>
            <View style={styles.playtimeContainer}>
              <View style={{ padding: 5, backgroundColor: "black" }}>
                <Text style={{ color: "white" }}>06:00</Text>
              </View>
            </View>
          </ImageBackground>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
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

export default CarauselView;
