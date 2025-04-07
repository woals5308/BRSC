import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";



// 로그아웃처리
export const logout = async () =>{
    try{
        await AsyncStorage.removeItem("usertoken");
        alert("로그아웃되었습니다.");
    }catch(error){
        console.log("로그아웃 요청 실패: ",error);
    }
}
