import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axiosInstance from "../api/axiosInstance";

/**
 * 이미지 URL만 전달하면 자동으로 토큰 포함 요청 + Base64 변환
 * @param {string | null} url - 예: "/boxImage/1", "/fireImage/10", "/collectionImage/3"
 * @returns {string | null} - Base64 URI (data:image/jpeg;base64,...)
 */
const useSecuredImage = (url) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!url) return;
      try {
        const res = await axiosInstance.get(url, {
          responseType: "arraybuffer",
        });
        const base64 = `data:image/jpeg;base64,${Buffer.from(res.data, "binary").toString("base64")}`;
        setImageUri(base64);
      } catch (err) {
        console.log(`❌ 이미지 로딩 실패 (${url}):`, err);
        setImageUri(null);
      }
    };

    fetchImage();
  }, [url]);

  return imageUri;
};

export default useSecuredImage;