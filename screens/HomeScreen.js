import React from "react";
import { auth } from "../firebase";
import { DaysNavigationList } from "../navigation/DaysNavigationList";
const HomeScreen = () => {
  return (
    <DaysNavigationList />
    // <View style={styles.container}>
    //   <Text>Email: {auth.currentUser?.email}</Text>
    // </View>
  );
};

export default HomeScreen;
