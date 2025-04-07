import React from "react";
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../style/servicecenterstyles";

const faqTags = ["포인트 환불", "화재 수거함", "QR코드 인식", "현금 결제", "기타", "BATTER 법인"];
const announcements = [
  { id: "1", title: "[공지] 개인정보 처리방침 개정 안내" },
  { id: "2", title: "[공지] BATTER 서비스 지역 확대 안내" }
];

const CustomerService = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>고객센터</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>  
        {/* 검색창 */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="어떤 점이 궁금하신가요?" />
          <AntDesign name="search1" size={20} color="gray" style={styles.searchIcon} />
        </View>

        {/* 카테고리 태그 */}
        <View style={styles.tagsContainer}>
          {faqTags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tagButton}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 공지사항 섹션 */}
        <Text style={styles.sectionTitle}>공지사항</Text>
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.announcementItem}>
              <Text style={styles.announcementText}>{item.title}</Text>
              <AntDesign name="right" size={16} color="gray" />
            </TouchableOpacity>
          )}
          scrollEnabled={false} // ScrollView 안에서 동작하도록 설정
        />

        {/* 상담 연결 */}
        <Text style={styles.sectionTitle}>상담연결</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>채팅 상담</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.buttonText}>전화 상담</Text>
          </TouchableOpacity>
        </View>

        {/* 사업자 정보 */}
        <View style={styles.businessInfo}>
          <Text style={styles.businessText}>(주)BATTER 사업자 정보</Text>
          <Text style={styles.businessDetails}>
            사업자 등록번호 : 041-530-2114  |  대표 : 정윤식{"\n"}
            주소: 충청남도 아산시 탕정면 선문로 222번길 70{"\n"}
            고객센터: 충청남도 아산시 탕정면 선문로 222번길 71
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default CustomerService;