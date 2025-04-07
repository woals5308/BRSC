import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";


//카메라를 켜서 qr 찍고 qr 데이터를 넘겨주고 수거함 문 열기
export const QR = async(data) =>{
    try{
        const token = await AsyncStorage.getItem("usertoken");
        if(!token){
            Alert.alert("로그인이 필요합니다.");
            return;
        }
        const response = await axiosInstance.get(`/map/openBox/${data}`)
        router.push({
            pathname:"/components/GoogleMap",
            params:{data},
        });
    }catch(error){
        console.error(error);
    }
}
