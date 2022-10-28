import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";
import Fa_Icon from "react-native-vector-icons/FontAwesome";
import Dialog from "react-native-dialog";

import { FlatGrid } from "react-native-super-grid";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlatButton from "../custom_classes/FlatButton";
import { BottomSheet } from "react-native-btr";
import ProductSortBottomSheet from "./ProductFilters/ProductSortBottomSheet";
import CategoryBottomSheet from "./ProductFilters/CategoryBottomSheet";
import { useContext } from "react";
import { DataContext } from "../../context/AppDataContext";
import CustomBottomSheet from "../custom_classes/customBottomSheet";
import { useEffect } from "react";
import { getProducts } from "../../backend/data_handler";
import CustomeLoaderState from "../custom_classes/custome_loader";

function AddProduct({ navigation, route }) {
  const AppData = useContext(DataContext);

  /* Screen states */
  const [isloading, setLoading] = useState(false);
  let [dialogVisible, setDialogVisible] = useState(false);
  const [sortBy, setSort] = useState("");
  const [treatment, addTreatment] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [catBottomsheet, SetCatBottomSheet] = useState(false);
  const [isSchedule, setSchedule] = useState(false);

  /* Initial State to fatch Product from database  */
  useEffect(() => {
    async function getProductsList() {
      setLoading(true);
      let token = await AsyncStorage.getItem("authToken");
      await getProducts(token, AppData);

      setLoading(false);
    }
    getProductsList();
  }, []);

  /* Product Sorting Handler */
  const sortItems = (item)=> {
    switch (sortBy) {
      case "Oldest First": return item.sort((a,b)=> new Date(a.createdAt).getTime()- new Date(b.createdAt).getTime()).reverse();
      case "Product Name A-Z": return item.sort((a,b)=> a.productName.localeCompare(b.productName));
        case "Product Name Z-A": return item.sort((a,b)=> a.productName.localeCompare(b.productName)).reverse();
        case "Brand Name A-Z": return item.sort((a,b)=> a.companyName.localeCompare(b.companyName));
      case "Brand Name Z-A": return item.sort((a,b)=> a.companyName.localeCompare(b.companyName)).reverse();
      default: return item.sort((a,b)=> new Date(a.createdAt).getTime()- new Date(b.createdAt).getTime());
    }
  }

  /* Organized List of Tropical Items */
  const getTropicalProducts=()=> {
    let productItems = AppData.productsList.filter(
      (item) => item.productType === "Tropical" 
    );
    return sortItems(productItems);
  }

    /* Organized List of Oral Items */
  const getOralProducts=()=> {
    let productItems = AppData.productsList.filter(
      (item) => item.productType === "Oral" 
    );
    return sortItems(productItems);
  }

  /* Organized List of Other Items */
  const getOtherProducts=()=> {
    let productItems = AppData.productsList.filter(
      (item) => item.productType === "Others" 
    );
    return sortItems(productItems);
  }

  /* Product Filter by the treatment category */
  const productList = () => {
    switch (AppData.selectedProductType) {
      case "Tropicals":
        return getTropicalProducts();
      case "Oral":
        return getOralProducts();
      default:
        return getOtherProducts();
    }
  };

  

  function closeBottomSheet() {
    if (isSchedule == true) {
      setSchedule(false);
    }
  }

  const addobject = (data) => {
    addTreatment({ ...treatment, data });
  };

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setIsVisible(!isVisible);
  };

  const togglecatBottomSheet = () => {
    //Toggling the visibility state of the bottom sheet
    SetCatBottomSheet(!catBottomsheet);
  };

  const toggleScheduleBottomView = () => {
    //Toggling the visibility state of the bottom sheet
    setSchedule(!isSchedule);
  };

  function ProductAddedStatusHandler(item) {
    AppData.addProductEntry(item);
  }

  /* Screen Body Structure */
  return (
    <>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Choose Your Action</Dialog.Title>

        <Dialog.Button label="Edit" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Delete" onPress={() => setDialogVisible(false)} />
      </Dialog.Container>
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} backgroundColor="green" />

        {/*  Sort Items Bottom Sheet View*/}
        <BottomSheet
          visible={isVisible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <ProductSortBottomSheet />
        </BottomSheet>

        {/* Category Items Bottom Sheet view */}
        <BottomSheet
          visible={catBottomsheet}
          onBackButtonPress={togglecatBottomSheet}
          onBackdropPress={togglecatBottomSheet}
        >
          <CategoryBottomSheet />
        </BottomSheet>

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
                fontSize: 18,
                marginLeft: 20,
                fontWeight: "700",
                color: "white",
              }}
            >
              Add Product
            </Text>
          </View>
        </View>
        {/* Body Items */}

        <View style={{ padding: 8, flex: 1 }}>
          {/* Search bar */}
          <TextInput
            placeholder="Search products by product name or brand..."
            style={styles.textinput}
          />
          {/* Buttons */}
          <View style={{ width: "100%", flexDirection: "row" }}>
            {/* Button Sort */}
            <TouchableOpacity onPress={toggleBottomNavigationView}>
              <View style={styles.button}>
                <Text>Sort : Newest First</Text>
              </View>
            </TouchableOpacity>

            {/* Button Category */}
            <TouchableOpacity onPress={togglecatBottomSheet}>
              <View style={styles.button}>
                <Text>Category</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Grid View */}
          <FlatGrid
            style={{ flex: 1 }}
            itemDimension={130}
            data={productList()}
            spacing={10}
            renderItem={({ item }) => (
              <View
                style={[styles.itemContainer, { backgroundColor: "white" }]}
              >
                <Pressable
                  android_ripple={{ color: "#eee" }}
                  onLongPress={() => {
                    item.userId == AppData.userProfile.userId
                      ? setDialogVisible(true)
                      : alert("You can't edit this product!");
                  }}
                  onPress={() => {
                    ProductAddedStatusHandler({ product: item });
                    toggleScheduleBottomView();
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Image
                      loadingIndicatorSource={item.productImage}
                      source={{ uri: item.productImage }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                  {item.userId == AppData.userProfile.userId && (
                    <Fa_Icon
                      name="edit"
                      size={20}
                      style={{ position: "absolute", top: 5, right: 5 }}
                    />
                  )}
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        backgroundColor: "white",
                        width: "100%",
                        alignItems: "center",
                        padding: 7,
                      }}
                    >
                      <Text numberOfLines={1}>{item.companyName}</Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        {item.productName}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            )}
          />

          {AppData.selectedProductType === "Others" ? null : (
            <FlatButton
              callBack={() =>
                navigation.navigate("AddProductView", {
                  route: route.params.route,
                })
              }
              btnName={"Add Your Product Manually"}
            />
          )}
        </View>
        <CustomBottomSheet
          isSchedule={isSchedule}
          toggleScheduleBottomView={toggleScheduleBottomView}
          routes={route.params.route === "tropical"}
          navigation={navigation}
          callback={closeBottomSheet}
        />
        {isloading ? <CustomeLoaderState /> : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#eee",
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
  textinput: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
  },
  button: {
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    marginVertical: 8,
    marginRight: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "black",
    alignItems: "center",
  },

  itemContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    aspectRatio: 0.8,
    overflow: "hidden",
    padding: 2,
  },
  innerItemContainer: {
    overflow: "hidden",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,

    aspectRatio: 1,
  },
});

export default AddProduct;
