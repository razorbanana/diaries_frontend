import { createSlice } from "@reduxjs/toolkit";

export interface FilterState {
    value: string;
    type: string;
}

const initialState: FilterState = {
    value: '',
    type: 'title'
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterValue: (state, action) => {
            state.value = action.payload;
        },
        setFilterType: (state, action) => {
            state.type = action.payload;
        },
        resetFilter: (state) => {
            state.value = initialState.value;
            state.type = initialState.type;
        }
    }
})

export const { setFilterValue, setFilterType, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;