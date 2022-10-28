import { React, useState, useRef } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/compat/app";

import colorPlate from "../../config/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "react-native-popup-dialog";
import { firebaseConfig } from "../../config/config";
import { useContext } from "react";
import { DataContext } from "../../context/AppDataContext";

export default function MobileLoginForm({ navigation }) {
  const datacontext = useContext(DataContext);

  const phoneref = useRef("");

  let [phoneNumber, setPhoneNumber] = useState("");
  let [loading, setLoading] = useState(false);
  let [showDialogu, setdialog] = useState(false);
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    setLoading(true);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    await phoneProvider
      .verifyPhoneNumber(`+91${phoneNumber}`, recaptchaVerifier.current)
      .then((v) => {
        navigation.navigate("OtpView", {
          verificationId: v,
          phone: phoneNumber,
        });
      });
    setLoading(false);
    setPhoneNumber("");
    phoneref.current.clear();
  };

  return (
    <ImageBackground source={require("../../assets/bg.png")} resizeMode="cover">
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Dialog
        visible={showDialogu}
        onTouchOutside={() => setdialog(false)}
        dialogTitle={<DialogTitle title="Alert!" />}
        footer={
          <DialogFooter>
            <DialogButton
              text="Edit"
              onPress={() => {
                setdialog(false);
              }}
            />
            <DialogButton
              text="OK"
              onPress={() => {
                setdialog(false);
                navigation.navigate("OtpView");
              }}
            />
          </DialogFooter>
        }
      >
        <DialogContent>
          <Text>Are you sure to continue with this mobile number.</Text>
        </DialogContent>
      </Dialog>

      <View style={styles.appbarView}>
        <Icon
          name="arrow-left"
          size={20}
          onPress={() => navigation.navigate("Onboarding")}
        />
      </View>
      <View style={styles.screenStyle}>
        <View style={styles.loginCardStyle}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={require("../../assets/app_logo.png")}
              style={styles.logoStyle}
            />
          </View>

          <Text style={styles.titleTextStyle}>Enter your mobile number</Text>
          <TextInput
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad"
            placeholder="+91 xxxx xxxxx"
            ref={phoneref}
            style={styles.textBoxStyle}
          ></TextInput>
          {loading ? (
            <ActivityIndicator size="large" color={colorPlate.primaryColor} />
          ) : (
            <TouchableOpacity onPress={sendVerification}>
              <View style={styles.buttonContainer}>
                <Text
                  style={{ fontSize: 18, color: "white", fontWeight: "600" }}
                >
                  Continue
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text style={{ marginTop: 20, fontSize: 16, marginHorizontal: "10%" }}>
          We will send an otp on your entered phone number
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  appbarView: {
    alignItems: "flex-start",
    marginLeft: 20,
    marginTop: 50,
    position: "absolute",
  },

  screenStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },

  logoContainer: {
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  logoStyle: {
    width: "65%",
  },

  titleTextStyle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 20,
    color: colorPlate.blackColor,
  },

  textBoxStyle: {
    fontSize: 18,
    marginVertical: 15,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: "#eee",
    padding: 10,
  },

  loginCardStyle: {
    elevation: 5,
    shadowOpacity: 0.3,
    borderRadius: 20,
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
  },

  buttonContainer: {
    marginTop: 30,
    backgroundColor: colorPlate.primaryColor,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
