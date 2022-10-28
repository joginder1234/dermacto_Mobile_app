import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../config/colors";
import { DataContext } from "../../../context/AppDataContext";

function MedicationTile({ navigation, route }) {
  const AppData = useContext(DataContext);
  const productlist = AppData.productsList;

  const [isEdit, setIsEdit] = useState(false);
  // function getAddedProduct() {
  //   return AppData.tropicals;
  // }

  const getAddedProduct = () => {
    switch (AppData.selectedProductType) {
      case "Tropicals":
        return AppData.tropicals.filter(
          (item) => item.product.productType === "Tropical"
        );
      case "Oral":
        return AppData.tropicals.filter(
          (item) => item.product.productType === "Oral"
        );

      default:
        return AppData.tropicals.filter(
          (item) => item.product.productType === "Others"
        );
    }
  };

  const getImage = () => {
    if (route.params.count == 1) {
      return require("../../../assets/cosmetics.png");
    } else if (route.params.count == 2) {
      return require("../../../assets/medicine.png");
    } else {
      return require("../../../assets/uvLight.png");
    }
  };

  const noElemntView = () => {
    return (
      <View>
        <Image
          source={getImage()}
          style={{
            width: 80,
            height: 80,
            resizeMode: "cover",
            alignSelf: "center",
            marginTop: 60,
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "green",
            marginBottom: 20,
          }}
        >
          List down all the oral medication and dietary supplements that you use
          to treat psoriasis.
        </Text>
        <Text style={{ fontSize: 19, fontWeight: "700", marginBottom: 20 }}>
          Add products by clicking the + button.
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "500" }}>
          During daily log, you will check adherence to this routine.
        </Text>
      </View>
    );
  };
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
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                fontWeight: "700",
                color: "white",
              }}
            >
              {route ? route.params.title : null}
            </Text>
          </View>
          {/* Edit Button */}
          {getAddedProduct().length >= 1 && (
            <Pressable
              style={{
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 25,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.whiteColor,
              }}
              onPress={() => setIsEdit(!isEdit)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: colors.primaryColor,
                }}
              >
                {isEdit ? "Save" : "Edit"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Body Items */}
      {/* <ScrollView style={styles.scrollViewStyle}> */}
      <View style={styles.scrollViewStyle}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddProducts", {
              route: route.params.routeName,
            })
          }
        >
          <Image
            source={require("../../../assets/add.png")}
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
              tintColor: "green",
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        {getAddedProduct().length < 1 ? (
          noElemntView()
        ) : (
          <FlatList
            data={getAddedProduct()}
            keyExtractor={(item) => item.product.productId}
            renderItem={(itemData) => (
              <View style={styles.routineTile}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: "green",
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={itemData.item.product.productImage}
                    style={{ width: 18, height: 18, tintColor: "white" }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ marginLeft: 5, fontSize: 15, fontWeight: "500" }}
                    numberOfLines={1}
                  >
                    {itemData.item.product.productName}
                  </Text>
                </View>

                {isEdit ? (
                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      style={{
                        borderWidth: 1,
                        padding: 5,
                        marginRight: 10,
                      }}
                      android_ripple={{ color: "#b2b2b2" }}
                    >
                      <Ionicons name="pencil" size={20} />
                    </Pressable>
                    <Pressable
                      style={{
                        borderWidth: 1,
                        padding: 5,
                      }}
                      android_ripple={{ color: "#b2b2b2" }}
                    >
                      <Ionicons name="trash" size={20} />
                    </Pressable>
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 30,
                    }}
                  >
                    {itemData.item.timing == "Both" ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "center",
                          marginBottom: 4,
                        }}
                      >
                        <Image
                          source={require("../../../assets/sun.png")}
                          style={{ width: 20, height: 20 }}
                        />
                        <Image
                          source={require("../../../assets/moon.png")}
                          style={{ width: 20, height: 20, marginLeft: 15 }}
                        />
                      </View>
                    ) : (
                      <Image
                        source={
                          itemData.item.timing == "Morning"
                            ? require("../../../assets/sun.png")
                            : itemData.item.timing == "Night" &&
                              require("../../../assets/moon.png")
                        }
                        style={{ width: 20, height: 20 }}
                      />
                    )}

                    <View
                      style={{
                        width: Dimensions.get("screen").width * 0.19,
                        marginTop: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: colors.chocoColor,
                      }}
                    >
                      <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={itemData.item.Days}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              paddingHorizontal: 5,
                              paddingVertical: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: colors.primaryColor,
                                fontWeight: "500",
                                alignSelf: "center",
                                textAlign: "center",
                              }}
                            >
                              {item}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  </View>
                )}

                {/* */}
              </View>
            )}
          />
        )}

        {/* </ScrollView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbarContainer: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "green",
  },
  appbarFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  scrollViewStyle: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  routineTile: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    padding: 10,
    backgroundColor: "white",
    overflow: "hidden",
    marginTop: 15,
  },
});

export default MedicationTile;
