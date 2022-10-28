import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import FlatButton from "../custom_classes/FlatButton";
import CustomeAppbar from "../re_usable/Appbar";
import colors from "../../config/colors";
import { getProducts, storeProducts } from "../../backend/data_handler";
import { useContext } from "react";
import { DataContext } from "../../context/AppDataContext";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomeLoaderState from "../custom_classes/custome_loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddProductManually({ navigation, route }) {
  const productCtx = useContext(DataContext);

  const OralCategoryList = ["Tablet", "Capsule", "Powder"];
  const TropicalCategoryList = [
    "Moisturizer",
    "Treatment",
    "Oil",
    "Shampoo",
    "Conditioner",
    "Soap",
    "Face Wash",
    "Cleanser",
  ];

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setimage] = useState(null);
  const [isloading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    CompanyName: "",
    ProductName: "",
    ProductCategory: "",
  });

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setimage(result.uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to internal storage</Text>;
  }

  function InputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  async function SubmitHandler() {
    if (
      inputs.CompanyName == "" ||
      inputs.ProductName == "" ||
      inputs.ProductCategory == "" ||
      inputs.ProductType == ""
    ) {
      alert("Please fill the mandatary(*) information before submitting");
    } else {
      setLoading(true);

      let data = {
        productName: inputs.ProductName,
        companyName: inputs.CompanyName,
        productForm: inputs.ProductCategory.toLowerCase(),
        productType:
          productCtx.selectedProductType == "Tropicals" ? "Tropical" : "Oral",
      };

      try {
        let token = await AsyncStorage.getItem("authToken");
        await storeProducts(data);
        await getProducts(token, productCtx);

        setLoading(false);
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        alert("Something went wrong");
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={colors.primaryColor}
      />
      {/* Appbar Items */}
      <CustomeAppbar title={"Add Product Info"} navigation={navigation} />
      <ScrollView style={{ padding: 15, flex: 1 }}>
        <Text style={styles.textstyle}>Brand/Company Name *</Text>
        <TextInput
          placeholder="Type Brand Name..."
          style={styles.textinput}
          onChangeText={InputChangeHandler.bind(this, "CompanyName")}
        />
        <Text style={styles.textstyle}>Product Name *</Text>
        <TextInput
          placeholder="Type product name here..."
          style={styles.textinput}
          onChangeText={InputChangeHandler.bind(this, "ProductName")}
        />
        <Text style={styles.textstyle}>Product Category *</Text>
        <SelectDropdown
          dropdownStyle={{
            borderRadius: 10,
            paddingHorizontal: 20,
          }}
          buttonStyle={styles.textinput}
          defaultButtonText="Select"
          dropdownIconPosition="right"
          renderDropdownIcon={(isOpened) => {
            return (
              <Icon
                style={{ paddingRight: 10 }}
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={15}
              />
            );
          }}
          buttonTextStyle={{ textAlign: "left", fontSize: 16 }}
          data={
            productCtx.selectedProductType === "Tropicals"
              ? TropicalCategoryList
              : OralCategoryList
          }
          onSelect={InputChangeHandler.bind(this, "ProductCategory")}
          buttonTextAfterSelection={(item, i) => {
            return item;
          }}
        />

        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.textstyle, { marginRight: 10 }]}>
            Product Photo
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>Optional</Text>
        </View>

        <TouchableOpacity
          onPress={() => pickImage()}
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            marginBottom: 15,
            marginTop: 20,
          }}
        >
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <Image
              source={
                image ? { uri: image } : require("../../assets/camera.png")
              }
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
              }}
              resizeMode="center"
            />
          </View>
          <View
            style={{
              backgroundColor: colors.primaryColor,
              height: 30,
              width: 30,
              borderRadius: 100,
              position: "absolute",
              justifyContent: "center",
              alignSelf: "flex-end",
              alignItems: "center",
              bottom: -10,
              right: -10,
            }}
          >
            <Image
              source={require("../../assets/add.png")}
              style={{ width: 30, height: 30, tintColor: "white" }}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 12,
            fontWeight: "500",
            color: "grey",
          }}
        >
          {image ? image.split("/").pop() : ""}
        </Text>

        <FlatButton btnName={"Add Product"} callBack={SubmitHandler} />
      </ScrollView>
      {isloading ? <CustomeLoaderState /> : null}
    </View>
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
    backgroundColor: colors.primaryColor,
  },
  appbarFlexBox: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  textstyle: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 5,
  },
  textinput: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
  },
  button: {
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    marginVertical: 40,
    marginRight: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "black",
    alignItems: "center",
  },
  bottomSheetContainer: {
    paddingBottom: 10,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
  },
  imgselectioncontainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imgselectioncontainer1: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: 15,
    marginTop: 20,
    justifyContent: "center",
    width: 100,
  },
});

export default AddProductManually;
