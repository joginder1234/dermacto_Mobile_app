import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

function Analytics({ navigation, route }) {
  let [items, setitems] = useState([
    {
      id: "1",
      title: "Sleep",
      isActive: true,
    },
    {
      id: "2",
      title: "Stress Level",
      isActive: false,
    },
    {
      id: "3",
      title: "Exercise",
      isActive: false,
    },
    {
      id: "4",
      title: "Water Intake",
      isActive: false,
    },
    {
      id: "5",
      title: "Gut health",
      isActive: false,
    },
    {
      id: "6",
      title: "Skin health",
      isActive: false,
    },
    {
      id: "7",
      title: "Treatment adherence",
      isActive: false,
    },
  ]);

  let [selectedGraph, selectGraph] = useState("Sleep");

  const getGraphData = () => {
    if (selectedGraph == "Sleep") {
      return [0, 6, 6, 7, 8, 7, 6, 8];
    } else if (selectedGraph == "Stress Level") {
      return [0, 6, 8, 7, 5, 6, 6, 4];
    } else if (selectedGraph == "Exercise") {
      return [0, 3, 5, 5, 8, 8, 6, 7];
    } else if (selectedGraph == "Water Intake") {
      return [0, 4, 4, 5, 7, 8, 6, 8];
    } else if (selectedGraph == "Gut health") {
      return [0, 2, 3, 3, 7, 6, 4, 8];
    } else if (selectedGraph == "Skin health") {
      return [0, 4, 4, 4, 7, 8, 8, 8];
    } else {
      return [0, 6, 6, 4, 3, 5, 6, 7];
    }
  };

  const handleButtonClick = (index) => {
    var thisValue = items.find((v) => v.id === index);
    setitems(
      items.map((item) =>
        item.id === index
          ? { ...item, isActive: !item.isActive }
          : { ...item, isActive: false }
      )
    );
    selectGraph(thisValue.title);
  };

  let [durations, setDurations] = useState([
    {
      id: 1,
      value: "7 Days",
      isActive: true,
    },
    {
      id: 2,
      value: "1 month",
      isActive: false,
    },
  ]);

  const handleDurationTab = (id) => {
    setDurations(
      durations.map((dr) =>
        dr.id == id
          ? {
              ...dr,
              isActive: true,
            }
          : {
              ...dr,
              isActive: false,
            }
      )
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="green" />
      <View style={{ height: 100 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleButtonClick(item.id)}>
              <View
                style={
                  item.isActive
                    ? styles.buttonStyleActive
                    : styles.buttonStyleInActive
                }
              >
                <Text style={{ color: item.isActive ? "white" : "black" }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>

      <View style={styles.graphstyling}>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 30,
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "green",
            borderWidth: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => handleDurationTab(durations[0].id)}
            style={{ flex: 1 }}
          >
            <View
              style={{
                // flex: 1,
                alignItems: "center",
                backgroundColor: durations[0].isActive ? "green" : "white",
                padding: 5,
              }}
            >
              <Text
                style={{ color: durations[0].isActive ? "white" : "black" }}
              >
                {durations[0].value}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDurationTab(durations[1].id)}
            style={{ flex: 1 }}
          >
            <View
              style={{
                // flex: 1,
                alignItems: "center",
                backgroundColor: durations[1].isActive ? "green" : "white",
                padding: 5,
              }}
            >
              <Text
                style={{ color: durations[1].isActive ? "white" : "black" }}
              >
                {durations[1].value}
              </Text>
            </View>
          </TouchableOpacity>
          {/* <FlatList
            showsHorizontalScrollIndicator={false}
            data={durations}
            renderItem={({ item }) => (
              
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
          /> */}
        </View>
        <LineChart
          data={{
            labels: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"],
            datasets: [
              {
                data: getGraphData(),
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "white",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => "black",
            labelColor: (opacity = 1) => `black`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            margin: 30,
            borderRadius: 16,
          }}
        />
        <View style={styles.textcontainerstyling}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Dermacto Suggests
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "400", marginVertical: 15 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa
            sapien faucibus et molestie ac feugiat sed lectus vestibulum..
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Try to get 8 hours of deep, sound sleep.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 10,
  },
  graphstyling: {
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textcontainerstyling: {
    width: "100%",
    backgroundColor: "#ededfc",
    padding: 15,
  },
  buttonStyleInActive: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    alignItems: "center",
    borderColor: "black",
    marginLeft: 15,
    marginTop: 20,
    justifyContent: "center",
    width: 100,
    backgroundColor: "white",
  },
  buttonStyleActive: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    alignItems: "center",
    borderColor: "black",
    marginLeft: 15,
    marginTop: 20,
    justifyContent: "center",
    width: 100,
    backgroundColor: "green",
  },
});

export default Analytics;
