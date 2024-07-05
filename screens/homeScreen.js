
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UsernameContext } from '../Contexte/Context'

function HomeScreen({ navigation }) {
  const username = useContext(UsernameContext)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenue, {username}!</Text>
      <Text style={styles.text}>Commencez à gérer vos tâches dès maintenant.</Text>

      <Button
        title="Voir ma List de Modules"
        onPress={() => navigation.navigate('TodoLists')}
        color="#007bff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  }
});
export default HomeScreen;