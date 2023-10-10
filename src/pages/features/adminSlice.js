import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    firstName: null,
    lastName: null,
    address: null,
    phoneNo: null,
    email: null,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setLogInDetails: (state, action) => {
            state.id = action.payload?._id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.address = action.payload.address;
            state.phoneNo = action.payload.phoneNo;
            state.email = action.payload.email;
        },
        setLogOutDetails: (state) => {
            state.id = null;
            state.firstName = null;
            state.lastName = null;
            state.address = null;
            state.phoneNo = null;
            state.email = null;
        }

    }
})

export default adminSlice.reducer;
export const { setLogInDetails, setLogOutDetails } = adminSlice.actions;
