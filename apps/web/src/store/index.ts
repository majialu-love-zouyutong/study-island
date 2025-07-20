import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme-slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// 从 store 的 getState 类型推导 RootState 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
