import { useContext } from "react";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CheckBox } from "react-native-btr";
import { markDoneFunction } from "../../backend/data_handler";
import { DataContext } from "../../context/AppDataContext";
import { getCheckList, getCurrentDay } from "../../helpers/appfunctions";
import CustomeLoaderState from "./custome_loader";

export default function CustomOthersTracker({ trackerData }) {
  const dataContext = useContext(DataContext);

  async function onChecked(data, id) {
    dataContext.setLoading(true);
    await markDoneFunction(data, id, dataContext).then((_) =>
      dataContext.setLoading(false)
    );
  }
  return (
    <>
      <FlatList
        data={trackerData}
        keyExtractor={(item) => {
          item.scheduleId;
        }}
        renderItem={({ item }) =>
          item.selectedDays.find((item) => item.day == getCurrentDay())
            .isSelected !== true ? null : (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              {console.log(
                "Tracker DAta ........................................"
              )}
              {console.log(trackerData)}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{
                      uri: item.productImage,
                    }}
                    resizeMode="cover"
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </View>
                {/* <View style={{ flex: 1 }}> */}
                <View
                  style={{
                    flex: 1,
                    maxWidth: Dimensions.get("screen").width - 195,
                  }}
                >
                  <Text numberOfLines={1}>{item.productName}</Text>
                </View>
              </View>

              {/* </View> */}
              {/* {item.schedule == "both" ? ( */}
              <View
                style={{
                  width: 95,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                }}
              >
                <View style={styles.checkBoxStyle}>
                  {getCheckList(item, "morning").length == 0 ? (
                    <View />
                  ) : (
                    <CheckBox
                      onPress={() => {
                        let data = {
                          schedule: item.schedule,
                          selectedDaysId: item.selectedDays.find(
                            (item) => item.day == getCurrentDay()
                          ).dayId,
                          medicineTakenId: getCheckList(item, "morning")[0].id,
                          active: !getCheckList(item, "morning")[0].active,
                          selected: item.selectedDays.find(
                            (item) => item.day == getCurrentDay()
                          ).isSelected,
                        };

                        onChecked(data, item.scheduleId);
                      }}
                      checked={getCheckList(item, "morning")[0].active}
                    />
                  )}
                </View>

                <View style={styles.checkBoxStyle}>
                  {getCheckList(item, "evening").length === 0 ? (
                    <View />
                  ) : (
                    <CheckBox
                      onPress={() => {
                        let data = {
                          schedule: item.schedule,
                          selectedDaysId: item.selectedDays.find(
                            (item) => item.day == getCurrentDay()
                          ).dayId,
                          medicineTakenId: getCheckList(item, "evening")[0].id,
                          active: !getCheckList(item, "evening")[0].active,
                          selected: item.selectedDays.find(
                            (item) => item.day == getCurrentDay()
                          ).isSelected,
                        };

                        onChecked(data, item.scheduleId);
                      }}
                      checked={getCheckList(item, "evening")[0].active}
                    />
                  )}
                </View>

                <View style={styles.checkBoxStyle}>
                  {getCheckList(item, "night").length == 0 ? (
                    <View />
                  ) : (
                    <CheckBox
                      onPress={() => {
                        let data = {
                          schedule: item.schedule,
                          selectedDaysId: item.selectedDays.find(
                            (item) => item.day == getCurrentDay()
                          ).dayId,
                          medicineTakenId: getCheckList(item, "night")[0].id,
                          active: !getCheckList(item, "night")[0].active,
                          selected: item.selectedDays.find(
                            (item) => item.day == getCurrentDay()
                          ).isSelected,
                        };
                        console.log(data);
                        onChecked(data, item.scheduleId);
                      }}
                      checked={getCheckList(item, "night")[0].active}
                    />
                  )}
                </View>
              </View>
            </View>
          )
        }
      />
      {/* {dataContext.isLoading ? <CustomeLoaderState /> : null} */}
    </>
  );
}

const styles = StyleSheet.create({
  checkBoxStyle: {
    width: 20,
    height: 20,
  },
});
