import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Task from "../components/Task";
import { auth, db } from "../firebase";

const ToDoList = (props) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const { day } = props.route.params;

  useEffect(() => {
    const getContractData = async () => {
      const docRef = doc(db, "users", auth.currentUser?.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTaskItems(docSnap.data().days_data[day]);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getContractData();
    console.log(taskItems);
  }, []);

  const upDateDayLists = async (new_day_list) => {
    console.log(`in update function the list is :${new_day_list}`);
    const docRef = doc(db, "users", auth.currentUser?.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const days_data = docSnap.data().days_data;
      days_data[day] = new_day_list;
      await updateDoc(docRef, {
        days_data: days_data,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handleAddTask = async () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    upDateDayLists([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    upDateDayLists(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ToDoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
