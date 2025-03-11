import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Typo from "@/components/Typo";
import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Input from "@/components/Input";
import * as Icon from "phosphor-react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  // we are using ref instead of useState coz while uesr typing we dont want to re-render the component
  const emailRef = React.useRef("");
  const passwordRef = React.useRef("");
  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(emailRef.current, passwordRef.current);
    setIsLoading(false);
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{ gap: 20, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"bold"}>
            Hey,
          </Typo>
          <Typo size={30} fontWeight={"bold"}>
            Welcome Back
          </Typo>
        </View>
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Login now for track your all expenses
          </Typo>
          <Input
            onChangeText={(value) => (emailRef.current = value)}
            placeholder="Enter Your Email"
            icon={<Icon.At size={24} color={colors.white} />}
          />
          <Input
            secureTextEntry={true}
            onChangeText={(value) => (passwordRef.current = value)}
            placeholder="Enter Your Password"
            icon={<Icon.Password size={24} color={colors.white} />}
          />

          <Typo size={14} style={styles.forgotPassword}>
            Forgot Password?
          </Typo>

          <Button onPress={handleSubmit} loading={isLoading}>
            <Typo size={16} fontWeight={"bold"}>
              Login
            </Typo>
          </Button>
        </View>

        {/* footer section */}
        <View style={styles.footer}>
          <Typo size={15} style={styles.footerText}>
            Don't have an account?
          </Typo>
          <Pressable
            onPress={() => {
              router.push("/Register");
            }}>
            <Typo size={15} fontWeight={"bold"}>
              Sign Up
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
