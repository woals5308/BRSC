import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";



//내정보에 데이터 가져오기
export const fetchMyInfo = async () =>{


    try{
        const token = await AsyncStorage.getItem("usertoken");
        if(!token){
            alert("로그인이 필요합니다.");
            router.push("/page/LoginPage");
            return;
        }
        console.log(token)

        const response = await axiosInstance.get("msp/myInfo")
        console.log(response.data);
    }catch(error){
        console.error(error);
    }
};
