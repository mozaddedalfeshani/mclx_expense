import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { spacingY } from "@/constants/theme";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ModalWrapper from "@/components/ModalWrapper";

const EditProfile = () => {
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title="Update Profile" leftIcon={<BackButton />} />
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
});
