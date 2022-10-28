import React, { useState } from "react";
import { View, StyleSheet, Text, Switch, FlatList } from "react-native";
import CustomeAppbar from "../re_usable/Appbar";
import colors from "../../config/colors";

function Reminder({ navigation }) {
  let [lifestyleState, setLifeStyleState] = useState(false);
  let [mediState, setMediState] = useState(false);
  let [affirmState, setAffirmState] = useState(false);
  let [sleepState, setSleepState] = useState(false);

  return (
    <View style={styles.screenStyle}>
      <CustomeAppbar title={"Reminders"} navigation={navigation} />
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 18, marginVertical: 10 }}>
          Reminder for: -
        </Text>
        <View style={styles.cardStyle}>
          <View style={styles.btnStyle}>
            <Text style={{ fontSize: 18, flex: 1 }}>
              Daily lifestyle and treatment tracking
            </Text>
            <Switch
              style={{ marginLeft: 10 }}
              value={lifestyleState}
              onValueChange={(v) => setLifeStyleState(v)}
            />
          </View>
          <View style={styles.btnStyle}>
            <Text style={{ fontSize: 18, flex: 1 }}>Meditation</Text>
            <Switch
              style={{ marginLeft: 10 }}
              value={mediState}
              onValueChange={(v) => setMediState(v)}
            />
          </View>
          <View style={styles.btnStyle}>
            <Text style={{ fontSize: 18, flex: 1 }}>Affirmations</Text>
            <Switch
              style={{ marginLeft: 10 }}
              value={affirmState}
              onValueChange={(v) => setAffirmState(v)}
            />
          </View>
          <View style={styles.btnStyle}>
            <Text style={{ fontSize: 18, flex: 1 }}>Sleep</Text>
            <Switch
              style={{ marginLeft: 10 }}
              value={sleepState}
              onValueChange={(v) => setSleepState(v)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    height: "100%",
    width: "100%",
  },
  cardStyle: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
    padding: 15,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: colors.whiteColor,
    borderRadius: 15,
    // padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default Reminder;
