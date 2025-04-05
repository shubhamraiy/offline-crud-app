import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "../types";

const STORAGE_KEY = "@items";

export const getItems = async (): Promise<Item[]> => {
  try {
    const itemsJson = await AsyncStorage.getItem(STORAGE_KEY);
    return itemsJson ? JSON.parse(itemsJson) : [];
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }
};

export const addItem = async (
  item: Omit<Item, "id" | "createdAt">
): Promise<number> => {
  try {
    const items = await getItems();
    const newItem: Item = {
      ...item,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedItems = [newItem, ...items];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    return newItem.id!;
  } catch (error) {
    console.error("Error adding item:", error);
    throw new Error("Failed to add item");
  }
};

export const updateItem = async (item: Item): Promise<void> => {
  try {
    const items = await getItems();
    const index = items.findIndex((i) => i.id === item.id);
    if (index === -1) {
      throw new Error("Item not found");
    }
    const updatedItems = [...items];
    updatedItems[index] = {
      ...item,
      updatedAt: new Date().toISOString(),
      createdAt: item.createdAt || new Date().toISOString(), // Preserve original createdAt or set new one if missing
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Error updating item:", error);
    throw new Error("Failed to update item");
  }
};

export const deleteItem = async (id: number): Promise<void> => {
  try {
    const items = await getItems();
    const updatedItems = items.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Error deleting item:", error);
    throw new Error("Failed to delete item");
  }
};
