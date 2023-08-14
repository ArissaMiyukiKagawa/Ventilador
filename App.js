import * as React from 'react';
import { View, Button, Text, Animated, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';


function Inicio({ navigation }) {
  
  soundObject = new Audio.Sound();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text} >Você quer ligar o ventilador, mas sua namorada odeia frio, quer resolver este problema?</Text>
      <Button
        title="Resolver o problema"
        onPress={() => navigation.navigate('Ventilador')}
      />
    </View>
  );
}

function Ventilador({ navigation }) {
async function audioStart(){
  try {
    await soundObject.loadAsync(require('./som_ventilador.mp3'));
    await soundObject.playAsync();
  } 
  catch (error) {
    console.log(error)
  }
}
async function audioStop () {
  try {
    await soundObject.unloadAsync();
  } 
  catch (error) {
    console.log(error)
  }
};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>Pronto</Text>
      <Image
        style={styles.image}
        source={require("./ventilador.png")}
      />
      <Button title="ligar" onPress={() => audioStart()}/> 
      <Button title="Desligar" onPress={() => audioStop()}/>
    </View>
  );
}

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Início"
        component={Inicio}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'green' },
        }}
      />
      <Stack.Screen
        name="Ventilador"
        component={Ventilador}
        options={{
          headerStyleInterpolator: forFade,
          headerTintColor: 'white',
          headerStyle: { backgroundColor:'green'}
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  image: {
    paddingTop: 50,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
  text: {
    fontSize: 20
  },
});
