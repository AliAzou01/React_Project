
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

export default function TodoList(props) {
  const { id, title, username } = props.newTitle;

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {

          props.navigationList.navigate("TodoLists", {
            screen: "TasksScreen",
            params: {
              id,
              title,
              username,
            },
          })
        }}
      >
        <Text style={styles.text_deco}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.myDeleteTodoList(id)}>
        <Image
          source={require("../assets/trash-can-outline.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    height: 24,
    width: 24,
  },
  text_deco: {
    fontSize: 23,
    marginLeft: 15,
    width: 130,
  }

});
