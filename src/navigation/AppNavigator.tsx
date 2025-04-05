import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemListScreen from "../screens/ItemListScreen";
import ItemFormScreen from "../screens/ItemFormScreen";
import { Item } from "@/types";
import { COLORS, FONT_SIZE, FONT_WEIGHT } from "../constants/theme";

export type RootStackParamList = {
  ItemList: undefined;
  ItemForm: { item?: Item };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ItemList"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: FONT_WEIGHT.bold,
            fontSize: FONT_SIZE.lg,
          },
        }}
      >
        <Stack.Screen
          name="ItemList"
          component={ItemListScreen}
          options={{ title: "Items" }}
        />
        <Stack.Screen
          name="ItemForm"
          component={ItemFormScreen}
          options={({ route }) => ({
            title: route.params?.item ? "Edit Item" : "Add Item",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
