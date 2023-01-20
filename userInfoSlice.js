import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const userInfoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action) => {
            const { sectionName, card } = action.payload
            if (state[sectionName] === undefined) {
                state[sectionName] = card;
            } else {
                state[sectionName] = { ...state[sectionName], ...card }
            }
            //     console.log(action)
            // state.data = { ...state.data, ...action.payload };
        },
    }
})

export const { updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;