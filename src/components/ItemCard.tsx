import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Item } from "../types";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "../constants/theme";
import { Card } from "./Card";
import { Button } from "./Button";

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.date}>
          {new Date(item.createdAt || "").toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.actions}>
        <Button
          title="Edit"
          variant="outline"
          size="small"
          onPress={() => onEdit(item)}
          style={styles.actionButton}
        />
        <Button
          title="Delete"
          variant="secondary"
          size="small"
          onPress={() => onDelete(item.id!)}
          style={styles.actionButton}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
  },
  date: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    marginLeft: SPACING.sm,
  },
});
