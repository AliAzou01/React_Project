import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/navigation';

import { TokenContext, UsernameContext, UseTodoListConstext } from './Contexte/Context'
import TodoList from './components/TodoList';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       {/* <TodoList/> */}
//       <SignUpScreen/>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




export default function App() {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)
  const [todoList, setTodoList] = useState(null)
  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <UseTodoListConstext.Provider value={[todoList, setTodoList]}>
          <Navigation />
       </UseTodoListConstext.Provider>
     </TokenContext.Provider>
    </UsernameContext.Provider >
  )
}

