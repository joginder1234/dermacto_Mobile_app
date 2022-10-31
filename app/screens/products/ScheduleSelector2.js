import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { uploadScheduleFunction } from "../../backend/data_handler";
import { DataContext } from "../../context/AppDataContext";
import getRoutineArray from "../../helpers/appfunctions";

function ScheduleSelector2({ isVisible, productId }) {
  const navigation = useNavigation();
  const AppData = useContext(DataContext);
  const [checked, setChecked] = React.useState("first");
  const [ischecked, setisChecked] = React.useState("one");
  const [pickedDate, setPickDate] = useState(new Date().toLocaleDateString());
  const [DatePickeVisible, setDatePickerVisible] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("7 days");
  const [timeDropDownValue, setTimeDropDownValue] = useState("Morning");
  let [selectedTime, SelectTime] = useState(timeDropDownValue);
  let [isloading, setLoading] = useState(false);
  const [DaysOfWeek, setWeekDayData] = useState([
    {
      id: 1,
      title: "Mo",
      label: "Monday",
      isActive: false,
    },
    {
      id: 2,
      title: "Tu",
      label: "Tuesday",
      isActive: false,
    },
    {
      id: 3,
      title: "We",
      label: "Wednesday",
      isActive: false,
    },
    {
      id: 4,
      title: "Th",
      label: "Thursday",
      isActive: false,
    },
    {
      id: 5,
      title: "Fr",
      label: "Friday",
      isActive: false,
    },
    {
      id: 6,
      title: "Sa",
      label: "Saturday",
      isActive: false,
    },
    {
      id: 7,
      title: "Su",
      label: "Sunday",
      isActive: false,
    },
  ]);

  let timeDropdown = ["Morning", "Evening", "Night"];

  function daySelectionHandler(item) {
    let newDayData = [...DaysOfWeek];
    newDayData[DaysOfWeek.indexOf(item)] = {
      id: item.id,
      title: item.title,
      label: item.label,
      isActive: !item.isActive,
    };
    setWeekDayData(newDayData);
  }

  function getmonthDays() {
    let days = [];

    for (let i = 1; i <= 30; i++) {
      days.push(i + " days");
    }
    return days;
  }

  async function onScheduleSubmit() {
    setLoading(true);

    let scheduleArray = DaysOfWeek.map((day) => {
      return {
        day: day.label,
        selected:
          checked === "first"
            ? true
            : checked === "second"
            ? day.isActive
            : dropDownValue,
        medicineTaken: getRoutineArray(selectedTime),
      };
    });
    // console.log(AppData.selectedProductType);
    let schedule = {
      productId: productId,
      type: AppData.selectedProductType,
      schedule: selectedTime.toLowerCase(),
      SelectedDays: scheduleArray,
    };
    // console.log("Prepared Schedule Schema");
    // console.log(schedule);
    await uploadScheduleFunction(schedule, AppData).then((v) => {
      setLoading(false);
    });
  }

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
        {console.log(getmonthDays())}
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

      {checked === "second" && (
        <>
          <Text
            style={{
              fontSize: 12,
              color: "grey",
              marginVertical: 5,
              marginHorizontal: 10,
              alignSelf: "center",
              backgroundColor: "#eee",
              padding: 10,
              width: "100%",
              textAlign: "center",
            }}
          >
            Tap on days to select :
          </Text>
          <View
            style={{
              width: Dimensions.get("screen").width,
              padding: 5,
            }}
          >
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={DaysOfWeek}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    daySelectionHandler(item);
                  }}
                >
                  <View
                    style={[
                      styles.DaysOfWeekContainer,
                      item.isActive && styles.DaysOfWeekContainerSelected,
                    ]}
                  >
                    <Text
                      style={
                        item.isActive && {
                          color: "white",
                        }
                      }
                    >
                      {item.title}
                    </Text>
                  </View>
                </Pressable>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              marginTop: 20,
              borderBottomColor: "#B2B2B2",
            }}
          />
        </>
      )}
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

      {checked === "third" && (
        <>
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginVertical: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ marginRight: 10 }}>Start Date</Text>
              <View
                style={{
                  borderWidth: 1,
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 5,
                  borderColor: "#B2B2B2",
                }}
              >
                <Text style={{ fontSize: 16, color: "green" }}>
                  {" "}
                  {pickedDate}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            maximumDate={new Date(Date.now())}
            date={new Date(Date.now())}
            isVisible={DatePickeVisible}
            mode="date"
            onConfirm={(date) => {
              setPickDate(date.toLocaleDateString());
              setDatePickerVisible(false);
            }}
            onCancel={() => setDatePickerVisible(false)}
          />

          <SelectDropdown
            buttonStyle={{
              borderWidth: 1,
              marginHorizontal: 20,
              marginVertical: 10,
              width: "40%",
              borderRadius: 10,
              borderColor: "#b2b2b2",
              backgroundColor: "white",
              // alignSelf: "center",
            }}
            dropdownStyle={{
              borderRadius: 20,
            }}
            onSelect={(v) => setDropDownValue(v)}
            data={getmonthDays()}
            renderItem={(item) => (
              <View
                style={{
                  alignItems: "center",
                  borderBottomWidth: 1,
                  padding: 10,
                  backgroundColor: "white",
                  marginHorizontal: 10,
                }}
              >
                <Text>{item}</Text>
              </View>
            )}
          />
        </>
      )}

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
          onPress={() => {
            setisChecked("one");
            SelectTime(timeDropDownValue);
          }}
        />
        <View style={{ width: 20 }} />
        <Text style={{ flex: 1 }}>Once</Text>
        {ischecked === "one" && (
          <SelectDropdown
            dropdownStyle={{
              borderRadius: 10,
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
            buttonStyle={{
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 10,
            }}
            data={timeDropdown}
            onSelect={(v) => setTimeDropDownValue(v)}
          />
        )}
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
          onPress={() => {
            setisChecked("two");
            SelectTime("Both");
          }}
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
          onPress={() => {
            setisChecked("three");
            SelectTime("Thrice");
          }}
        />
        <View style={{ width: 20 }} />
        <Text>3 times a day</Text>
      </View>
      <Pressable
        android_ripple={{ color: "#eee" }}
        onPress={() => {
          onScheduleSubmit();
          navigation.goBack();
        }}
        style={[styles.buttonStyle, { alignSelf: "center", marginBottom: 40 }]}
      >
        <View>
          {isloading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <Text style={{ fontSize: 15, fontWeight: "500" }}>Save</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}

export default ScheduleSelector2;

const styles = StyleSheet.create({
  DaysOfWeekContainer: {
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "red",
    elevation: 2,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  DaysOfWeekContainerSelected: {
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: "green",
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "red",
    elevation: 2,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  buttonStyle: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    alignItems: "center",
    borderColor: "black",
    marginTop: 20,
    justifyContent: "center",
    width: 100,
    overflow: "hidden",
  },
});
