import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { Image } from "expo-image";
import { GetProfileImage } from "@/services/getProfileImage";
import * as Icon from "phosphor-react-native";

import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

import Animated, { FadeInDown } from "react-native-reanimated";

import { useRouter } from "expo-router";

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();

  const accountOptions = [
    {
      title: "Edit Profile",
      icon: <Icon.User size={24} color={colors.white} weight="fill" />,
      bgColor: "#c264f5",
      routeName: "(modals)/EditProfile",
      runFunction: () => {
        router.push("/(modals)/EditProfile");
      },
    },
    {
      title: "Setting",
      icon: <Icon.Gear size={24} color={colors.white} weight="fill" />,
      bgColor: "#f5a623",
      // routeName: "(modals)/EditProfile",
      runFunction: () => {
        Alert.alert("Notice", "Comming soon...");
      },
    },
    {
      title: "Privacy and policy",
      icon: <Icon.Lock size={24} color={colors.white} weight="fill" />,
      bgColor: "#2cb9b0",
      // routeName: "(modals)/EditProfile",
      runFunction: () => {
        Alert.alert("Notice", "Comming soon...");
      },
    },
    {
      title: "Logout",
      icon: <Icon.Power size={24} color={colors.white} weight="fill" />,
      bgColor: "#f64e60",
      // routeName: "(modals)/EditProfile",
      runFunction: () => {
        Alert.alert("Notice", "Do you want to logout ?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Ok", onPress: () => signOut(auth) },
        ]);
      },
    },
  ];
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title={"Profile"} style={{ marginVertical: spacingY._10 }} />

        {/* user info  */}
        <View style={styles.userInfo}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={GetProfileImage(user?.image)}
              contentFit="cover"
              transition={100}
              style={styles.avatar}
            />
          </View>
          {/* Name and email show*/}
          <View style={styles.nameContainer}>
            <Typo size={24} color={colors.neutral100} fontWeight={600}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral500} fontWeight={100}>
              {user?.email}
            </Typo>
          </View>
        </View>

        {/* Account options */}
        <View style={styles.accountOptions}>
          {accountOptions.map((item, index: number) => {
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 100)
                  .springify()
                  .damping(15)}
                style={styles.listItem}
                key={index}>
                <TouchableOpacity
                  style={styles.flexRow}
                  onPress={item.runFunction}>
                  <View
                    style={[
                      styles.listIcon,
                      {
                        backgroundColor: item?.bgColor,
                      },
                    ]}>
                    {item.icon}
                  </View>
                  <Typo size={16} style={{ flex: 1 }} fontWeight={600}>
                    {item.title}
                  </Typo>
                  {item.title === "Logout" ? (
                    ""
                  ) : (
                    <Icon.CaretRight size={24} color={colors.neutral500} />
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
        <View>
          <Typo style={{ textAlign: "center", color: "#2d2d2e" }}>
            Made by Muradian
          </Typo>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
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
    // overflow: "hidden",
    // position: "relative",
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});
