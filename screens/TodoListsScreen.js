
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, FlatList } from 'react-native';
import { createTodoList, getTodoLists, deleteTodoList } from '../js/todoList';
import { TokenContext, UsernameContext, UseTodoListConstext } from '../Contexte/Context';
import TodoList from '../components/TodoList';


function TodoListsScreen({ navigation }) {
    const [userName, setUsername] = useContext(UsernameContext);
    const [todoList, setTodoList] = useContext(UseTodoListConstext);
    const [token, setToken] = useContext(TokenContext);
    const [title, setTitle] = useState([]);
    const [newTitle, setNewTitle] = useState("")

    useEffect(() => {
        initTodos();
    }, [])

    const handleTodoList = () => {
        createTodoList(userName, newTitle, token)
            .then(data => {
                initTodos();
                setNewTitle("");
            })
            .catch((err) => console.log(err.message));
    };

    function initTodos() {
        getTodoLists(userName, token)
            .then(todoListsRetrieved => {
                setTodoList(todoListsRetrieved);
                setTitle(todoListsRetrieved);
            })
            .catch((err) => console.log(err.message));
    };

    function myDeleteTodoList(id) {
        deleteTodoList(id, token)
            .then(data => {
                initTodos()
            })
            .catch((err) => console.log(err.message));

    }


    return (
        <View style={styles.container}>
            <View style={styles.textInput_group}>
                <View>
                    <TextInput
                        placeholder="Add new title"
                        value={newTitle}
                        onChangeText={setNewTitle}
                        style={styles.input}
                    />
                </View>
                <View style={styles.buttoninput_view}>
                    <Button title="Create" onPress={handleTodoList} />
                </View>

            </View>

            <View>
                {/* on vétifie que la liste est valide et contien au moin un element */}
                {todoList && todoList.length > 0 ? (
                    <FlatList
                        style={styles.todoListText}
                        data={todoList}
                        renderItem={({ item }) =>
                            <TodoList
                                newTitle={item}
                                myDeleteTodoList={myDeleteTodoList}
                                navigationList={navigation}
                            />

                        }
                    />
                ) : (
                    <Text style={styles.emptyListText}>Liste de Modules est vide </Text>
                )}

            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    textInput_group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#007bff',
        borderWidth: 2,
        borderRadius: 5,
        flex: 1,
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
        backgroundColor: '#6c757d',
        borderRadius: 8,
        color: '#343a40',
        marginBottom: 10,
    },
    emptyListText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6c757d',
        textAlign: 'center',
        marginTop: 50,
    },
})

export default TodoListsScreen;
