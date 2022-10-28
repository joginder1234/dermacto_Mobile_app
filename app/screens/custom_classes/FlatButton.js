import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colorPlate from "../../config/colors";

function FlatButton({ btnName, callBack }) {
  return (
    <TouchableOpacity onPress={callBack ? () => callBack() : null}>
      <View style={styles.buttonStyle}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
          {btnName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colorPlate.primaryColor,
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
});

export default FlatButton;
