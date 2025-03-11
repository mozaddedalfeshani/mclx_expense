import { colors, spacingX, spacingY } from "@/constants/theme";
import {
  BottomTabBarProps,
  BottomTabDescriptor,
} from "@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types";
import { Platform, TouchableOpacity, View } from "react-native";

import Typo from "./Typo";
import { StyleSheet } from "react-native";
import { verticalScale } from "@/utils/styling";

import * as Icon from "phosphor-react-native";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const icons: any = {
    index: (isFocused: boolean) => (
      <Icon.House
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
    Statistics: (isFocused: boolean) => (
      <Icon.ChartBar
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
    Wallet: (isFocused: boolean) => (
      <Icon.Wallet
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
    Profile: (isFocused: boolean) => (
      <Icon.User
        size={verticalScale(30)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            // href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}>
            <Typo
              style={{ color: isFocused ? colors.primary : colors.neutral800 }}>
              {icons[route?.name] && icons[route?.name](isFocused)}
            </Typo>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(55),
    backgroundColor: colors.neutral900,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: colors.neutral200,
    borderTopWidth: 1,
  },
  tabbarItem: {
    color: colors.neutral600,
    marginBottom: Platform.OS === "ios" ? spacingY._10 : spacingY._5,
    justifyContent: "center",
    alignItems: "center",
  },
});
