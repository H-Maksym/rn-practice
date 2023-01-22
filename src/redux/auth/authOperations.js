// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import { IoMdLogIn } from 'react-icons/io';
// import { store } from 'redux/store';

// axios.defaults.baseURL = 'https://petly-back.onrender.com/api';

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

// axios.interceptors.response.use(
//   async res => {
//     return res;
//   },
//   async error => {
//     const { response, config } = error;
//     if (response.status === 401) {
//       const state = store.getState();
//       const token = state.auth.accessToken;

//       if (token) {
//         const { accessToken, refreshToken } = await refreshTokens();

//         store.dispatch(
//           setTokens({
//             accessToken,
//             refreshToken,
//           })
//         );

//         config.headers['Authorization'] = 'Bearer ' + accessToken;
//         return axios(config);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// const refreshTokens = async () => {
//   const state = store.getState();
//   const refreshToken = state.auth.refreshToken;

//   try {
//     const { data } = await axios.post('/auth/refresh', { refreshToken });
//     token.set(data.accessToken);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const setTokens = createAsyncThunk(
//   'auth/set-tokens',
//   async (tokens, { rejectWithValue }) => {
//     try {
//       token.set(tokens.accessToken);

//       return tokens;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const register = createAsyncThunk(
//   'auth/register',
//   async (user, { rejectWithValue }) => {
//     try {
//       await axios.post('/auth/register', user);
//       toast.success(`User ${user.name} registered successfully`);
//     } catch (error) {
//       if (error.response.status === 409) {
//         toast.error('Email in use');
//         return rejectWithValue(error.request.status);
//       }
//       toast.error('Oops, something went wrong');
//       return rejectWithValue(error.request.status);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (user, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post('/auth/login', user);
//       token.set(data.user.accessToken);
//       toast(`You have successfully logged into your account`, {
//         icon: <IoMdLogIn size={25} color="green" />,
//       });

//       return data;
//     } catch (error) {
//       if (error.response.status === 401) {
//         toast.error('Email or password invalid');
//         return rejectWithValue(error.request.message);
//       }
//       toast.error('Oops, something went wrong');
//       return rejectWithValue(error.request.status);
//     }
//   }
// );
// export const restore = createAsyncThunk(
//   'auth/restore',
//   async (email, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.patch('/auth/restore', email);
//       toast(`Password was sent to Your email`, {
//         icon: <IoMdLogIn size={25} color="green" />,
//       });
//       return data;
//     } catch (error) {
//       if (error.response.status === 400) {
//         toast.error('Something went wrong');
//         return rejectWithValue(error.request.message);
//       }
//       toast.error('Oops, something went wrong');
//       return rejectWithValue(error.request.status);
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async (_, { fulfillWithValue }) => {
//     try {
//       await axios.get('/auth/logout');
//       token.unset();
//     } catch (error) {
//       // toast.error('Oops, something went wrong');
//       fulfillWithValue(error.request.status);
//     }
//   }
// );

// export const getUserInfo = createAsyncThunk(
//   'userInfo/getUserInfo',
//   async (query, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       const res = await axios.get('/user/userInfo');
//       return res.data;
//     } catch (error) {
//       // toast.error('Oops, something went wrong');
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

// export const updateUserInfo = createAsyncThunk(
//   'userInfo/updateUserInfo',
//   async (payload, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       const { data } = await axios.patch(`/user/update`, payload);
//       return data;
//     } catch (error) {
//       toast.error("Sorry, can't update user, something went wrong!");
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

// export const addPet = createAsyncThunk(
//   'pet/addPet',
//   async (payload, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       const { data } = await axios.post('/user/pets', payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return data;
//     } catch (error) {
//       toast.error("Sorry, can't add pet, something went wrong!");
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

// export const deletePet = createAsyncThunk(
//   'pet/deletePet',
//   async (_id, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       await axios.delete(`/user/pets/${_id}`);
//       return { _id };
//     } catch (error) {
//       toast.error("Sorry, can't delete pet, something went wrong!");
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

// //INFO Notices operations
// export const addFavoriteNotice = createAsyncThunk(
//   'notices/addFavorite',
//   async (_id, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       await axios.patch(`/notices/user/${_id}/favorites`);
//       return _id;
//     } catch (error) {
//       toast.error("Sorry, can't add favorite notices, something went wrong!");
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

// export const deleteFavoriteNotice = createAsyncThunk(
//   'notices/deleteFavorite',
//   async (_id, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       await axios.delete(`/notices/user/${_id}/favorites`);
//       return _id;
//     } catch (error) {
//       toast.error(
//         "Sorry, can't delete favorite notices, something went wrong!"
//       );
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );
