import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AlarmProvider } from "./context/AlarmContext"; //  추가

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       <AlarmProvider> 
        <Stack screenOptions={{ headerShown: false }} />
      </AlarmProvider>
    </GestureHandlerRootView>
  );
}