import { createSlice } from '@reduxjs/toolkit'

export const EmployeeSlice = createSlice({

    name: "Employee",
    initialState: {
        EmployeeName: "", EmployeeGID: "", StoreCode: ""
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { login } = EmployeeSlice.actions;

export default EmployeeSlice.reducer