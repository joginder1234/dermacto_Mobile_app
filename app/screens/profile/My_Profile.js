import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { useState } from "react";
import Dialog from "react-native-dialog";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../config/colors";
import { DataContext } from "../../context/AppDataContext";
import CustomeAppbar from "../re_usable/Appbar";
import { useRef } from "react";
import CountryPicker from "react-native-country-picker-modal";
import { useEffect } from "react";
import {
  getmyDetailsfunction,
  updateUserProfileFunction,
} from "../../backend/data_handler";
import CustomeLoaderState from "../custom_classes/custome_loader";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

function DetailsTile({ title, Detail, showEdit, onpress }) {
  return (
    <>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.bigText}>{title}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>{Detail}</Text>
          {showEdit && (
            <Pressable
              style={{
                height: 30,
                width: 30,
                backgroundColor: "#eee",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
              onPress={onpress}
              android_ripple={{ color: "#b2b2b2" }}
            >
              <Ionicons name="pencil" size={20} />
            </Pressable>
          )}
        </View>
      </View>
      <View style={{ borderWidth: 0.3, marginTop: 10 }} />
    </>
  );
}

function MyProfile({ navigation }) {
  const dataContext = useContext(DataContext);
  let myProfile = dataContext.userProfile;

  /* User Profile Data State */
  const [profile, setProfile] = useState({
    dateOfBirth: "",
    email: "",
    phone: "",
    image: "",
    skin: "",
    username: "",
  });
  const [myCountry, setMyCountry] = useState("");
  function InputChangeHandler(inputIdentifier, enteredValue) {
    setProfile((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  useEffect(() => {
    function getSession() {
      setProfile({
        dateOfBirth: myProfile.dateOfBirth,
        email: myProfile.email,
        phone: myProfile.phone,
        image: myProfile.profileImage,
        skin: myProfile.skin,
        username: myProfile.username,
      });
      setMyCountry(myProfile.country);
    }
    getSession();
  }, []);

  const nameRef = useRef();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [emaildialogVisible, setEmailDialogVisible] = useState(false);
  const [phonedialogVisible, setPhoneDialogVisible] = useState(false);
  const [isCountryPickerVisible, setCountryPickerVisibility] = useState(false);
  let [sizeEffect, setSizeEffected] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isloading, setLoading] = useState(false);

  async function onSave() {
    setLoading(true);
    let response = await updateUserProfileFunction(profile);
    response
      ? await getmyDetailsfunction(myProfile, true).then((_) =>
          setLoading(false)
        )
      : null;
  }

  return (
    <>
      {/* Update Name Dialog */}
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Update Name/Nickname</Dialog.Title>
        <Dialog.Input
          onChangeText={InputChangeHandler.bind(this, "username")}
        />

        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setDialogVisible(false);
          }}
        />
        <Dialog.Button
          label="Confirm"
          onPress={() => {
            setDialogVisible(false);
            isEdit ? null : setIsEdit(true);
          }}
        />
      </Dialog.Container>

      {/* Update Email dialog */}
      <Dialog.Container visible={emaildialogVisible}>
        <Dialog.Title>Add Email</Dialog.Title>
        <Dialog.Input onChangeText={InputChangeHandler.bind(this, "email")} />

        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setEmailDialogVisible(false);
          }}
        />
        <Dialog.Button
          label="Confirm"
          onPress={() => {
            setEmailDialogVisible(false);
            isEdit ? null : setIsEdit(true);
          }}
        />
      </Dialog.Container>

      {/* update Phone Dialog */}
      <Dialog.Container visible={phonedialogVisible}>
        <Dialog.Title>Add Phone</Dialog.Title>
        <Dialog.Input onChangeText={InputChangeHandler.bind(this, "phone")} />

        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setPhoneDialogVisible(false);
          }}
        />
        <Dialog.Button
          label="Confirm"
          onPress={() => {
            setPhoneDialogVisible(false);
            isEdit ? null : setIsEdit(true);
          }}
        />
      </Dialog.Container>

      <View>
        <CustomeAppbar navigation={navigation} title="My Profile" />
        <View style={styles.ScreenRootContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ padding: 15 }}
          >
            <View
              style={[
                styles.cardTile,
                { alignItems: "center", justifyContent: "center" },
              ]}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.primaryColor,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.primaryColor,
                    fontWeight: "300",
                    alignSelf: "center",
                  }}
                >
                  Welcome {}
                </Text>
                {dataContext.userProfile.username}
              </Text>

              <Image
                // source={dataContext.userProfile.image}
                source={require("../../assets/avatar.jpg")}
                resizeMode="cover"
                style={{ height: 100, width: 100, borderRadius: 60 }}
              />
            </View>

            {/* Details */}
            <View style={styles.cardTile}>
              <DetailsTile
                title="Name/Nickname"
                Detail={profile.username}
                showEdit={true}
                onpress={() => {
                  setDialogVisible(true);
                }}
              />
              <DetailsTile
                title="Skin Condition"
                Detail={profile.skin}
                showEdit={false}
                onpress={() => {}}
              />
              <DetailsTile
                title="Date Of Birth (age)"
                Detail={profile.dateOfBirth}
                showEdit={false}
                onpress={() => {}}
              />
              <DetailsTile
                title="Gender"
                Detail={profile.gender}
                setShowEdit={false}
                onpress={() => {}}
              />
              {/* <DetailsTile
                title="Country of living"
                Detail={myProfile.country}
                showEdit={true}
                onpress={() => {
                  setIsEdit(true);
                }}
              /> */}
              <View style={{ marginTop: 10 }}>
                <Text style={styles.bigText}>Country of Living</Text>
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
                      item ? setIsEdit(true) : null;
                      setMyCountry(item.name);
                      setProfile({ ...profile, country: item.name });
                    }}
                  />
                  <View
                    style={[
                      styles.countryBoxStyle,
                      {
                        position: "absolute",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <Text style={styles.text}>
                      {myCountry ?? "Select Country"}
                    </Text>

                    <Pressable
                      style={{
                        height: 30,
                        width: 30,
                        backgroundColor: "#eee",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                      }}
                      onPress={() => {
                        setCountryPickerVisibility(true);
                      }}
                      android_ripple={{ color: "#b2b2b2" }}
                    >
                      <Ionicons name="pencil" size={20} />
                    </Pressable>
                  </View>
                </Pressable>
              </View>
              <View style={{ borderWidth: 0.3, marginTop: 10 }} />

              <DetailsTile
                title="Email address"
                Detail={profile.email}
                showEdit={
                  dataContext.RegisterData.email == "email" ? false : true
                }
                onpress={() => {
                  setEmailDialogVisible(true);
                }}
              />

              <DetailsTile
                title="Mobile Number"
                Detail={profile.phone}
                showEdit={
                  dataContext.RegisterData.phone == "phone" ? false : true
                }
                onpress={() => {
                  setPhoneDialogVisible(true);
                }}
              />
              {isEdit && (
                <Pressable
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    alignItems: "center",
                    // alignSelf: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginVertical: 20,
                    backgroundColor: colors.primaryColor,
                  }}
                  android_ripple={{ color: colors.preLightColor }}
                  onPress={() => onSave()}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: colors.whiteColor,
                    }}
                  >
                    Save
                  </Text>
                </Pressable>
              )}
            </View>
            <View style={{ height: 80 }} />
          </ScrollView>
        </View>
        {isloading ? <CustomeLoaderState /> : null}
      </View>
    </>
  );
}

export default MyProfile;

const styles = StyleSheet.create({
  ScreenRootContainer: {
    width: width,
    height: height - 10,
  },
  cardTile: {
    width: "100%",
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: colors.whiteColor,
  },
  verificationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  CircleContainer: {
    width: 55,
    height: 55,
    backgroundColor: "#eee",
    borderRadius: 40,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  countryBoxStyle: {
    height: 25,
    backgroundColor: "white",
    alignItems: "flex-start",
  },
  text: {
    fontWeight: "500",
  },
  bigText: {
    fontWeight: "500",
    fontSize: 16,
  },
});
