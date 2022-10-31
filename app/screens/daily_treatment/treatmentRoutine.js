import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { CheckBox } from "react-native-btr";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getProducts,
  getScheduleFunction,
  markDoneFunction,
} from "../../backend/data_handler";
import { DataContext } from "../../context/AppDataContext";
import { getCheckList, getCurrentDay } from "../../helpers/appfunctions";
import CustomeLoaderState from "../custom_classes/custome_loader";
import CustomOthersTracker from "../custom_classes/custom_others_tracker";

function TreatmentRoutine({ navigation }) {
  const dataContext = useContext(DataContext);

  // Screen state modules
  const [isloading, setloading] = useState(true);

  useEffect(() => {
    async function getSession() {
      await getScheduleFunction(dataContext).then((_) =>
        dataContext.setLoading(false)
      );
    }
    getSession();
  }, []);

  async function getProductsList() {
    let token = await AsyncStorage.getItem("authToken");
    await getProducts(token, dataContext);
  }

  async function onChecked(data, id) {
    dataContext.setLoading(true);
    await markDoneFunction(data, id, dataContext).then((_) =>
      dataContext.setLoading(false)
    );
  }

  function getRoutineTracker(type) {
    switch (type) {
      case "Tropical":
        return dataContext.Scheduledata.filter(
          (item) => item.productType == "Tropical"
        );

      case "Oral":
        return dataContext.Scheduledata.filter(
          (item) => item.productType == "Oral"
        );

      default:
        return dataContext.Scheduledata.filter(
          (item) => item.productType == "Others"
        );
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="green" />
      {/* Appbar Items */}
      <View style={styles.appbarContainer}>
        <View style={styles.appbarFlexBox}>
          <Icon
            name="arrow-left"
            color={"white"}
            size={20}
            onPress={() => navigation.goBack()}
          />

          <Text
            style={{
              marginLeft: 20,
              fontSize: 18,
              fontWeight: "700",
              color: "white",
            }}
          >
            Treatment Routine
          </Text>
        </View>
      </View>

      {/* Body Items*/}
      <View style={styles.scrollViewStyle}>
        {/* Topicals tile*/}

        {getRoutineTracker("Tropical").length < 1 ? (
          <TouchableOpacity
            onPress={() => {
              dataContext.setProductTypeValue("Tropical");
              getProductsList();
              navigation.navigate("MedicationView", {
                title: "Topicals (External Application)",
                count: 1,
                routeName: "tropical",
              });
            }}
          >
            <View style={styles.Q_tileStyle}>
              <Image
                source={require("../../assets/cosmetics.png")}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />
              <Text style={styles.text}>Topicals (External Application)</Text>
            </View>
          </TouchableOpacity>
        ) : (
          // Topicals Schedule Tracker
          <View style={styles.Q_tileStyle}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "green" }}
              >
                Topicals
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "green",
                  borderBottomWidth: 2,
                  borderBottomColor: "green",
                }}
              >
                Select all
              </Text>
              <TouchableOpacity
                onPress={() => {
                  dataContext.setProductTypeValue("Tropical");
                  getProductsList();
                  navigation.navigate("MedicationView", {
                    title: "Topicals (External Application)",
                    count: 1,
                    routeName: "tropical",
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "green",
                    borderBottomWidth: 2,
                    borderBottomColor: "green",
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                width: "100%",
                marginTop: 10,
                borderBottomColor: "#ddd",
              }}
            />
            <View
              style={{ flexDirection: "row", marginTop: 25, marginBottom: 15 }}
            >
              <View style={{ flex: 1 }} />
              <Image
                source={require("../../assets/sun.png")}
                style={{ width: 20, height: 20, marginHorizontal: 5 }}
              />
              <Image
                source={require("../../assets/moon.png")}
                style={{ width: 20, height: 20, marginLeft: 13 }}
              />
            </View>

            <FlatList
              data={getRoutineTracker("Tropical")}
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
                          maxWidth: Dimensions.get("screen").width - 160,
                        }}
                      >
                        <Text numberOfLines={1}>{item.productName}</Text>
                      </View>
                    </View>

                    {/* </View> */}
                    {/* {item.schedule == "both" ? ( */}
                    <View
                      style={{
                        width: 55,
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
                            onPress={async () => {
                              let data = {
                                schedule: item.schedule,
                                selectedDaysId: item.selectedDays.find(
                                  (item) => item.day == getCurrentDay()
                                ).dayId,
                                medicineTakenId: getCheckList(
                                  item,
                                  "morning"
                                )[0].id,
                                active: !getCheckList(item, "morning")[0]
                                  .active,
                                selected: item.selectedDays.find(
                                  (item) => item.day == getCurrentDay()
                                ).isSelected,
                              };

                              await onChecked(data, item.scheduleId);
                            }}
                            checked={getCheckList(item, "morning")[0].active}
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
                                medicineTakenId: getCheckList(item, "night")[0]
                                  .id,
                                active: !getCheckList(item, "night")[0].active,
                                selected: item.selectedDays.find(
                                  (item) => item.day == getCurrentDay()
                                ).isSelected,
                              };

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
          </View>
        )}

        {/*Oral Supplements tile*/}

        {getRoutineTracker("Oral").length < 1 ? (
          <TouchableOpacity
            onPress={() => {
              dataContext.setProductTypeValue("Oral");
              getProductsList();
              navigation.navigate("MedicationView", {
                title: "Oral supplements, herbs and medications",
                count: 2,
              });
            }}
          >
            <View style={styles.Q_tileStyle}>
              <Image
                source={require("../../assets/medicine.png")}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />
              <Text style={styles.text}>
                Oral supplements, herbs and medications
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.Q_tileStyle}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "green" }}
              >
                Oral
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "green",
                  borderBottomWidth: 2,
                  borderBottomColor: "green",
                }}
              >
                Select all
              </Text>
              <TouchableOpacity
                onPress={() => {
                  dataContext.setProductTypeValue("Oral");
                  getProductsList();
                  navigation.navigate("MedicationView", {
                    title: "Oral supplements, herbs and medications",
                    count: 2,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "green",
                    borderBottomWidth: 2,
                    borderBottomColor: "green",
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                width: "100%",
                marginTop: 10,
                borderBottomColor: "#ddd",
              }}
            />
            <View
              style={{ flexDirection: "row", marginTop: 25, marginBottom: 15 }}
            >
              <View style={{ flex: 1 }} />
              <Image
                source={require("../../assets/sun.png")}
                style={{ width: 20, height: 20, marginHorizontal: 5 }}
              />
              <Image
                source={require("../../assets/sunset.png")}
                style={{
                  width: 20,
                  height: 20,
                  marginHorizontal: 5,
                  marginLeft: 13,
                }}
              />
              <Image
                source={require("../../assets/moon.png")}
                style={{ width: 20, height: 20, marginLeft: 13 }}
              />
            </View>

            <CustomOthersTracker trackerData={getRoutineTracker("Oral")} />
          </View>
        )}

        {/* Others tile*/}
        {getRoutineTracker("Others").length < 1 ? (
          <TouchableOpacity
            onPress={() => {
              dataContext.setProductTypeValue("Others");
              getProductsList();
              navigation.navigate("MedicationView", {
                title: "Others (UV light therapy and biologic injections)",
                count: 3,
              });
            }}
          >
            <View style={styles.Q_tileStyle}>
              <Image
                source={require("../../assets/uvLight.png")}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />
              <Text style={styles.text}>
                Others (UV light therapy and biologic injections)
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.Q_tileStyle}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "green" }}
              >
                Others
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "green",
                  borderBottomWidth: 2,
                  borderBottomColor: "green",
                }}
              >
                Select all
              </Text>
              <TouchableOpacity
                onPress={() => {
                  dataContext.setProductTypeValue("Others");
                  getProductsList();
                  navigation.navigate("MedicationView", {
                    title: "Others (UV light therapy and biologic injections)",
                    count: 3,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "green",
                    borderBottomWidth: 2,
                    borderBottomColor: "green",
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                width: "100%",
                marginTop: 10,
                borderBottomColor: "#ddd",
              }}
            />
            <View
              style={{ flexDirection: "row", marginTop: 25, marginBottom: 15 }}
            >
              <View style={{ flex: 1 }} />
              <Image
                source={require("../../assets/sun.png")}
                style={{ width: 20, height: 20, marginHorizontal: 5 }}
              />
              <Image
                source={require("../../assets/sunset.png")}
                style={{
                  width: 20,
                  height: 20,
                  marginHorizontal: 5,
                  marginLeft: 13,
                }}
              />
              <Image
                source={require("../../assets/moon.png")}
                style={{ width: 20, height: 20, marginLeft: 13 }}
              />
            </View>

            <CustomOthersTracker trackerData={getRoutineTracker("Others")} />
          </View>
        )}
      </View>
      {dataContext.isLoading ? <CustomeLoaderState /> : null}
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
  Q_tileStyle: {
    borderRadius: 15,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
  },
  scrollViewStyle: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: "#eee",
  },
  checkBoxStyle: {
    width: 20,
    height: 20,
  },
});

export default TreatmentRoutine;
