import {
  configureStore,
  PreloadedStateShapeFromReducersMapObject,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "../features/users/userSlice";
import apiSlice from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  preloadedState: {},
  devTools: true,
});

export const setupStore = (
  _?: PreloadedStateShapeFromReducersMapObject<RootState>
) => {
  return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

setupListeners(store.dispatch);
