import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Redux/store';

export interface IStoreModel {
    sidebar_is_on: boolean;
}

const initialState: IStoreModel = {
    sidebar_is_on: true
}


export const ui_slice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        sidebar: (state, action: PayloadAction<IStoreModel>) => {
            state.sidebar_is_on = action.payload.sidebar_is_on;
        }
    }
})

export const { sidebar } = ui_slice.actions;

export const getUISelector = (state: RootState) => state.ui;