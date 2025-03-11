import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";

const Profile = () => {
  return (
    <ScreenWrapper>
      <View>
        <Typo>Hello</Typo>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({});
