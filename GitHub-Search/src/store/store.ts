import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "../shared/gitAPI";

const store = configureStore({
  reducer: { [githubApi.reducerPath]: githubApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
