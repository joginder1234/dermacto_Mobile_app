import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

function ProfileButton({ title, icon, showBottom, callBack }) {
  return (
    <View
      style={[
        showBottom ? { borderBottomWidth: 0.8, borderBottomColor: "grey" } : {},
        { marginVertical: 5 },
      ]}
    >
      <TouchableOpacity onPress={callBack ? () => callBack() : () => {}}>
        <View style={styles.buttonStyle}>
          <Image
            source={icon}
            resizeMode={"contain"}
            style={styles.iconStyle}
          />
          <View style={styles.btnTitle}>
            <Text style={styles.titleStyl}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    padding: 12,

    // marginBottom: 10,
  },
  btnTitle: {
    flex: 1,
  },
  titleStyl: { fontSize: 16, fontWeight: "600" },
  iconStyle: {
    height: 25,
    width: 25,
    marginRight: 15,
  },
});

export default ProfileButton;
