"use client";

import React from 'react';

interface AuthContextType {
    university: string;
    faculty: string;
    programs: string;
    setToken?: (token: Partial<AuthContextType>) => void;
}

const initialState: AuthContextType = {
    university: "",
    faculty: "",
    programs: "",
};

const FilterContext = React.createContext<AuthContextType>({
    setToken: () => undefined,
    ...initialState
});

export const useAddPaper = () => {
    return React.useContext(FilterContext);
};

export default function FilterProvider(
    {children}: {
        children: React.ReactNode;
    }) {
    const [selected, setSelected] = React.useState<AuthContextType>(initialState);

    const setToken = (token: Partial<AuthContextType>) => setSelected({...selected, ...token});

    return (
        <FilterContext.Provider value={{setToken, ...selected}}>
            {children}
        </FilterContext.Provider>
    );
}
