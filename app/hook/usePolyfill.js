import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect,useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";


export const usePolyfill = () =>{
    const [alarms, setAlarms] = useState([]);


    useEffect(()=>{
        let see;

        const connectSSE = async () =>{
            const token = await AsyncStorage.getItem("usertoken");

            if(!token){
                console.log("토큰 x")
                return;
            }



            // 헤더 토큰 포함
            sse = new EventSourcePolyfill("http://192.168.0.20:8080/SSEsubscribe",{
                headers:{
                    acesss : `Bearer ${token}`,
                },
                // withCredentials: true // 필요 시 활성화
            });

        
            sse.addEventListener('alarm', (event)=>{
                try{
                    const data = JSON.parse(event.data);
                    console.log("1",data)
                    setAlarms((prev)=>[data, ...prev.filter((a)=> a.id !== data.id)]);
                }catch(error){
                    console.error("2",error);
                }
            });
            connectSSE();
            

        };

    },[]);
    return alarms;
}