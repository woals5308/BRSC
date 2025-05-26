import axiosInstance from "./axiosInstance";

//화재 처리 내역
export const FireLog = async () => {
    try{
        const response = await axiosInstance.get(`fireLog`)
        console.log(response.data);
        return response.data;
    }catch(error){
        console.error(error)
    }
}