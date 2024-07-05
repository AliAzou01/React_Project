import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, TextInput, Text } from 'react-native';
import { signUp } from '../js/sign';
import { TokenContext, UsernameContext } from '../Contexte/Context';
import { Link } from "@react-navigation/native";

function SignUpScreen({ navigation }) {
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('')

    const handleSignUpPress = () => {
      signUp(userName, password) 
      .then((data) => {
            setToken(data);
            setUsername(userName);
            navigation.navigate('SignIn'); 
          })
          .catch((error) => {setErrorMessage(error.message)});
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                value={userName}
                onChangeText={setUserName}
                style={styles.input}
            />
            <TextInput
                placeholder="Password" 
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry 
            />
            <View>
            <Button style={styles.button} title="Sign Up" onPress={handleSignUpPress} />
            {ErrorMessage ? <Text style={styles.textError}>{ErrorMessage}</Text> : null}
            <Text>
                Avez vous déjas un compte?
                <Link style={styles.link} to={{ screen: "SignIn" }}>
                  Sign In
                </Link>
            </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white', 
      padding: 20,
    },
    input: {
      height: 50,
      borderColor: '#007bff', 
      borderWidth: 2,
      borderRadius: 5, 
      marginBottom: 15,
      padding: 10,
      width: '100%', 
      fontSize: 16,
    },
    button: {
      padding: 10,
      borderRadius: 5, 
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20, 
    },
   
    link: {
      color: 'blue', 
      marginTop: 20, 
      textDecorationLine: 'underline', 
    },
    textError: {
      fontSize:14,
      color: 'red',
      marginTop:13,
    }
  });

export default SignUpScreen;