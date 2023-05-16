import { createSlice } from "@reduxjs/toolkit";

export interface Loading {
    loading: boolean;
}

const initialState: Loading = {
    loading: false,
};

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true;
        },
        setLoadingFalse: (state) => {
            state.loading = false;
        },
    },
});

export const { setLoadingTrue, setLoadingFalse } = loadingSlice.actions;
