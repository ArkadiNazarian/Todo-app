import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../Redux/store';
import { auth } from '../../Firebase/firbase-config';

export interface IStoreModel {
    token: string;
    user?: {
        name?: string;
        email?: string;
    }
}

const initialState: IStoreModel = {
    token: '',
    user: {
        name: undefined,
        email: undefined
    }
}

export const get_identity = createAsyncThunk<{ name: string; email: string; }>('account/getIdentity', async () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve({ name: user.displayName!, email: user.email! })
            } else {
                reject("")
            }
        })
    })
})

export const account_slice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        set_token: (state, action: PayloadAction<IStoreModel>) => {
            state.token = action.payload.token;
        },
        sign_out: (state) => {
            state.token = ""
        },
    },
    extraReducers: (builder) => {
        builder.addCase(get_identity.fulfilled, (state, action) => {
            state.user!.name = action.payload.name;
            state.user!.email = action.payload.email;
        })
        builder.addCase(get_identity.rejected, () => {
            console.log("error")
        })
    }
})

export const { set_token, sign_out } = account_slice.actions;

export const getAccountSelector = (state: RootState) => state.account;