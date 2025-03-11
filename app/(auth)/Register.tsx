import { Alert, Pressable, StyleSheet, View } from "react-native";
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
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const nameRef = React.useRef(""); // Added nameRef
  const emailRef = React.useRef("");
  const passwordRef = React.useRef("");
  const confirmPasswordRef = React.useRef("");

  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (
      !nameRef.current || // Check if name is provided
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current
    ) {
      Alert.alert("Register", "Please fill all the fields");
      return;
    }
    if (passwordRef.current !== confirmPasswordRef.current) {
      Alert.alert("Register", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(
        emailRef.current,
        passwordRef.current,
        nameRef.current
      ); // Added name parameter
      setIsLoading(false);
      router.navigate("/Login");
    } catch (error) {
      let msg = "An error occurred";
      Alert.alert("Register", msg);
      setIsLoading(false);
    }

    // Add registration logic here
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{ gap: 20, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"bold"}>
            Welcome,
          </Typo>
          <Typo size={30} fontWeight={"bold"}>
            Create an Account
          </Typo>
        </View>
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Register now to start tracking your expenses
          </Typo>
          <Input
            onChangeText={(value) => (nameRef.current = value)} // Added name input
            placeholder="Enter Your Name"
            icon={<Icon.User size={24} color={colors.white} />}
          />
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
          <Input
            secureTextEntry={true}
            onChangeText={(value) => (confirmPasswordRef.current = value)}
            placeholder="Confirm Your Password"
            icon={<Icon.Password size={24} color={colors.white} />}
          />

          <Button onPress={handleSubmit} loading={isLoading}>
            <Typo size={16} fontWeight={"bold"} color={colors.black}>
              Register
            </Typo>
          </Button>
        </View>

        {/* footer section */}
        <View style={styles.footer}>
          <Typo size={15} style={styles.footerText}>
            Already have an account?
          </Typo>
          <Pressable
            onPress={() => {
              router.navigate("/Login");
            }}>
            <Typo size={15} color={colors.primary} fontWeight={"bold"}>
              Login
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  form: {
    gap: spacingY._20,
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
