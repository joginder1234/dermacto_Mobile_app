import React, { useRef, useState } from "react";
import { useContext } from "react";
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import colorPlate from "../../config/colors";
import { DataContext } from "../../context/AppDataContext";

import firebase from "firebase/compat/app";
import OtpInputs from "react-native-otp-inputs";
import { getUserbyPhone } from "../../backend/data_handler";

function OtpView({ navigation, route }) {
  const database = useContext(DataContext);

  const OTPRef = useRef();

  const [code, setcode] = useState("");
  const [loading, setLoading] = useState(false);

  const confirmCode = async () => {
    setLoading(true);

    database.addRegisterData({ phone: "phone" });
    const credential = firebase.auth.PhoneAuthProvider.credential(
      route.params.verificationId,
      code
    );

    let data = await getUserbyPhone(+route.params.phone);
    if (data === null) {
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          navigation.navigate("RegisterForm");
        })
        .catch((error) => alert(error));
    } else {
      let token = await AsyncStorage.getItem("authToken");
      let user = {
        userId: data._id,
        country: data.country,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        phone: data.phone,
        image: data.profileImage,
        skin: data.skinCondition,
        username: data.username,
        authToken: token,
      };
      database.addUserProfile(user);
      navigation.navigate("BottomNavView");
    }

    setLoading(false);

    setcode("");

    OTPRef.current.reset();
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      resizeMode={"cover"}
    >
      <View style={{ height: "100%", width: "100%" }}>
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
          <Text style={styles.headingTextStyle}>Verify Mobile Number</Text>
          <Text style={styles.subheadingtextStyle}>
            Enter the 6-digit code sent to your mobile number
          </Text>

          {/* Text Pin Input */}

          <OtpInputs
            inputContainerStyles={{
              backgroundColor: "white",
              borderColor: "green",
              borderWidth: 1.2,
              borderRadius: 5,
              padding: 10,
            }}
            ref={OTPRef}
            clearButtonMode="always"
            textAlign="center"
            // style={{}}
            autofillFromClipboard={false}
            handleChange={(code) => setcode(code)}
            keyboardType="phone-pad"
            // onChangeText={(text) => setcode(code + text)}
            numberOfInputs={6}
          />

          {/* Submit Button */}
          {loading ? (
            <ActivityIndicator size="large" color={colorPlate.primaryColor} />
          ) : (
            <TouchableOpacity onPress={confirmCode} style={{ marginTop: 30 }}>
              <View style={styles.buttonStyle}>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "white" }}
                >
                  SUBMIT
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Re-Send code Button */}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => {}} style={{ marginTop: 20 }}>
              <Text style={styles.textButtonStyle}>Re-Send Code</Text>
            </TouchableOpacity>
          </View>

          {/* Change Phone Number Button */}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginTop: 20 }}
            >
              <Text style={styles.textButtonStyle}>Change Mobile Number</Text>
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

export default OtpView;
