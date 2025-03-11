import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HeaderProps } from "@/types";
import Typo from "./Typo";
import { colors } from "@/constants/theme";

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <Typo style={styles.title} color={colors.white} size={22}>
        {title}
      </Typo>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: 10, // Add some space between the icon and the title
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
});
