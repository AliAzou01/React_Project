import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function TodoItem(props) {
    const [done, setDone] = useState(props.item.done);

    useEffect(() => {
        setDone(props.item.done)
    }, [props.item.done]
    );

    const submitContentChange = (stateItem) => {
        setDone(stateItem)
        props.updateItem(props.item.id, stateItem);

    };

    return (
        <View style={styles.content}>
            <Switch value={props.item.done} onValueChange={submitContentChange} />
            <Text style={[styles.text_item, { textDecorationLine: props.item.done ? 'line-through' : 'none' }]}>{props.item.content}</Text>
            <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
                <Image source={require('../assets/trash-can-outline.png')}
                    style={{ height: 24, width: 24 }} />
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        flex: 1,
    },
    text_item: {
        marginLeft: 10,
        width: 150
    },
    input: {
        border: 1,

    },
    inputContent: {
        borderWidth: 1,
        borderColor: 'gray',
        color: 'black',
        borderRadius: 4,
        backgroundColor: 'gray'
    }

})