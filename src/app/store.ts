import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import postReducer from "./features/post/postSlice";
import userReducer from "./features/user/userSlice";
import { postApi } from "./services/postApi";
import { usersApi } from "./services/userApi";

// Persist Post Reducer 
const persistedPostReducer = persistReducer({
     key: "postReducer",
     storage,
     blacklist: ["selectedPosts"],
}, postReducer)


// Store Config
const store = configureStore({
     reducer: {
          postReducer: persistedPostReducer,
          userReducer,
          [postApi.reducerPath]: postApi.reducer,
          [usersApi.reducerPath]: usersApi.reducer
     },
     middleware: (getDefaultMiddleware) => {
          return getDefaultMiddleware().concat([postApi.middleware, usersApi.middleware])
     }
})

// Redux Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;