import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";

const happyImg = require("../../assets/emoji/1.png");
const smileImg = require("../../assets/emoji/2.png");
const noReactionImg = require("../../assets/emoji/3.png");
const sadImg = require("../../assets/emoji/4.png");
const unhappyImg = require("../../assets/emoji/5.png");

function CustomRatingBar({ moods, callBack, item, defaultRating, moodKey }) {
  const getEmoji = () => {
    switch (moodKey) {
      case 0:
        return happyImg;
      case 1:
        return smileImg;
      case 2:
        return noReactionImg;
      case 3:
        return sadImg;

      default:
        return unhappyImg;
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      key={item + Date.now() + Math.random()}
      onPress={() => callBack(item)}
    >
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Image
          style={[
            styles.starImgStyle,
            { opacity: defaultRating >= item ? 1 : 0.4 },
          ]}
          source={getEmoji()}
        />
        <Text
          style={{ marginHorizontal: 5, fontSize: 10, textAlign: "center" }}
        >
          {moods ? moods[moodKey] : null}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  customRatingBarStyle: {
    width: "80%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  starImgStyle: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
});

export default CustomRatingBar;
