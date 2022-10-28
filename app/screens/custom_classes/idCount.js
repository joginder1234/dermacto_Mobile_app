import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

function InDeCount({ itemValue, onMinus, onPlus, quantity }) {
  // const [quantity, setquantity] = useState(1);
  // const handleIncrement = () => setquantity(quantity + 1);
  // let handleDecrement = () => setquantity(quantity - 1);
  // if (quantity <= 1) {
  //   handleDecrement = () => setquantity(1);
  // }
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity style={styles.roundButton} onPress={onMinus}>
        <Image
          source={require("../../assets/minus.png")}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.counterStyle}>{quantity}</Text>
        <Text> {itemValue}</Text>
      </View>
      <TouchableOpacity style={styles.roundButton} onPress={onPlus}>
        <Image
          source={require("../../assets/add.png")}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "white",
  },

  counterStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});

export default InDeCount;
