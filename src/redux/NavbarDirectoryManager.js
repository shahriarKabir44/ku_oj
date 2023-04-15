import { createSlice } from "@reduxjs/toolkit";

let NavigationDirectoryManager = createSlice({
    name: "currentUserManager",
    initialState: {
        value: {
            dir: ""
        }

    },
    reducers: {
        setDirectory: (state, action) => {
            state.value.dir = state

        }
    }

})

export const { setDirectory } = NavigationDirectoryManager.actions

export default NavigationDirectoryManager.reducer 