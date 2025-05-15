import axiosWebInstance from "./axiosweb";

//화재 처리 내역
export const FireLog = async () => {
    try{
        const response = await axiosWebInstance.get(`fireLog`)
    return response.data;
    }catch(error){
        console.error(error)
    }
}