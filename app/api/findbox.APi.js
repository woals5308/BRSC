import axiosInstance from "./axiosInstance";



//특정 박스 id로 찾기
export const FindBoxById = async (boxId) =>{
    try{
        const response = await axiosInstance.get(`findBoxById/${boxId}`)
        return response.data;
    }catch(error){
        console.error(error)
    }
}


//특정 박스 이름으로 찾기

export const FindBoxByName = async (boxName) =>{
    try{
        const response = await axiosInstance.get(`/findBoxByName/${boxName}`)
        return response.data;
    }catch(error){
        console.error(error)
    }
}