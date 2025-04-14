import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { styled } from "@fast-styles/react";
import { useEffect } from "react";

const Button = styled(TouchableOpacity, {
  // base styles
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 40,
  width: "100%",
  maxWidth: 200,
  borderRadius: 20,
  // variants
  variants: {
    coloScheme: {
      primary: {
        backgroundColor: "green",
      },
      negative: {
        backgroundColor: "red",
      },
      disabled: {
        backgroundColor: "gray",
      },
    },
  },
});

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        activeOpacity={0.8}
        onPress={() => console.log("clicked")}
        colorScheme='negative'>
        <Text>Click me</Text>
      </Button>
    </View>
  );
}
