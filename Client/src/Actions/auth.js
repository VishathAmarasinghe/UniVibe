import * as api from '../API/index';


export const signin=(formData,navigation)=>async(dispatch)=>{
    try {
        const {data}=await api.signIn(formData);
        dispatch({
            type:"AUTH",
            data
        });
        navigation("/")
    } catch (error) {
        console.log(error);
    }
}


export const signup=(formData,navigation)=>async(dispatch)=>{
    try {
        const {data}=await api.signUp(formData);
        dispatch({
            type:"AUTH",
            data
        });
        navigation("/")
    } catch (error) {
        console.log("error in signup",error);
    }
}