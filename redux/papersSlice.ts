import {createSlice} from '@reduxjs/toolkit';
import data from "@/app/data.json"

interface PapersState {
    name: string;
}

const initialState = data.faculties.map(({programs}) => programs).flat() as PapersState[]

const counterSlice = createSlice({
    name: 'papers',
    initialState,
    reducers: {

    },
})

export const {} = counterSlice.actions
export default counterSlice.reducer