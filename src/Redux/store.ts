import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { account_slice } from "../Modules/Auth/redux";


const persistedUserReducer = persistReducer(
    {
        key: "  todo.user",
        storage,
        whitelist:["token"]
    },
    account_slice.reducer,
);

export const store = configureStore({
    reducer: {
        account: persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
            thunk: true
        })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispacth = typeof store.dispatch;