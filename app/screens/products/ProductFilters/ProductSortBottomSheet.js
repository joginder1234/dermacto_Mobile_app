import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";

function ProductSortBottomSheet(props) {
  const [checked, setChecked] = React.useState("first");
  return (
    <View style={styles.bottomSheetContainer}>
      {/*Bottom Sheet Appbar*/}
      <View style={styles.bottomSheetappbarContainer}>
        <View style={styles.bottomSheetappbarFlexBox}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "black",
            }}
          >
            Sort
          </Text>

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

      {/* Newest FIrst Tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="first"
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setChecked("first")}
        />
        <View style={{ width: 20 }} />
        <Text>Newest First</Text>
      </View>

      {/* Second  Tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="second"
          status={checked === "second" ? "checked" : "unchecked"}
          onPress={() => setChecked("second")}
        />
        <View style={{ width: 20 }} />
        <Text>Oldest First</Text>
      </View>

      {/* Third Tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="third"
          status={checked === "third" ? "checked" : "unchecked"}
          onPress={() => setChecked("third")}
        />
        <View style={{ width: 20 }} />
        <Text>Product Name A-Z</Text>
      </View>

      {/* Fourth Tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="fourth"
          status={checked === "fourth" ? "checked" : "unchecked"}
          onPress={() => setChecked("fourth")}
        />
        <View style={{ width: 20 }} />
        <Text>Product Name Z-A</Text>
      </View>

      {/* Fifth Tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="fifth"
          status={checked === "fifth" ? "checked" : "unchecked"}
          onPress={() => setChecked("fifth")}
        />
        <View style={{ width: 20 }} />
        <Text>Brand Name A-Z</Text>
      </View>

      {/* Sixth Tile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <RadioButton
          value="sixth"
          status={checked === "sixth" ? "checked" : "unchecked"}
          onPress={() => setChecked("sixth")}
        />
        <View style={{ width: 20 }} />
        <Text>Brand Name Z-A</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%",
  },
  bottomSheetappbarContainer: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomSheetappbarFlexBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
});

export default ProductSortBottomSheet;
