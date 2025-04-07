import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import PagerView from "react-native-pager-view";
import { Ionicons } from "@expo/vector-icons";
import styles from "../style/usedetailstyles";

const pages = [
  "배출할 폐건전지를 준비하세요",
  "폐건전지를 밀봉해주세요",
  "가까운 수거함을 찾아주세요",
  "폐건전지를 수거함에 배출하세요",
  "배출 후 포인트를 적립하세요",
  "환경 보호 활동에 동참하세요", // 마지막 페이지도 기존과 동일한 구조 유지
];

const UsageGuide = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      {/* StatusBar 설정 */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 헤더 영역 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>이용방법</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* 슬라이드 페이지 */}
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {pages.map((text, index) => (
          <View key={index} style={styles.page}>
            {/* 기존 내용 유지 */}
            <View style={styles.imageContainer}>
              <Text style={styles.placeholderText}>
                캐릭터 마스코트를 이용한{"\n"}설명 삽화가 들어갈 자리입니다.
              </Text>
            </View>
            <Text style={styles.description}>{text}</Text>

            {/* 마지막 페이지에만 버튼 추가 */}
            {index === pages.length - 1 && (
              <TouchableOpacity style={styles.finalButton} onPress={() => router.push("/components/GoogleMap")}>
                <Text style={styles.finalButtonText}>자 이제 배터리를 이용하러 가볼까요?</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </PagerView>

      {/* 페이지 인디케이터 */}
      <View style={styles.indicatorContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default UsageGuide;

