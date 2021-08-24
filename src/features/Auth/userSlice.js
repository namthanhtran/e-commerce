import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-keys";

export const register = createAsyncThunk( '/user/register', async(payload) => {
    // call api to register
    const data = await userApi.register(payload);
    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    // return user data
    return data.user;
  }
);


export const login = createAsyncThunk( '/user/login', async(payload) => {
    // call api to register
    const data = await userApi.login(payload);
    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    // return user data
    return data.user;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {}
  },
  reducers: {
    logout(state){
      // clear localStorage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      // reset state current
      state.current = {}
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    }
  }
});

const { actions, reducer } = userSlice;
export const {logout} = actions;
export default reducer ;