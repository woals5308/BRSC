import React from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../style/bottomstyles"; // 스타일 불러오기
import { router } from "expo-router";


export default function BottomNavigation() {
  return (
    <View style={styles.navbar}>
      {/* 왼쪽 아이콘 (홈, 쇼핑) */}
      <TouchableOpacity style={styles.navItemLeft} onPress={()=>router.replace('/page/Main')}>
        <FontAwesome5 name="home" size={20} color="gray" />
        <Text style={styles.navText}>홈</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItemLeft} onPress={()=>router.push('/page/boxalarm')}>
        <FontAwesome5 name="shopping-bag" size={20} color="gray" />
        <Text style={styles.navText}>알람</Text>
      </TouchableOpacity>

      {/* ✅ QR 스캔 버튼 (가운데) */}
      <TouchableOpacity onPress={()=>router.push('/page/QR')}>
        <Image style={styles.scanButton} source={require('../assets/image/qr.png')} />
      </TouchableOpacity>

      {/* 오른쪽 아이콘 (이용내역, 내 정보) */}
      <TouchableOpacity style={styles.navItemRight} onPress={()=>router.push('/page/boxlog')}>
        <MaterialCommunityIcons name="file-document-outline" size={24} color="gray" />
        <Text style={styles.navText}>이용내역</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItemRight}>
        <FontAwesome5 name="user" size={20} color="gray" />
        <Text style={styles.navText}>내 정보</Text>
      </TouchableOpacity>
    </View>
  );
}
