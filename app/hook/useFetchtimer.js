import { useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";

const useFetchTimer = () => {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        router.push("/page/Agree");
      }, 1000);

      return () => clearTimeout(timer);
    }, [])
  );

  return null;
};

export default useFetchTimer;
