import { StyleSheet } from "react-native";
import React from "react";
//6.9k (gzipped: 2.7k) 1.7k (gzipped: 0.8k) this line come from a vs extension called "filesize"

import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(modals)/EditProfile"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
