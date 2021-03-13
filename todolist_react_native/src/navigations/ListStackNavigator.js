import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListCategoryScreen from '../screens/ListCategoryScreen';
import ListDetailScreen from '../screens/ListDetailScreen';

const ListStackNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="categories">
                <Stack.Screen name="categories" component={ListCategoryScreen} />
                <Stack.Screen name="todos" component={ListDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ListStackNavigator
