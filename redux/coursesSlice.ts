import {createSlice} from '@reduxjs/toolkit';
import data from "@/app/data.json"

interface CoursesState {
    name: string;
}

const initialState = data.faculties.map(({programs}) => programs).flat() as CoursesState[]

const counterSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {

    },
})

export const {} = counterSlice.actions
export default counterSlice.reducer