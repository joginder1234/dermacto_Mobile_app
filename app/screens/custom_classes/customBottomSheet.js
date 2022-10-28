const {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
} = require("react-native");
const { BottomSheet, CheckBox } = require("react-native-btr");
import Dialog from "react-native-dialog";
import ScheduleSelector2 from "../products/ScheduleSelector2";
import { useContext, useState } from "react";
import { DataContext } from "../../context/AppDataContext";

// import Dialog, {
//   DialogButton,
//   DialogContent,
//   DialogFooter,
//   DialogTitle,
// } from "react-native-popup-dialog";

function CustomBottomSheet({
  isSchedule,
  toggleScheduleBottomView,
  routes,
  navigation,
  callback,
}) {
  const AppData = useContext(DataContext);

  let [dialogVisible, setDialogVisible] = useState(false);

  let [CheckboxActive, SetCheckBoxActive] = useState({
    1: false,
    2: false,
  });
  let [selectedTime, SelectTime] = useState("");
  let [buttonPressed, setButtonPressed] = useState(0);
  let [selectedItem, SelectItem] = useState(null);

  const dayIsSelected = AppData.Days.includes();

  function ProductAddedStatusHandler(item) {
    setDialogVisible(true);

    AppData.addProductEntry({
      ...AppData.product,
      Days: AppData.Days,
      timing: item,
    });
  }

  async function diployData() {
    AppData.addProduct([...AppData.tropicals, AppData.product]);
    setDialogVisible(false);
    navigation.goBack();
  }

  const DaysOfWeek = [
    {
      id: 1,
      title: "Mo",
    },
    {
      id: 2,
      title: "Tu",
    },
    {
      id: 3,
      title: "We",
    },
    {
      id: 4,
      title: "Th",
    },
    {
      id: 5,
      title: "Fr",
    },
    {
      id: 6,
      title: "Sa",
    },
    {
      id: 7,
      title: "Su",
    },
  ];

  function onPressHandler(check) {
    if (check == "everyday") {
      AppData.setEmptyDaysList();
      AppData.addDays("everyday");
    } else if (check == "selectedDays") {
      AppData.setEmptyDaysList();
    } else {
      null;
    }
  }

  // const productList = () => {
  //   switch (AppData.selectedProductType) {
  //     case "Tropicals":
  //       return AppData.productsList.filter(
  //         (item) => item.productType === "Tropical"
  //       )
  //     case "Oral":
  //       return AppData.productsList.filter(
  //         (item) => item.productType === "Oral"
  //       );

  //     default:
  //       return AppData.productsList.filter(
  //         (item) => item.productType === "Others"
  //       );
  //   }
  // };
  // function timingHandler() {
  //   if (BothbuttonPressed == true) {
  //     setMorButtonPressed(false);
  //     setNiButtonPressed(false);
  //   } else if (NibuttonPressed == true) {
  //     setMorButtonPressed(false);
  //     setBothButtonPressed(false);
  //   } else if (MorbuttonPressed == true) {
  //     setBothButtonPressed(false);
  //     setNiButtonPressed(false);
  //   } else null;
  // }

  return (
    <>
      {/* <Dialog
        visible={dialogVisible}
        onDismiss={() => {
          setDialogVisible(false);
        }}
        onTouchOutside={() => setDialogVisible(false)}
        dialogTitle={<DialogTitle title="Alert!" />}
        footer={
          <DialogFooter>
            <DialogButton
              text="CANCEL"
              bordered
              onPress={() => {
                setDialogVisible(false);
              }}
              key="button-1"
            />
            <DialogButton
              text="OK"
              bordered
              onPress={diployData}
              key="button-2"
            />
          </DialogFooter>
        }
      >
        <DialogContent>
          <Text>Your selected schedule will be saved by pressing okay</Text>
        </DialogContent>
      </Dialog> */}

      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Alert!</Dialog.Title>
        <Dialog.Description>
          Your selected schedule will be saved by pressing "Confirm" Button.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Confirm" onPress={diployData} />
      </Dialog.Container>

      <BottomSheet
        visible={isSchedule}
        onBackButtonPress={toggleScheduleBottomView}
        onBackdropPress={toggleScheduleBottomView}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetappbarContainer}>
            <View style={styles.bottomSheetappbarFlexBox}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "black",
                }}
              >
                Usage Schedule
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View
            style={{
              width: "100%",
              height: 0.5,
              backgroundColor: "black",
            }}
          />

          {/* Topicals Bottom Sheet */}
          {AppData.selectedProductType == "Tropicals" ? (
            <View>
              <View
                style={{
                  width: Dimensions.get("screen").width,
                  flexDirection: "row",
                  paddingVertical: 40,
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    SelectTime("Morning");
                    setButtonPressed(1);
                    // timingHandler();
                  }}
                >
                  <View
                    style={[
                      styles.buttonStyle,
                      buttonPressed == 1 && styles.ButtonActiveStyle,
                    ]}
                  >
                    <Image
                      source={require("../../assets/sun.png")}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text
                      style={[
                        { marginLeft: 5, fontSize: 15, fontWeight: "500" },
                        buttonPressed == 1 && styles.textActiveStyle,
                      ]}
                    >
                      Morning
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    SelectTime("Night");
                    setButtonPressed(2);
                    // timingHandler();
                  }}
                >
                  <View
                    style={[
                      styles.buttonStyle,
                      buttonPressed == 2 && styles.ButtonActiveStyle,
                    ]}
                  >
                    <Image
                      source={require("../../assets/moon.png")}
                      style={[
                        { width: 20, height: 20 },
                        buttonPressed == 2 && { tintColor: "white" },
                      ]}
                    />
                    <Text
                      style={[
                        { marginLeft: 5, fontSize: 15, fontWeight: "500" },
                        buttonPressed == 2 && styles.textActiveStyle,
                      ]}
                    >
                      Night
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    SelectTime("Both");
                    setButtonPressed(3);
                    // timingHandler();
                  }}
                >
                  <View
                    style={[
                      styles.buttonStyle,
                      buttonPressed == 3 && styles.ButtonActiveStyle,
                    ]}
                  >
                    <Text
                      style={[
                        { marginLeft: 5, fontSize: 15, fontWeight: "500" },
                        buttonPressed == 3 && styles.textActiveStyle,
                      ]}
                    >
                      Both
                    </Text>
                  </View>
                </Pressable>
              </View>

              {/* Select Days to take medicine */}
              <View style={styles.SelectDaysContainer}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginRight: 20,
                  }}
                >
                  <Text style={styles.selectDaysText}>everyday</Text>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      alignItems: "center",
                    }}
                  >
                    <CheckBox
                      checked={CheckboxActive[1]}
                      color="green"
                      onPress={() => {
                        SetCheckBoxActive({
                          1: true,
                          2: false,
                        });
                        onPressHandler("everyday");
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginRight: 20,
                  }}
                >
                  <Text style={styles.selectDaysText}>Selected week days</Text>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      alignItems: "center",
                    }}
                  >
                    <CheckBox
                      checked={CheckboxActive[2]}
                      color="green"
                      onPress={() => {
                        SetCheckBoxActive({
                          1: false,
                          2: true,
                        });
                        onPressHandler("selectedDays");
                      }}
                    />
                  </View>
                </View>
              </View>
              {CheckboxActive[2] && (
                <View
                  style={{ width: Dimensions.get("screen").width, padding: 5 }}
                >
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={DaysOfWeek}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => {
                          AppData.Days.includes(item.title)
                            ? AppData.removeDay(item.title)
                            : AppData.addDays(item.title);
                        }}
                      >
                        <View
                          style={[
                            styles.DaysOfWeekContainer,
                            AppData.Days.includes(item.title) &&
                              styles.DaysOfWeekContainerSelected,
                          ]}
                        >
                          <Text
                            style={
                              AppData.Days.includes(item.title) && {
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
              )}
            </View>
          ) : (
            <ScheduleSelector2 isVisible={routes} />
          )}

          <Pressable
            android_ripple={{ color: "#eee" }}
            onPress={() => {
              callback();
              ProductAddedStatusHandler(selectedTime);
            }}
            style={[
              styles.buttonStyle,
              { alignSelf: "center", marginBottom: 40 },
            ]}
          >
            <View>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>Save</Text>
            </View>
          </Pressable>
        </View>
      </BottomSheet>
    </>
  );
}

export default CustomBottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingBottom: 10,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
  },
  bottomSheetappbarContainer: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 20,
  },
  bottomSheetappbarFlexBox: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
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
  ButtonActiveStyle: {
    backgroundColor: "green",
    overflow: "hidden",
  },
  textActiveStyle: {
    color: "white",
  },

  // checkboxStyling
  SelectDaysContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },

  selectDaysText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },

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
});
