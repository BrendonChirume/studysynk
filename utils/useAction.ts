import {setAuthLoading} from "@/includes/redux/slices/authSlice";
import {useAppDispatch} from "@/utils/reduxHooks";

export const useAction = () => {
    const dispatch = useAppDispatch();
    return {
        setAuthLoading: (token: boolean) => dispatch(setAuthLoading(token)),
    }
}