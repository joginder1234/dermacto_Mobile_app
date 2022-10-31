import React, { useRef, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OtpInputs from "react-native-otp-inputs";

import Icon from "react-native-vector-icons/FontAwesome";
import {
  getProducts,
  signupWithEmail,
  verifyEmailOtp,
} from "../../backend/data_handler";
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "react-native-popup-dialog";
import colorPlate from "../../config/colors";
import { useContext } from "react";
import { DataContext } from "../../context/AppDataContext";

function EmailOtpView({ navigation, route }) {
  let [otp, setOtp] = useState("");
  const dataContext = useContext(DataContext);

  /** App loading indicator */
  let [loading, setloading] = useState(false);
  let [submitting, setSubmit] = useState(false);
  let [dialogVisible, setDialogVisible] = useState(false);
  /** Resend Otp function */
  const resendOtp = async () => {
    if (route) {
      setloading(true);
      await signupWithEmail(route.params?.email).then((v) => setloading(false));
    }
  };

  /**Verify OTP  */
  const verifyOTP = async () => {
    dataContext.addRegisterData({ email: "email" });
    const dataRes = route.params.response;

    setSubmit(true);

    if (otp === `${dataRes.otp}`) {
      if (JSON.stringify(dataRes.user) === "{}") {
        setDialogVisible(true);
        // navigation.navigate("RegisterForm");
      } else {
        let user = {
          userId: dataRes.user._id,
          country: dataRes.user.country,
          dateOfBirth: dataRes.user.dateOfBirth,
          email: dataRes.user.email,
          phone: dataRes.user.phone,
          image: dataRes.user.profileImage,
          skin: dataRes.user.skinCondition,
          username: dataRes.user.username,
          authToken: dataRes.token,
        };
        getProductsList(dataRes.token);
        AsyncStorage.setItem("authToken", dataRes.token);
        dataContext.addUserProfile(user);
        ToastAndroid.show(`Welcome ${route.params.email}`, ToastAndroid.SHORT);
        navigation.navigate("BottomNavView");
      }
    } else {
      ToastAndroid.show("Incorrect OTP", ToastAndroid.SHORT);
    }
    setSubmit(false);
  };

  const getProductsList = async (token) => {
    await getProducts(token, dataContext);
    // let productList = [];
    // for (let i = 0; i < products.product.length; i++) {
    //   const aa = products.product[i];
    //   let product = {
    //     productId: aa._id,
    //     companyName: aa.companyName,
    //     isPublic: aa.isPublic,
    //     productForm: aa.productForm,
    //     productImage: aa.productImagePath,
    //     productName: aa.productName,
    //     productType: aa.productType,
    //     userId: aa.userId,
    //     createdAt: aa.createdAt,
    //   };
    //   productList.push(product);
    // }
    // dataContext.setProductsValue(productList);
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      resizeMode={"cover"}
    >
      <View style={{ height: "100%", width: "100%" }}>
        {/** React Native Dialoge View */}

        <Dialog
          dialogStyle={{ margin: 20 }}
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                onPress={() => setDialogVisible(false)}
              />
              <DialogButton
                text="OK"
                onPress={() => {
                  navigation.navigate("RegisterForm");
                  setDialogVisible(false);
                }}
              />
            </DialogFooter>
          }
          dialogTitle={
            <DialogTitle
              title="User Not Found"
              textStyle={{ fontSize: 18, fontWeight: "600" }}
            />
          }
          visible={dialogVisible}
          onTouchOutside={() => setDialogVisible(false)}
        >
          <DialogContent>
            <Text style={{ fontSize: 14, padding: 15 }}>
              No Account registered with the given email address. Please
              Register to start using the application.
            </Text>
          </DialogContent>
        </Dialog>

        {/* On Scree back Button */}
        <View style={styles.appBarStyle}>
          <Icon
            name="arrow-left"
            size={20}
            onPress={() => navigation.goBack()}
          />
        </View>
        <ScrollView style={{ marginHorizontal: 20, marginVertical: 20 }}>
          {/* Screen Heading */}
          <Text style={styles.headingTextStyle}>Verify Email Address</Text>
          <Text style={styles.subheadingtextStyle}>
            Enter the 6-digit code sent to your email address
          </Text>

          <View style={{ padding: 20, paddingTop: 50 }}>
            <OtpInputs
              inputContainerStyles={{
                backgroundColor: "white",
                borderColor: "green",
                borderWidth: 1.2,
                borderRadius: 5,
                padding: 10,
              }}
              textAlign="center"
              // style={{}}
              autofillFromClipboard={false}
              handleChange={(code) => setOtp(code)}
              onChangeText={(text) => {}}
              numberOfInputs={6}
            />
          </View>

          {/* Submit Button */}
          {submitting ? (
            <ActivityIndicator
              style={{ marginTop: 10 }}
              size="large"
              color={colorPlate.primaryColor}
            />
          ) : (
            <TouchableOpacity
              onPress={() => verifyOTP()}
              style={{ marginTop: 30 }}
            >
              <View style={styles.buttonStyle}>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "white" }}
                >
                  SUBMIT
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colorPlate.blackColor,
              }}
            >
              Didn't receive code? Check spam folder also.
            </Text>
          </View>

          {/* Re-Send code Button */}
          <View style={{ alignItems: "center" }}>
            {loading ? (
              <ActivityIndicator
                style={{ marginTop: 10 }}
                size="large"
                color={colorPlate.primaryColor}
              />
            ) : (
              <TouchableOpacity
                onPress={() => resendOtp()}
                style={{ marginTop: 20 }}
              >
                <Text style={styles.textButtonStyle}>Re-Send Code</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Change Phone Number Button */}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginTop: 20 }}
            >
              <Text style={styles.textButtonStyle}>Change Email Address</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colorPlate.primaryColor,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },

  headingTextStyle: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
    marginTop: "10%",
  },

  subheadingtextStyle: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    marginTop: 20,
  },

  textButtonStyle: {
    fontSize: 16,
    fontWeight: "700",
    color: colorPlate.primaryColor,
    textDecorationLine: "underline",
  },

  appBarStyle: {
    width: "100%",
    alignItems: "flex-start",
    position: "relative",
    marginTop: 50,
    marginLeft: 20,
  },

  otpContainerStyle: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },

  otpBoxStyle: {
    borderRadius: 10,
    width: "50%",
    borderColor: colorPlate.primaryColor,
    backgroundColor: "white",
    borderWidth: 1.5,
    padding: 10,
  },

  otptextStyle: {
    fontSize: 20,
    color: "black",
    padding: 0,
    textAlign: "center",
  },
});

export default EmailOtpView;
