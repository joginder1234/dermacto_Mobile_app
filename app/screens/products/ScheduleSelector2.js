import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

function ScheduleSelector2({ isVisible }) {
  const [checked, setChecked] = React.useState("first");
  const [ischecked, setisChecked] = React.useState("one");
  return isVisible ? (
    <View />
  ) : (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "700", marginLeft: 20 }}>
        How often do you take it?
      </Text>
      {/* Everyday tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="first"
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setChecked("first")}
        />
        <View style={{ width: 20 }} />
        <Text>Everyday</Text>
      </View>
      {/* Specific days of week tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="second"
          status={checked === "second" ? "checked" : "unchecked"}
          onPress={() => setChecked("second")}
        />
        <View style={{ width: 20 }} />
        <Text>Specific days of week</Text>
      </View>
      {/* X number of days tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="third"
          status={checked === "third" ? "checked" : "unchecked"}
          onPress={() => setChecked("third")}
        />
        <View style={{ width: 20 }} />
        <Text>Every X number of days</Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        Frequency per day?
      </Text>
      {/* Frequency once tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="one"
          status={ischecked === "one" ? "checked" : "unchecked"}
          onPress={() => setisChecked("one")}
        />
        <View style={{ width: 20 }} />
        <Text>Once</Text>
      </View>
      {/* frequency twice tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="two"
          status={ischecked === "two" ? "checked" : "unchecked"}
          onPress={() => setisChecked("two")}
        />
        <View style={{ width: 20 }} />
        <Text>Twice</Text>
      </View>
      {/* frequency 3 times a day tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="three"
          status={ischecked === "three" ? "checked" : "unchecked"}
          onPress={() => setisChecked("three")}
        />
        <View style={{ width: 20 }} />
        <Text>3 times a day</Text>
      </View>
    </View>
  );
}

export default ScheduleSelector2;
