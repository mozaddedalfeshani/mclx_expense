import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ModalWrapper from "@/components/ModalWrapper";
import { Image } from "expo-image";
import { GetProfileImage } from "@/services/getProfileImage";
import { scale, verticalScale } from "@/utils/styling";
import * as Icon from "phosphor-react-native";
import Input from "@/components/Input";
import { UserDataType } from "@/types";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { updateUser } from "@/services/userService";
import { useRouter } from "expo-router";

const EditProfile = () => {
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });
  const { user, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      image: user?.image || null,
    });
  }, [user]);

  const handleUpdateProfile = async () => {
    const { name, image } = userData;
    console.log(userData);

    if (!name.trim()) {
      Alert.alert("User", "Please enter your name");
      return; // return is used to stop the execution of the function
    }
    setLoading(true);
    const res = await updateUser(user?.uid as string, userData);
    setLoading(false);
    if (res.success) {
      updateUserData(user?.uid as string);
      router.back();
      Alert.alert("User", "Profile updated successfully");
    } else {
      Alert.alert("User", res?.msg);
    }
  };
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* input form  */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              source={GetProfileImage(userData?.image)}
              contentFit="cover"
              style={styles.avatar}
              transition={100}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Icon.Pen size={verticalScale(20)} color={colors.neutral500} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Name"
              value={userData.name}
              onChangeText={(value) => {
                setUserData({ ...userData, name: value }); // ...userData is used to keep the previous stateand name: value is used to update the name
              }}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button
          onPress={handleUpdateProfile}
          style={{ flex: 1 }}
          loading={loading}>
          <Typo color={colors.black} fontWeight={500} size={16}>
            Update Profile
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",

    paddingHorizontal: spacingY._20,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
    // overflow: "hidden",
    // position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
});
