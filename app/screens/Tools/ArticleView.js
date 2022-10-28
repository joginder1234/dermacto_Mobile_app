import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
} from "react-native";
import colors from "../../config/colors";
import Icon from "react-native-vector-icons/FontAwesome";

function ArticleView({ navigation, route }) {
  const dummyTitle =
    "Purus cursus non sociosqu semper tortor congue hendrerit cras. Molestie eleifend magnis mus aptent volutpat. Ridiculus varius vestibulum egestas platea eget cras himenaeos mi consequat ut odio? Facilisi nisi consequat nunc cum odio elit purus sagittis felis ultrices himenaeos. Ut dictum dictum libero. Pulvinar libero lorem pharetra natoque mollis lectus ullamcorper curabitur rhoncus. Tristique euismod semper nec class libero malesuada donec conubia cum molestie feugiat vivamus. Massa sapien aliquam duis dignissim.";
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={styles.appbarContainer}>
        <View style={styles.appbarFlexBox}>
          <Icon
            name="arrow-left"
            color={"white"}
            size={20}
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.appbarTitle}>{route.params.title}</Text>
        </View>
      </View>
      <ScrollView>
        <ImageBackground
          style={{ width: "100%", height: 200 }}
          source={{
            uri: "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2019/06/11/17/48/yoga-8col-widenshot_6_-110.jpg",
          }}
        />
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", paddingBottom: 10 }}>
            How does blue light affect you
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "400", textAlign: "justify" }}
          >
            {dummyTitle + " \n\n" + dummyTitle}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          padding: 20,
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 30,
          }}
        >
          <Icon
            name="thumbs-o-up"
            color={colors.blackColor}
            size={20}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 18 }}>3</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="comment-o"
            color={colors.blackColor}
            size={20}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 18 }}>5</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  appbarContainer: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primaryColor,
  },

  appbarTitle: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "700",
    color: "white",
  },
  appbarFlexBox: {
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
});

export default ArticleView;
