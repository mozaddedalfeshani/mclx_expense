import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CustomButtonProps } from "@/types";
import { TouchableOpacity } from "react-native";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Loding from "./Loding";

const Button = ({
  style,
  loading = false,
  onPress,
  children,
}: CustomButtonProps) => {
  if (loading) {
    return (
      <View style={[style, styles.button, { backgroundColor: "transparent" }]}>
        <Loding />
      </View>
    );
  }
  return (
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius._17,
    borderCurve: "continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});
