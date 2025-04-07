import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchMyInfo } from "../api/myinfoApi";

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null); 

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await fetchMyInfo(); 
            if (data) {
                setUserInfo(data); // 
            }
        };
        getUserInfo();
    }, []);

    return (
        <>
        </>
    );
};

export default MyPage;