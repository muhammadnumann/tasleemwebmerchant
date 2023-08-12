import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

interface state {
  IS_LOGGED: boolean,
  USER: Object,
  TOKEN: string,
}

const initialState = {
  IS_LOGGED: JSON.parse(localStorage.getItem("isloged") + ''),
  USER: JSON.parse(localStorage.getItem("userData") === undefined ? '' : localStorage.getItem("userData") + ''),
  TOKEN: localStorage.getItem("token") + '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    AuthLogin: (state, action) => {
      const payload = action.payload.payload;
      state.USER = payload.data.user;
      state.TOKEN = payload?.data?.user.apiToken;
      state.IS_LOGGED = true
      state.IS_LOGGED = true
      const authToken = payload?.data.user.apiToken;
      localStorage.setItem('token', authToken);
      localStorage.setItem('isloged', JSON.stringify(true));

      const user: any = payload.data
      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...user,
        })
      );
    },
    UserSessionData: (state, action) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token Not Found!');
        const decodedJwt: any = jwtDecode(token);

        if (!moment().isBefore(moment.unix(decodedJwt.exp)))
          throw new Error('Token Expired!');
        const data1: string = localStorage.getItem('userData') + ''
        const userData = JSON.parse(data1);
        const data = {
          user: userData,
          token,
        };
        return data;
      } catch (err: any) {
        return (err.message);
      }
    },
    UserLogOut: (state, action) => {
      state.IS_LOGGED = false

      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  },
});

// Action creators are generated for each case reducer function
export const { AuthLogin, UserSessionData, UserLogOut } = authSlice.actions;

export default authSlice.reducer;
