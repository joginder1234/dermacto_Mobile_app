import { ActivityIndicator, Dimensions, View, Text } from "react-native";

export default function CustomeLoaderState() {
  return (
    <View
      style={{
        position: "absolute",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        alignItems: "center",

        justifyContent: "center",
      }}
    >
      <View style={{ padding: 20, backgroundColor: "#fff", borderRadius: 12 }}>
        <ActivityIndicator color={"green"} size={"large"} />
        <Text style={{ marginTop: 10 }}>Please Wait</Text>
      </View>
    </View>
  );
}
