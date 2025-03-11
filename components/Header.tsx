import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HeaderProps } from "@/types";
import Typo from "./Typo";
import { colors } from "@/constants/theme";

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
  return (
    <View style={styles.container}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <Typo
        style={{
          width: leftIcon ? "80%" : "100%",
          alignItems: "center",
          textAlign: "center",
        }}
        color={colors.white}
        size={22}>
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
    alignSelf: "flex-start",
  },
});
