import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "../store";
import { setLoadingFalse, setLoadingTrue } from "./loadingSlice";
export interface User {
    id: number;
    name: {
        title: string;
        first: string;
        last: string;
    };
    login: { username: string };
    picture: { thumbnail: string };
}

interface UserState {
    users: User[];
    currentPage: number;
}

const initialState: UserState = {
    users: [],
    currentPage: 1,
};

export const usersSlice = createSlice({
    name: "usersList",
    initialState,
    reducers: {
        getListUser: (state, action) => {
            state.users = action.payload.results;
            state.currentPage = action.payload.info.page;
        },
    },
});

// call api & dispatch response to global state
export const getUserApi = async (currentPage: number) => {
    const queryParams = `
    &page=${currentPage}
    &results=${10}`;

    try {
        dispatch(setLoadingTrue());
        const response = await axios.get(
            `https://randomuser.me/api/?${queryParams}`
        );
        dispatch(getListUser(response.data));
        dispatch(setLoadingFalse());
    } catch (error: any) {
        console.log(error);
    }
};

export const { getListUser } = usersSlice.actions;
