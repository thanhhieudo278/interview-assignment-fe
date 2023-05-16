import { configureStore } from "@reduxjs/toolkit";
import { loadingSlice } from "./feature/loadingSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { usersSlice } from "./feature/usersSlice";

const store = configureStore({
    reducer: {
        loading: loadingSlice.reducer,
        usersList: usersSlice.reducer,
    },
});

const { dispatch } = store;

const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
    useSelector;

export { useAppDispatch, useAppSelector, dispatch, store };
