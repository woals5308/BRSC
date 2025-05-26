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



const MyInfoPage = () => {
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태

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
      <Text style={styles.title}>내 정보</Text>

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
          <TouchableOpacity>
            <Text style={styles.edit}>수정하기 &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* 항목 목록 */}
        {[
          { label: '개인정보', action: '수정하기' },
          { label: '공지사항' },
          { label: '고객센터' },
          { label: '약관 및 정책' },
        ].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text>{item.label}</Text>
            {item.action && <Text style={styles.edit}>{item.action} &gt;</Text>}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  content: {
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 8,
    borderColor: '#f2f2f2',
    paddingBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  profileText: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: '#666',
    fontSize: 14,
  },
  edit: {
    color: '#888',
    fontSize: 14,
  },
  listItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionText: {
    color: 'red',
    marginRight: 10,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#008000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  updateText: {
    color: 'white',
    fontSize: 12,
  },
});

export default MyInfoPage;
