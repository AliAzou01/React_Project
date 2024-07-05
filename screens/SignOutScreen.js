import React, { useContext } from "react";
import { Button, View, StyleSheet } from "react-native";

import { TokenContext, UsernameContext } from "../Contexte/Context";

export default function SignOutScreen({ navigation }) {
    const [token, setToken] = useContext(TokenContext)
    const [username, setUsername] = useContext(UsernameContext)

    function disconection() {
        setToken(null);
        setUsername(null);
    }
    return (
        <View style={styles.button} >
            <Button title="deconnecté" onPress={disconection} />
        </View>
    )

}
const styles = StyleSheet.create({
    button: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        borderRadius: 5,
        alignItems: "center",
    }
});
