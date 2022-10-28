import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TextInput,
} from "react-native";
import colors from "../../config/colors";
import CustomeAppbar from "../re_usable/Appbar";

function ContactUs({ navigation }) {
  return (
    <View style={styles.screenStyl}>
      <CustomeAppbar title={"Contact Us / Feedback"} navigation={navigation} />
      <ScrollView style={{ padding: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Choose any of the below ways to contact us
        </Text>
        {/** support Card*/}
        <View style={styles.cardStyle}>
          <Text style={styles.linkStyle}>support@dermacto.com</Text>
          <View style={styles.dividerStyle} />
          <Text style={styles.normalTextStyle}>
            (We will respond within 1 working day)
          </Text>
        </View>
        <View style={styles.cardStyle}>
          <Image
            source={require("../../assets/icons/doc.png")}
            resizeMode={"contain"}
            style={{ height: 35 }}
          />
          <Text style={styles.titleTextStyle}>Enter your Email</Text>
          <TextInput style={styles.textBoxStyle}></TextInput>
          <Text style={styles.titleTextStyle}>Confirm your Email</Text>
          <TextInput style={styles.textBoxStyle}></TextInput>
          <Text style={styles.titleTextStyle}>Message</Text>
          <TextInput
            numberOfLines={4}
            textAlignVertical={"top"}
            style={styles.textBoxStyle}
          ></TextInput>
          <Text style={styles.titleTextStyle}>Attach Image</Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                style={[
                  styles.textBoxStyle,
                  {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    height: 50,
                  },
                ]}
              ></TextInput>
            </View>
            <View style={styles.browesContainer}>
              <Text style={{ fontSize: 18, color: colors.whiteColor }}>
                Browse
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.cardStyle, { flexDirection: "row" }]}>
          <View style={[styles.cancelBtnStyle, styles.alignCenter]}>
            <Text style={{ color: colors.blackColor, fontSize: 18 }}>
              CANCEL
            </Text>
          </View>

          <View style={[styles.submitbtnStyle, styles.alignCenter]}>
            <Text style={{ color: colors.whiteColor, fontSize: 18 }}>
              SUBMIT
            </Text>
          </View>
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyl: {
    width: "100%",
    height: "100%",
  },
  cardStyle: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  dividerStyle: {
    borderBottomWidth: 0.5,
    width: "100%",
    marginVertical: 10,
  },
  linkStyle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaryColor,
  },
  normalTextStyle: {
    fontSize: 14,
    fontWeight: "400",
  },
  textBoxStyle: {
    width: "100%",
    fontSize: 18,
    marginVertical: 10,
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: "#eee",
    padding: 10,
  },
  titleTextStyle: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 15,
    color: colors.blackColor,
  },
  browesContainer: {
    height: 50,
    width: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelBtnStyle: {
    flex: 1,
    backgroundColor: "#ccc",
    height: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 4,
  },
  submitbtnStyle: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 4,
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContactUs;
