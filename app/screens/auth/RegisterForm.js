import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colorPlate from "../../config/colors";

import { registerUser } from "../../backend/data_handler";

import SelectDropdown from "react-native-select-dropdown";
import CountryPicker from "react-native-country-picker-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "react-native-popup-dialog";
import { useContext } from "react";
import { DataContext } from "../../context/AppDataContext";

const skinCondition = [
  "eczema",
  "psoriasis",
  "acne",
  "rosacea",
  "ichthyosis",
  "vitiligo",
];

const genderList = ["Male", "Female", "Other"];

function RegisterForm({ navigation }) {
  const userProfileCtx = useContext(DataContext);

  const [country, setCountry] = useState();
  const [pickedDate, setPickDate] = useState("dd/mm/yyyy");
  const [selectedCondition, setCondition] = useState("");
  const [selectedGender, setGender] = useState("");
  const [userProfile, setuserProfile] = useState({
    email: "",
    gender: "",
    phone: "",
    profileImage: "",
    skinCondition: "",
    username: "",
  });
  // const [email, setemailAddress] = useState("");
  const [phone, setPhone] = useState("");
  let [loader, setloader] = useState(false);
  let [dialogVisible, setDialogVisiblity] = useState(false);
  let [sizeEffect, setSizeEffected] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCountryPickerVisible, setCountryPickerVisibility] = useState(false);

  const showCountryPicker = () => {
    setCountryPickerVisibility(true);
  };

  const hideCountryPicker = () => {
    setCountryPickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setuserProfile((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  /** User Registration Function */
  const onContinue = () => {
    const userData = {
      email: userProfile.email,
      gender: userProfile.gender,
      phone: userProfile.phone,
      profileImage: userProfile.profileImage,
      skinCondition: userProfile.skinCondition,
      username: userProfile.username,
    };

    userProfileCtx.addUserProfile(userData);
    setDialogVisiblity(true);
  };

  const onUserRegister = async () => {
    setloader(true);
    // if (userProfile.email !==) {
    //   email
    // }
    let response = await registerUser({
      username: userProfile.username,
      dateOfBirth: pickedDate,
      skinCondition: userProfile.skinCondition,
      email: userProfile.email,
      profileImage: userProfile.profileImage,
      country: country,
      gender: userProfile.gender,
      phone: userProfile.phone,
    }).then((v) => {
      // let user = new UserModel(
      //   response.user._id,
      //   re
      // )
      setDialogVisiblity(false);
      setloader(false);
      userProfileCtx.addUserProfile(response);
      if (userProfileCtx.RegisterData.email == "email") {
        navigation.navigate("EmailLoginForm", { response: v });
      } else if (userProfileCtx.RegisterData.phone == "phone") {
        navigation.navigate("LoginForm", { response: v });
      }
    });
  };

  return (
    <View style={styles.pageviewStyle}>
      <Dialog
        dialogStyle={{ margin: 20 }}
        visible={dialogVisible}
        onTouchOutside={() => setDialogVisiblity(false)}
        dialogTitle={
          <DialogTitle
            title="Alert!!"
            textStyle={{ fontSize: 18, fontWeight: "600" }}
          />
        }
        footer={
          loader ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderTopWidth: 1.1,
                borderTopColor: "#ccc",
              }}
            >
              <ActivityIndicator
                style={{ margin: 13 }}
                size="large"
                color={colorPlate.primaryColor}
              />
              <Text style={{ fontSize: 18 }}>Please wait...</Text>
            </View>
          ) : (
            <DialogFooter>
              <DialogButton text="CONFIRM" onPress={() => onUserRegister()} />
              <DialogButton
                text="CANCEL"
                onPress={() => setDialogVisiblity(false)}
              />
            </DialogFooter>
          )
        }
      >
        <DialogContent>
          <Text style={{ fontSize: 16, paddingHorizontal: 15, paddingTop: 20 }}>
            You will not be able to edit the below details after sign up.
          </Text>
          <Text
            style={{ fontSize: 16, paddingHorizontal: 15, paddingVertical: 5 }}
          >
            Please edit them now if you want to.
          </Text>
          <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              Skin Condition
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "300" }}>
              {userProfile.skinCondition}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              Date of birth (age)
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "300" }}>
              {pickedDate}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>Gender</Text>
            <Text style={{ fontSize: 14, fontWeight: "300" }}>
              {userProfile.gender}
            </Text>
          </View>
        </DialogContent>
      </Dialog>

      {/* On Scree back Button */}
      <View style={styles.appBarStyle}>
        <Icon name="arrow-left" size={20} onPress={() => navigation.goBack()} />
      </View>
      {/* Screen Body */}
      <ScrollView style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Text style={styles.headingStyle}>All Set!</Text>
        <Text style={styles.headingStyle}>
          Just a few details to customize your experience
        </Text>
        <View style={{ marginTop: 30 }} />
        <View>
          <Text style={{ fontSize: 16 }}>Display name / nick name</Text>
          <TextInput
            onChangeText={inputChangedHandler.bind(this, "username")}
            placeholder="john"
            style={styles.textBoxStyle}
          ></TextInput>
        </View>

        <View>
          <Text style={{ fontSize: 16 }}>Skin Condition</Text>
          <SelectDropdown
            buttonStyle={{
              width: "100%",
              borderRadius: 20,
              marginTop: 5,
              marginBottom: 15,
            }}
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
            data={skinCondition}
            onSelect={inputChangedHandler.bind(this, "skinCondition")}
            buttonTextAfterSelection={(item, i) => {
              return item;
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Gender</Text>
          <SelectDropdown
            buttonStyle={{
              width: "100%",
              borderRadius: 20,
              marginTop: 5,
              marginBottom: 15,
            }}
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
            data={genderList}
            onSelect={inputChangedHandler.bind(this, "gender")}
            buttonTextAfterSelection={(item, i) => {
              return item;
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Date of Birth</Text>

          <TouchableOpacity onPress={showDatePicker}>
            <View style={styles.countryBoxStyle}>
              <Text style={{ fontSize: 16 }}> {pickedDate}</Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            maximumDate={new Date(Date.now())}
            date={new Date(Date.now())}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setPickDate(date.toLocaleDateString());
              hideDatePicker();
            }}
            onCancel={hideDatePicker}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Country of Living</Text>
          <Pressable
            style={styles.countryBoxStyle}
            onPress={() => setCountryPickerVisibility(true)}
          >
            <CountryPicker
              theme={{ fontSize: 16 }}
              onOpen={() => setSizeEffected(true)}
              onClose={() => {
                setCountryPickerVisibility(false);
                setSizeEffected(false);
              }}
              visible={isCountryPickerVisible}
              onSelect={(item) => {
                setCountry(item.name);
              }}
            />
            <View
              style={[
                styles.countryBoxStyle,
                { position: "absolute", width: "100%" },
              ]}
            >
              <Text>{country ?? "Select Country"}</Text>
            </View>
          </Pressable>
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Phone Number</Text>
          <TextInput
            onChangeText={inputChangedHandler.bind(this, "phone")}
            placeholder="XXXXXXX1234"
            style={styles.textBoxStyle}
          ></TextInput>
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Email Address</Text>
          <TextInput
            onChangeText={inputChangedHandler.bind(this, "email")}
            placeholder="xxx@email.com"
            style={styles.textBoxStyle}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={() => onContinue()}
          style={{ marginTop: 30 }}
        >
          <View style={styles.buttonStyle}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
              Continue
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginTop: "5%" }}>
          <Text style={{ fontSize: 14 }}>By continuing you agree to the</Text>
          <View style={styles.policyTextStyle}>
            <Text style={styles.termsStyle}>Terms of Services</Text>
            <Text
              style={{
                fontSize: 14,
                marginHorizontal: 8,
              }}
            >
              and
            </Text>
            <Text style={styles.termsStyle}>Privacy Policy</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
  pageviewStyle: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  appBarStyle: {
    width: "100%",
    alignItems: "flex-start",
    position: "relative",
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  headingStyle: {
    fontSize: 24,
    fontWeight: "700",
  },

  textBoxStyle: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: "#eee",
    padding: 10,
  },

  countryBoxStyle: {
    height: 47,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  textContainerStyle: {
    marginTop: 20,
  },
  policyTextStyle: {
    flexDirection: "row",
    alignItems: "center",
  },

  termsStyle: {
    fontSize: 14,
    color: colorPlate.chocoColor,
    fontWeight: "bold",
  },
});

export default RegisterForm;
