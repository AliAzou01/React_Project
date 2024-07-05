
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, ImageBackground } from 'react-native';

import { TokenContext } from "../Contexte/Context";
import TodoItem from "../components/TodoItem"
import { getTodos, createTodo, deleteTodo, updateTodo } from "../js/todo";

//ici on a utiliser route pour permetre de passé des argument de l'ecrans
//precedant a l'actuel
export default function todoItemScreen({ route, navigation }) {


  const [token, setToken] = useContext(TokenContext)
  const { id, title, username } = route.params
  const [todoList, setTodoList] = useState([])
  const [copieListTodo, setCopieListTodo] = useState([]);
  const [itemContent, setItemContent] = useState("")
  const [count, setCount] = useState(0);



  useEffect(() => {
    initTodos();
  }, []);

  function initTodos() {
    getTodos(id, token).then(todos => {
      setTodoList(todos);
      setCopieListTodo(todos);
    }).catch(err => console.log(err.message));
  }

  const myAddNewTodo = () => {
    createTodo(itemContent, id, token).then(todo => {
      initTodos();
      setItemContent("");
    }).catch(err => console.log(err.message));
  }


  const myUpdateItem = (id, state) => {
    updateTodo(id, state, token)
      .then(data => {
        initTodos();
      })
      .catch((err) => console.log(err.message));
  }


  const myDeleteTodo = (id) => {
    deleteTodo(id, token)
      .then(data => {
        initTodos()
        setItemContent("")
      })
      .catch((err) => console.log(err.message));
  }


  useEffect(() => {
    setCount(todoList.filter(item => item.done).length);
  }, [todoList]);



  const checkAll = () => {
    let copieList = [...todoList]
    copieList.forEach(item => {
      myUpdateItem(item.id, true)
    });

  }

  const uncheckAll = () => {
    let copieList = [...todoList]
    copieList.forEach(item => {
      myUpdateItem(item.id, false);
    });
  }

  const showAll = () => {

    setCopieListTodo(todoList);
  }

  const showDone = () => {

    setCopieListTodo(todoList.filter(item => item.done));
  }

  const showUndone = () => {

    setCopieListTodo(todoList.filter(item => !item.done));
  }


  //le calcule du pourcentage
  const calculePercentage = todoList.length > 0 ? (count / todoList.length) * 100 : 0;


  return (

    <View style={styles.container}>
      <Text style={styles.counterText}>Tâches réalisées : {count}</Text>
      <View style={styles.porcentageBarContainer}>
        <View style={[styles.porcentageBar, { width: `${calculePercentage}%` }]} />
      </View>
      <View style={styles.textInput_group}>
        <View>
          <TextInput
            style={styles.textinput_view}
            onChangeText={(item) =>
              setItemContent(item)
            }
            placeholder="saisisez votre new Todo"
            value={itemContent}
          />
        </View>
        <View style={styles.buttoninput_view}>
          <Button onPress={myAddNewTodo} title='new' />
        </View>

      </View>
      {todoList.length !== 0 ? (
        <FlatList
          style={styles.todoListText}
          data={copieListTodo}
          renderItem={({ item }) => <TodoItem
            item={item}
            updateItem={myUpdateItem}
            deleteTodo={myDeleteTodo}
            navigation={navigation}

          />} />
      ) : (
        <View>
          <Text style={styles.emptyListText}>Liste de tâches vide</Text>
        </View>
      )}
      <View>
        <View style={styles.buttoninput_check}>
          <View>
            <Button onPress={checkAll} title='checkAll' />
          </View>
          <View>
            <Button onPress={uncheckAll} title="Uncheck" />
          </View>
        </View>
        <View style={styles.buttoninput_other}>

          <Button onPress={showDone} title="OnlyDone" />


          <Button onPress={showUndone} title="OnlyUndone" />


          <Button onPress={showAll} title="showAll" />

        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  textInput_group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textinput_view: {
    height: 50,
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 5,

    marginRight: 10,
    padding: 10,
    fontSize: 16,
  },
  buttoninput_view: {
    justifyContent: 'center',
    width: '30%',
  },
  todoListText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#black',
    flex: 1,
    marginBottom: 10,
  },
  buttoninput_check: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  buttoninput_other: {
    display: 'flex',
    marginVertical: 20,
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  porcentageBarContainer: {
    height: 20,
    width: '50%',
    backgroundColor: '#e7e5e5',
    borderRadius: 15,
    marginBottom: 20,
  },
  porcentageBar: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 15,
  },
  emptyListText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 50,
  }

});
