// components/AlarmIcon.js
import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useAlarm } from "../context/AlarmContext";
import styles from "../style/Mainstyles";

const AlarmIcon = ({ onPress }) => {
  const { unreadCount } = useAlarm();

  return (
    <TouchableOpacity onPress={onPress} style={{ position: "relative" }}>
      <Image
        source={require("../assets/icon/alarm.png")}
        style={styles.notificationIcon}
      />
      {unreadCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AlarmIcon;
