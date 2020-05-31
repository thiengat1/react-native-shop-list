import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DetailProduct from './components/DetailProduct'
import ProductList from './components/ProductList';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen 
        name="Product" 
        component={ProductList}
        options={{
          title:"Product",
          headerStyle:{
            backgroundColor:"red"
          },
          headerTintColor: '#fff',
        }} 
        />
        <Stack.Screen 
        name="DetailProduct" 
        component={DetailProduct}
       
          options={({ route }) => ({ 
            title: route.params.product.name ,
            headerStyle:{
              backgroundColor:"red"
            },
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
