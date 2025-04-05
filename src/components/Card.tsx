import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from "../constants/theme";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "flat";
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "elevated",
  style,
  ...props
}) => {
  return (
    <View style={[styles.card, styles[`${variant}Card`], style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  elevatedCard: {
    ...SHADOWS.md,
  },
  outlinedCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  flatCard: {
    backgroundColor: COLORS.gray[100],
  },
});
