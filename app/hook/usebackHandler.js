import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

// 안드로이드 하드웨어 뒤로가기 버튼 비활성화 시키는 로직
const useBackHandler = (customHandler) => {
  useEffect(() => {
    const backAction = () => {
      if (customHandler) {
        return customHandler();
      }
      return true; // 뒤로가기 동작 막음
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // clean-up
  }, [customHandler]);
};

export default useBackHandler;
