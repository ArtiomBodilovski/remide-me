import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ToDoList from "../screens/TodoListScreen";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const navigation = useNavigation();

  const handleSingOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Home"
        options={{
          headerTitle: "RemindMe",
          headerBackVisible:false,
          headerRight: () => (
            <TouchableOpacity style={styles.button} onPress={handleSingOut}>
              <Text style={styles.buttonText}>Sing Out</Text>
            </TouchableOpacity>
          ),
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="ToDoList"
        options={{
          headerTitle:null,
        }}
        component={ToDoList}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0782F9",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
