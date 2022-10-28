import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  FlatList,
} from "react-native";

function CategoryBottomSheet(props) {
  const CategoryData = [
    { id: "1", title: "Moisturizer" },
    { id: "2", title: "Treatment" },
    { id: "3", title: "Oil" },
    { id: "4", title: "Shampoo" },
    { id: "5", title: "Conditioner" },
    { id: "6", title: "Soap" },
    { id: "7", title: "Face Wash" },
    { id: "8", title: "Cleanser" },
  ];

  return (
    <View style={styles.bottomSheetContainer}>
      {/*Bottom Sheet Appbar*/}
      <View style={styles.bottomSheetappbarContainer}>
        <View style={styles.bottomSheetappbarFlexBox}>
          <Image
            source={require("../../../assets/navback.png")}
            style={{ width: 50, height: 27, tintColor: "black" }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "black",
            }}
          >
            Category
          </Text>
          <View style={{ width: "40%" }} />

          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "black",
              }}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View
        style={{
          width: "100%",
          height: 0.5,
          backgroundColor: "black",
        }}
      />
      <TextInput
        placeholder="Filter category"
        style={styles.bottomSheetsearchinput}
      />
      <FlatList
        data={CategoryData}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingTop: 10,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              {item.title}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  bottomSheetappbarContainer: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  bottomSheetappbarFlexBox: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  bottomSheetsearchinput: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
    marginTop: 10,
    marginHorizontal: 15,
  },
});

export default CategoryBottomSheet;
