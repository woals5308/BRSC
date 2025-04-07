import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../style/FAQstyles";

const faqData = [
  { id: "1", question: "배출완료 버튼이 보이지 않아요", answer: "앱을 재시작해도 보이지 않을 때는 고객센터로 연락해주세요. 버튼 조치를 취해드릴게요." },
  { id: "2", question: "포인트는 어떻게 사용할 수 있나요?", answer: "배출 완료 후 받은 포인트로 쇼핑 기프트콘에서 충전제품이나 음식을 교환해 무료로 활용할 수 있어요." },
  { id: "3", question: "연기가 나는 수거함, 열어도 되나요?", answer: "현재 가능한 일은 수거함을 가까이 가지 마세요. 화재가 진행된 수거함은 QR 인식이 불가능합니다." },
  { id: "4", question: "한 번에 몇 개 까지 배출할 수 있나요?", answer: "1회당 배출 제한은 없지만 본 배터리는 가급적 쌓이지 않도록 하고 있어요. 10개 이상 배출할 때는 개별 가능한 점을 확인해주세요." }
];

const FAQScreen=()=> {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back('/page/Main')}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>자주하는 질문</Text>
      </View>

      {/* FAQ 리스트 */}
      <FlatList
        data={faqData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{item.question}</Text>
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }} // 고객센터 박스가 리스트를 가리지 않도록 패딩 추가
      />

      {/* 고객센터 안내 박스 */}
      <TouchableOpacity style={styles.customerService} onPress={()=>router.push('/page/ServiceCenter')}>
        <Text style={styles.customerServiceText}>
          불편사항이 있다면{"\n"}고객센터를 이용해주세요.
        </Text>
        <Text style={styles.customerServiceSubText}>
          24시간 상담원이 대기 중이에요.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default FAQScreen;
