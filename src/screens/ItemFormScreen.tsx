import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { createItem, editItem } from "../redux/slices/itemSlice";
import { Item } from "@/types";
import { AppDispatch } from "@/redux/store/store";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { COLORS, SPACING } from "../constants/theme";

type ItemFormScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ItemForm"
>;
type ItemFormScreenRouteProp = RouteProp<RootStackParamList, "ItemForm">;

const ItemFormScreen = () => {
  const navigation = useNavigation<ItemFormScreenNavigationProp>();
  const route = useRoute<ItemFormScreenRouteProp>();
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ name: "", description: "" });

  useEffect(() => {
    if (route.params?.item) {
      setName(route.params.item.name);
      setDescription(route.params.item.description);
    }
  }, [route.params?.item]);

  const validateForm = () => {
    const newErrors = { name: "", description: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const itemData = {
      name: name.trim(),
      description: description.trim(),
    };

    try {
      if (route.params?.item) {
        await dispatch(
          editItem({
            ...itemData,
            id: route.params.item.id,
            createdAt: route.params.item.createdAt,
          })
        );
      } else {
        await dispatch(createItem(itemData));
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter item name"
          error={errors.name}
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter item description"
          multiline
          numberOfLines={4}
          error={errors.description}
          style={styles.textArea}
        />
        <Button
          title={route.params?.item ? "Update Item" : "Add Item"}
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  form: {
    padding: SPACING.md,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: SPACING.md,
  },
});

export default ItemFormScreen;
