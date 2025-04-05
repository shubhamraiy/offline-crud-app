import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { RootState } from "../redux/store/store";
import { fetchItems, removeItem } from "../redux/slices/itemSlice";
import { Item } from "@/types";
import { AppDispatch } from "@/redux/store/store";
import { Button } from "@/components/Button";
import { ItemCard } from "@/components/ItemCard";
import { COLORS, FONT_SIZE, SPACING } from "../constants/theme";

type ItemListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ItemList"
>;

const ItemListScreen = () => {
  const navigation = useNavigation<ItemListScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleEdit = (item: Item) => {
    navigation.navigate("ItemForm", { item });
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.cardContainer}>
      <ItemCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Add New Item"
        onPress={() => navigation.navigate("ItemForm", {})}
        style={styles.addButton}
      />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id!.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: SPACING.md,
  },
  addButton: {
    margin: SPACING.md,
  },
  error: {
    color: COLORS.danger,
    fontSize: FONT_SIZE.md,
  },
  cardContainer: {
    marginBottom: SPACING.md,
  },
});

export default ItemListScreen;
