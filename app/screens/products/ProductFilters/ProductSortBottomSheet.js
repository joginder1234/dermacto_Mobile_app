import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import { DataContext } from "../../../context/AppDataContext";

function ProductSortBottomSheet(props) {
  const sortCtx = useContext(DataContext);
  const [checked, setChecked] = React.useState("Newest First");
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

          <TouchableOpacity
            onPress={() => {
              sortCtx.setSortType(checked);
            }}
          >
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
          value="Newest First"
          status={checked === "Newest First" ? "checked" : "unchecked"}
          onPress={() => {
            setChecked("Newest First");
          }}
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
          value="Oldest First"
          status={checked === "Oldest First" ? "checked" : "unchecked"}
          onPress={() => {
            setChecked("Oldest First");
          }}
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
          value="Product Name A-Z"
          status={checked === "Product Name A-Z" ? "checked" : "unchecked"}
          onPress={() => {
            setChecked("Product Name A-Z");
          }}
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
          value="Product Name Z-A"
          status={checked === "Product Name Z-A" ? "checked" : "unchecked"}
          onPress={() => {
            setChecked("Product Name Z-A");
          }}
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
          value="Brand Name A-Z"
          status={checked === "Brand Name A-Z" ? "checked" : "unchecked"}
          onPress={() => {
            setChecked("Brand Name A-Z");
          }}
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
          value="Brand Name Z-A"
          status={checked === "Brand Name Z-A" ? "checked" : "unchecked"}
          onPress={() => {
            setChecked("Brand Name Z-A");
          }}
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
