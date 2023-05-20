import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Item,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const DaysNavigationList = () => {
  const days = [
    {
      id: 1,
      name: "Sunday",
      image: require("../assets/days/sunday.png"),
    },
    {
      id: 2,
      name: "Monday",
      image: require("../assets/days/monday.png"),
    },
    {
      id: 3,
      name: "Thursday",
      image: require("../assets/days/thursday.png"),
    },
    {
      id: 4,
      name: "Wednesday",
      image: require("../assets/days/wednesday.png"),
    },
    {
      id: 5,
      name: "Tuesday",
      image: require("../assets/days/tuesday.png"),
    },
    {
      id: 6,
      name: "Friday",
      image: require("../assets/days/friday.png"),
    },
    {
      id: 7,
      name: "Saturday",
      image: require("../assets/days/saturday.png"),
    },
  ];
  const navigation = useNavigation();

  const handleDayPress = (day) => {
    navigation.navigate("ToDoList",{day:day})
  };

  const dayItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleDayPress(item.id)}
      >
        <View style={styles.avatarContainer}>
          <Image source={item.image} style={styles.avatar} />
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  headerComponent = () => {
    return <Text style={styles.listHeaderline}>Days</Text>;
  };

  itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView backgroundColor={"white"}>
      <FlatList
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={headerComponent}
        data={days}
        renderItem={dayItem}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<Text>This is a very flat list</Text>}
      />
    </SafeAreaView>
  );
};

export { DaysNavigationList };

const styles = StyleSheet.create({
  listHeader: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },

  listHeaderline: {
    color: "#333",
    fontSize: 21,
    fontWeight: "bold",
  },

  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },
  avatarContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
    height: 89,
    width: 89,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  avatar: {
    height: 55,
    width: 55,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 15,
  },

  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
});
