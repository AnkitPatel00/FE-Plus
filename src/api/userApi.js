import { api } from "./apiInstance"


const registerUser = (registerInfo) => {
  
}

const loginUser = (loginInfo) => {
  return api.post("/auth/login",loginInfo,{withCredentials:true})
}

const userProfile = (accessToken) => {
  return api.get("/auth/profile", {
    headers:{Authorization:accessToken}
  })
}

const refreshToken = () => {
  return api.get("/auth/refresh", {
   withCredentials:true
  })
}

export {loginUser,registerUser,userProfile,refreshToken}