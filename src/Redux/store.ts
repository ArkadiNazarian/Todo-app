import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { account_slice } from "../Modules/Auth/redux";
import { ui_slice } from "../Modules/App/redux";

const persistedUserReducer = persistReducer(
    {
        key: "  todo.user",
        storage,
        whitelist: ["token"]
    },
    account_slice.reducer,
);

const persistedUIReducer = persistReducer(
    {
        key: "  todo.ui",
        storage,
        whitelist: ["sidebar_is_on"]
    },
    ui_slice.reducer,
);

export const store = configureStore({
    reducer: {
        account: persistedUserReducer,
        ui: persistedUIReducer
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