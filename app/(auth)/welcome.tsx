import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import AntDesign from "react-native-vector-icons/AntDesign";
import Button from "@/components/Button";

const Welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* login button and welcome image */}
        <TouchableOpacity style={styles.loginButton}>
          <Typo fontWeight={500}>Sign in</Typo>
        </TouchableOpacity>
        {/* welcome image  */}
        <Image
          resizeMode="contain"
          style={styles.welcomeImage}
          source={require("../../assets/images/welcome.png")}
        />

        {/* footer */}
        <View style={styles.footer}>
          <View style={{ alignItems: "center" }}>
            <Typo fontWeight={400}>Welcome to</Typo>
            <Typo fontWeight={300}>
              <Typo fontWeight={900}>MCLX</Typo> Expense Tracker{" "}
              <AntDesign name="doubleright" size={17} />
            </Typo>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => {}}>
              <Typo size={22} color={colors.neutral900} fontWeight={600}>
                Get Started
              </Typo>
            </Button>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },

  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingY._25,
  },
});
