import React from "react";
import { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getProducts } from "../../backend/data_handler";
import { DataContext } from "../../context/AppDataContext";

function TreatmentRoutine({ navigation }) {
  const dataContext = useContext(DataContext);

  async function getProductsList() {
    var products = await getProducts(dataContext.userProfile.authToken);
    let productList = [];
    for (let i = 0; i < products.length; i++) {
      const pro = products[i];
      let product = {
        productId: pro._id,
        companyName: pro.companyName,
        isPublic: pro.isPublic,
        productForm: pro.productForm,
        productImage: pro.productImage,
        productName: pro.productName,
        productType: pro.productType,
        userId: pro.userId,
      };
      productList.push(product);
    }
    dataContext.setProductsValue(productList);
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
      <ScrollView style={styles.scrollViewStyle}>
        {/* Topicals tile*/}
        <TouchableOpacity
          onPress={() => {
            dataContext.setProductTypeValue("Tropicals");
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

        {/*Oral Supplements tile*/}
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

        {/* Others tile*/}
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
      </ScrollView>
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
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: "#eee",
  },
});

export default TreatmentRoutine;
