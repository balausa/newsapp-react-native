import React from "react";
import { Main } from "./components/Main";
import { FullInfo } from './components/FullInfo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name='Main'
                component={Main}
                options={
                    { 
                        title: 'Главная', 
                        headerStyle:{backgroundColor: 'green', height:100},
                        headerTitleStyle: {fontSize: 26}
                    }
                }
            />
            <Stack.Screen
                name='FullInfo'
                component={FullInfo}
                options={
                    { 
                        title: 'Статьи', 
                        headerStyle:{backgroundColor: 'green', height:100},
                        headerTitleStyle: {fontSize: 26}
                    }
                }
            />
        </Stack.Navigator>
    </NavigationContainer>
}