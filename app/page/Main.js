import React from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import styles from "../style/Mainstyles";
import BottomNavigation from "../components/BottomNavigation";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import NotificationTab from "./alarm";
import { useState } from "react";
const MainPage = () => {
  const router = useRouter(); 
  const [isNotificationTabVisible, setNotificationTabVisible] = useState(false); // 알림 탭 상태

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F4F5F6" barStyle="dark-content" />

      {/* 상단 헤더 */}
      <View style={styles.header}>
        {/* 배터리 로고 */}
        <Image style={styles.logo} source={require('../assets/image/mainlogo2.png')} />
        
        {/* 알림 아이콘 */}
        <TouchableOpacity onPress={() => setNotificationTabVisible(true)}>
          <Image 
            source={require('../assets/icon/alarm.png')} 
            style={styles.notificationIcon} 
          />
        </TouchableOpacity>
      </View>

      {/* 프로필 카드 */}
      <View style={styles.profileCard}>
        <Text style={styles.userName}>김재민님이</Text>
        <Text style={styles.statusText}>
          걸어온 <Text style={styles.highlightText}>녹색발걸음</Text>
        </Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.points}>💰 150P</Text>
      </View>

      {/* ✅ 지도 섹션 (버튼 추가) */}
      <TouchableOpacity 
        style={styles.mapContainer}
        onPress={() => router.push('/components/GoogleMap')} // 
      >
        <View style={styles.mapTitleContainer}>
          <Text style={styles.sectionTitle}>내 주변 수거함 찾기</Text>
        </View>
        <Image
          source={require('../assets/image/aroundbox3.png')}  
          style={styles.mapImage}
        />
      </TouchableOpacity>

      {/* 도움말 섹션 */}
      <View style={styles.helpSection}>
        <Text style={styles.sectionTitle}>도움말</Text>
        <View style={styles.helpBoxContainer}>
          
          {/* ✅ "수거함 이용방법" 버튼 추가 */}
          <TouchableOpacity 
            style={styles.helpBox}
            onPress={() => router.push("/UsageGuide")} 
          >
            <Text style={styles.helpTitle}>수거함 이용방법</Text>
            <Text style={styles.helpText}>화재걱정 없는 배터리 배출의 시작</Text>
          </TouchableOpacity>

          {/* ✅ "자주하는 질문" 버튼 추가 */}
          <TouchableOpacity 
            style={styles.helpBox}
            onPress={() => router.push("/page/FAQScreen")} 
          >
            <Text style={styles.helpTitle}>자주하는 질문</Text>
            <Text style={styles.helpText}>사용자들이 자주 묻는 질문만 모았어요</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.customerService} onPress={()=>router.push('/page/ServiceCenter')}>
          <Text style={styles.customerServiceText}>
            불편사항이 있다면{"\n"}고객센터를 이용해주세요.
          </Text>
          <Text style={styles.customerServiceSubText}>
            24시간 상담원이 대기 중이에요.
          </Text>
        </TouchableOpacity>
     
      </View>
      <BottomNavigation />
            {/* 알림 탭 (슬라이딩 탭) */}
            <NotificationTab 
        visible={isNotificationTabVisible} 
        onClose={() => setNotificationTabVisible(false)} 
      />
    </View>
  );
};

export default MainPage;
