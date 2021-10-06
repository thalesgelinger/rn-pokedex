import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./../pages/home/index";
import Details from "./../pages/details/index";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
