import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import colors from "../../config/colors";
import { FlatGrid } from "react-native-super-grid";
import { DataContext } from "../../context/AppDataContext";

function ProductsView(props) {
  const AppData = useContext(DataContext);

  return (
    <View
      style={[
        styles.screenViewStyle,
        { alignItems: "center", justifyContent: "center", padding: 20 },
      ]}
    >
      <Image
        source={require("../../assets/ComingSoon.png")}
        style={{ alignSelf: "center" }}
        resizeMode="center"
      />
    </View>

    // <View style={styles.screenViewStyle}>
    //   <View style={styles.appbarStyle}>
    //     <View style={styles.appbarTitleContainerStyle}>
    //       <Text style={styles.appbarTitleStyle}>Dermacto Products</Text>
    //     </View>
    //   </View>

    //   <FlatGrid
    //     style={{ flex: 1 }}
    //     itemDimension={130}
    //     data={AppData.productsList}
    //     spacing={10}
    //     renderItem={({ item }) => (
    //       <View style={[styles.itemContainer, { backgroundColor: "white" }]}>
    //         <Image
    //           source={item.productImage}
    //           style={{
    //             width: "60%",
    //             height: 80,
    //             resizeMode: "contain",
    //           }}
    //         />
    //         <Text>{item.companyName}</Text>
    //         <Text style={{ fontSize: 15, fontWeight: "600" }}>
    //           {item.productName}
    //         </Text>
    //       </View>
    //     )}
    //   />
    // </View>
  );
}

const styles = StyleSheet.create({
  screenViewStyle: {
    width: "100%",
    height: "100%",
  },
  appbarStyle: {
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: colors.primaryColor,
    position: "relative",
  },
  appLeadingStyle: {
    borderRadius: 100,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  appbarTitleContainerStyle: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  appbarTitleStyle: { fontSize: 18, fontWeight: "700", color: "white" },

  itemContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    aspectRatio: 1,
    padding: 10,
  },
});

export default ProductsView;
