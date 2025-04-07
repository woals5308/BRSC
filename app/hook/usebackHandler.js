import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";



//안드로이드 하드웨어 뒤로가기 버튼 비활성화 시키는 로직임 
const useBackHandler = (customHandler) => {
    useEffect(()=>{
        const backAction = () =>{
            if(customHandler) {
                return customHandler();
            }
            return true;
        };
        const BackHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return ()=> BackHandler.remove();
    },[customHandler]);
};

export default useBackHandler;