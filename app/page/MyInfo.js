import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../api/logoutApi';
import { fetchMyInfo } from '../api/myinfoApi';
import BottomNavigation from '../components/BottomNavigation';
import AlarmIcon from '../components/AlarmIcon';
import NotificationTab from './alarm'; // 경로에 맞게 조정
import styles from '../style/myInfostyles';
import useTotalPoint from "../hook/usePoint";

const MyInfoPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isNotificationTabVisible, setNotificationTabVisible] = useState(false);
   const totalPointRaw = useTotalPoint();
  useEffect(() => {
    const loadUserInfo = async () => {
      const data = await fetchMyInfo();
      console.log('[MyInfoPage] 사용자 정보:', data);
      setUserInfo(data);
    };
    loadUserInfo();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 정보</Text>
        <View style={styles.notificationWrapper}>
          <AlarmIcon onPress={() => setNotificationTabVisible(true)} />
        </View>
      </View>

      {/* 알림 모달 */}
      <NotificationTab
        visible={isNotificationTabVisible}
        onClose={() => setNotificationTabVisible(false)}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: userInfo?.profileImage || 'https://placehold.co/100x100?text=Profile',
            }}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.name}>{userInfo?.name || '이름 없음'}</Text>
            <Text style={styles.email}>{userInfo?.id || '아이디 없음'}</Text>
          </View>
        </View>

        {[
          { label: '보상금' },
          { label: '공지사항' },
          { label: '고객센터' },
          { label: '약관 및 정책' },
        ].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text>{item.label}</Text>
            <Text style={styles.edit}>
              {item.label === '보상금' ? `${totalPointRaw}P` : ''}
            </Text>
          </View>
        ))}

        {/* 앱 버전 */}
        <View style={styles.listItem}>
          <Text>앱 버전</Text>
          <View style={styles.versionBox}>
            <Text style={styles.versionText}>25.2.1</Text>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateText}>업데이트</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 로그아웃 */}
        <TouchableOpacity style={styles.listItem} onPress={logout}>
          <Text>로그아웃</Text>
          <Text>&gt;</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
};


export default MyInfoPage;
