import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, refreshToken, userProfile } from '../../api/userApi'

export const loginUserThunk = createAsyncThunk("login/user", async(loginInfo,thunkApi) => {
  try {
    const response = await loginUser(loginInfo)
    return response.data
  }
  catch (error)
  {
    thunkApi.rejectWithValue(error.message || "unknown error")
  }
})

// export const userProfileThunk = createAsyncThunk("user/profile", async (_, thunkApi) => {
//   const {userState:{accessToken}} = thunkApi.getState()
//   try {
//     const response = await userProfile(accessToken)
//     console.log(response.data)
//     return response.data
//   }
//   catch (error)
//   {
//     console.log(error.message)
//     //{"message":"jwt expired"}
//     thunkApi.rejectWithValue(error.message || "unknown error")
//   }
// })

export const userProfileThunk = createAsyncThunk("user/profile", async (_, thunkApi) => {
  let { userState: { accessToken } } = thunkApi.getState();
  try {
    const response = await userProfile(accessToken);
    return response.data;
  } catch (error) {
    if (error?.response?.data?.message === "jwt expired") {
      // Try refreshing token
      const refreshResponse = await thunkApi.dispatch(refreshTokenThunk());
      const refreshData = refreshResponse.payload;

      // Check if refresh succeeded
      if (refreshData?.accessToken) {
        // Update new access token from state
        accessToken = `Bearer ${refreshData.accessToken}`;
        // Retry profile API with new token
        const retryResponse = await userProfile(accessToken);
        return retryResponse.data;
      } else {
        return thunkApi.rejectWithValue("Refresh token failed");
      }
    } else {
      return thunkApi.rejectWithValue(error.message || "unknown error");
    }
  }
});



export const refreshTokenThunk = createAsyncThunk("refresh/token", async (_, thunkApi) => {
  try {
    const response = await refreshToken()
    return response.data
  }
  catch (error)
  {
    thunkApi.rejectWithValue(error.message || "unknown error")
  }
})

const userSlice = createSlice({
  name: "userState",
  initialState: {
    login: false,
    accessToken:null,
    authLoaded: false,
    loginStatus:"idle",
    loginMessage:null,
    loginError: null,
    user: {},
    profileStatus:"idle",
    profileError:null,
    refreshStatus:"idle",
    refreshError:null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    
    //login user
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loginStatus="loading"
    })
    builder.addCase(loginUserThunk.fulfilled, (state,action) => {
      state.loginStatus = "success"
      state.loginMessage = action.payload.message
      state.accessToken =`Bearer ${action.payload.accessToken}`
      state.login = true
      state.loginError =null
    })
    builder.addCase(loginUserThunk.rejected, (state,action) => {
      state.loginStatus = "failed"
      state.loginError =action.payload
    })

    //user profile

    builder.addCase(userProfileThunk.pending, (state) => {
      state.profileStatus="loading"
    })
    builder.addCase(userProfileThunk.fulfilled, (state,action) => {
      state.profileStatus = "success"
      state.user = action.payload.user
      state.profileError =null
    })
    builder.addCase(userProfileThunk.rejected, (state,action) => {
      state.profileStatus = "failed"
      state.profileError =action.payload
    })


    //user profile

    builder.addCase(refreshTokenThunk.pending, (state) => {
      state.refreshStatus="loading"
    })
    builder.addCase(refreshTokenThunk.fulfilled, (state,action) => {
      state.refreshStatus = "success"
      state.accessToken = `Bearer ${action.payload.accessToken}`
      state.login = true
      state.refreshError = null
      state.authLoaded = true;
    })
    builder.addCase(refreshTokenThunk.rejected, (state,action) => {
      state.refreshStatus = "failed"
      state.refreshError = action.payload
    })


  }
})

export default userSlice.reducer