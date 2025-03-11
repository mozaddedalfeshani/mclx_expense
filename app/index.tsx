import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("/welcome");
  //   }, 2000);
  // }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/splashImage.png")}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral900,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "20%",
    aspectRatio: 1,
  },
});
