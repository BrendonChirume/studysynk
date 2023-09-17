"use client";

import React from 'react';

interface AuthContextType {
    isOpen: boolean;
    showFilter: (token: boolean) => void;
}

const FilterContext = React.createContext<AuthContextType>({
    isOpen: false,
    showFilter: () => undefined,
});

export const useFilter = () => {
    return React.useContext(FilterContext);
};

export default function FilterProvider(
    {children}: {
        children: React.ReactNode;
    }) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const showFilter = (token: boolean) => setIsOpen(token);

    return (
        <FilterContext.Provider value={{isOpen, showFilter}}>
            {children}
        </FilterContext.Provider>
    );
}
