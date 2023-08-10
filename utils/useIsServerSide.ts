import React from "react";

const useIsServerSide = () => {
    const [isServerSide, setIsServerSide] = React.useState(true);

    React.useEffect(() => {
        setIsServerSide(false);
    }, [setIsServerSide]);

    return isServerSide;
};

export default useIsServerSide