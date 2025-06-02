import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../style/bottomstyles";
import { router } from "expo-router";

export default function BottomNavigation() {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/page/Main')}>
        <FontAwesome5 name="home" size={20} color="gray" />
        <Text style={styles.navText}>홈</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/page/boxalarm')}>
        <FontAwesome5 name="bell" size={20} color="gray" />
        <Text style={styles.navText}>알람</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/page/boxlist')}>
        <FontAwesome5 name="list" size={20} color="gray" />
        <Text style={styles.navText}>알람리스트</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/page/boxlog')}>
        <MaterialCommunityIcons name="file-document-outline" size={24} color="gray" />
        <Text style={styles.navText}>이용내역</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/page/MyInfo')}>
        <FontAwesome5 name="user" size={20} color="gray" />
        <Text style={styles.navText}>내 정보</Text>
      </TouchableOpacity>
    </View>
  );
}
